import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import AwaitsTapModal from "../Components/AwaitsTapModal";
import FullScreenModal from "../Components/FullScreenModal";
import data from '../assets/db/tmp.json';
import { faHourglass, faHandPointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import KeepAwake from 'react-native-keep-awake';
import { useSound } from '../Components/SoundContext';
import StatsModal from "../Components/StatsModal";
import CategoryReveal from "../Components/CategoryReveal";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const moves = {
    'whoami': 'Ναί, Όχι, Περίπου',
    'sound': 'Κάν\'το με ήχο!',
    'gestures': 'Παντομίμα',
};

const pickRandomKey = (obj) => {
    const keys = Object.keys(obj);
    return keys[Math.floor(Math.random() * keys.length)];
};

const GameScreen = ({ navigation, route }) => {
    const { playerNames, roundsCount, seconds } = route.params;

    const [gameState, setGameState] = useState({
        currentRound: 1,
        playerPlaying: 0,
        playerAsking: 1,
        actionPlaying: null,
        timeLeft: null,
        modalVisible: false,
        statsModalVisible: false,
        awaitModalVisible: false,
        categoryModalVisible: true,
        categoryName: '',
        challenge: '',
        gameMatrix: {},
        lastTap: null,
        playingNow: false,
        isLoading: true,
    });

    const { playSound, stopSound } = useSound();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loopAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.delay(300),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.delay(300),
            ])
        );

        loopAnimation.start();
        return () => loopAnimation.stop();
    }, [fadeAnim]);

    const gameStart = useCallback(() => {
        const dictionary = playerNames.reduce((acc, name) => ({ ...acc, [name]: 0 }), {});
        setGameState((prevState) => ({
            ...prevState,
            gameMatrix: dictionary,
            playerPlaying: 0,
            playerAsking: 1,
            currentRound: 1,
            isLoading: false,
        }));

        // Set category and challenge for the first round
        const selectedCategory = pickRandomKey(data.challenges);
        const selectedMoveKey = pickRandomKey(data.challenges[selectedCategory]);
        const challengeIndex = Math.floor(Math.random() * data.challenges[selectedCategory][selectedMoveKey].length);
        const selectedChallenge = data.challenges[selectedCategory][selectedMoveKey][challengeIndex];

        setGameState((prevState) => ({
            ...prevState,
            categoryName: selectedCategory,
            actionPlaying: selectedMoveKey,
            challenge: selectedChallenge,
        }));
    }, [playerNames]);

    const switchPlayer = () => {
        const { playerPlaying, currentRound } = gameState;

        if (playerPlaying + 1 < playerNames.length) {
            delete data.challenges[gameState.categoryName][gameState.actionPlaying][gameState.challenge];

            const selectedMoveKey = pickRandomKey(data.challenges[gameState.categoryName]);
            const challengeIndex = Math.floor(Math.random() * data.challenges[gameState.categoryName][selectedMoveKey].length);
            const selectedChallenge = data.challenges[gameState.categoryName][selectedMoveKey][challengeIndex];

            setGameState((prevState) => ({
                ...prevState,
                playerPlaying: prevState.playerPlaying + 1,
                playerAsking: (prevState.playerAsking + 1) % playerNames.length,
                actionPlaying: selectedMoveKey,
                challenge: selectedChallenge,
                awaitModalVisible: true,
            }));

        } else {
            if (currentRound < roundsCount) {
                delete data.challenges[gameState.categoryName];

                const selectedCategory = pickRandomKey(data.challenges);
                const selectedMoveKey = pickRandomKey(data.challenges[selectedCategory]);
                const challengeIndex = Math.floor(Math.random() * data.challenges[selectedCategory][selectedMoveKey].length);
                const selectedChallenge = data.challenges[selectedCategory][selectedMoveKey][challengeIndex];

                setGameState((prevState) => ({
                    ...prevState,
                    currentRound: prevState.currentRound + 1,
                    playerPlaying: 0,
                    playerAsking: 1,
                    categoryModalVisible: true,
                    actionPlaying: selectedMoveKey,
                    challenge: selectedChallenge,
                    categoryName: selectedCategory
                }));

            } else {
                setGameState((prevState) => ({
                    ...prevState,
                    statsModalVisible: true,
                }));
            }
        }
    }

    useEffect(() => {
        KeepAwake.activate();
        gameStart();
        return () => {
            KeepAwake.deactivate();
        };
    }, [gameStart]);

    useEffect(() => {
        let timer;
        if (gameState.timeLeft > 0) {
            timer = setInterval(() => {
                setGameState((prevState) => ({ ...prevState, timeLeft: prevState.timeLeft - 1 }));
            }, 1000);

            if (gameState.timeLeft === 10) {
                playSound('countdown');
            }
        } else if (gameState.timeLeft === 0) {
            clearInterval(timer);
            stopSound();
            setGameState((prevState) => ({ ...prevState, modalVisible: true }));
        }

        return () => clearInterval(timer);
    }, [gameState.timeLeft, playSound, stopSound]);

    const closeModal = (answer) => {
        if (answer === 1) {
            playSound('correct')
            setGameState((prevState) => {
                const updatedMatrix = { ...prevState.gameMatrix };
                updatedMatrix[playerNames[prevState.playerPlaying]] += 1.5;
                updatedMatrix[playerNames[prevState.playerAsking]] += 0.5;
                return { ...prevState, gameMatrix: updatedMatrix };
            });
        } else {
            playSound('wrong')
        }

        setGameState((prevState) => ({ ...prevState, modalVisible: false }));
        switchPlayer()

    };

    const handleDoubleTap = () => {
        const currentTime = Date.now();
        const DOUBLE_TAP_DELAY = 300;

        if (gameState.lastTap && (currentTime - gameState.lastTap) < DOUBLE_TAP_DELAY && gameState.playingNow) {
            setGameState((prevState) => ({
                ...prevState,
                modalVisible: true,
                lastTap: null,
                playingNow: false,
                timeLeft: 0,
            }));
        } else {
            setGameState((prevState) => ({ ...prevState, lastTap: currentTime }));
        }
    };

    const uponCategoryReveal = () => {
        setGameState((prevState) => ({ ...prevState, awaitModalVisible: true, categoryModalVisible: false, }));
    }

    const uponBuzzerTap = () => {
        setGameState((prevState) => ({ ...prevState, awaitModalVisible: false, timeLeft: seconds || 3, playingNow: true }));
    }

    return (
        <TouchableOpacity
            style={{ flex: 1, alignItems: 'center' }}
            onPress={handleDoubleTap}
            activeOpacity={1}
        >
            <View style={styles.banner}>
                <Text style={styles.bannerTitle}>{gameState.categoryName}</Text>
                <Text style={styles.h1}>Γύρος {gameState.currentRound} από {roundsCount}</Text>
            </View>
            <View style={styles.main}>
                <View style={styles.time}>
                    <FontAwesomeIcon icon={faHourglass} size={32} color="#E63946" />
                    <Text style={styles.title12}>{gameState.timeLeft}</Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.content}>
                        <Text style={styles.title1}>{gameState.challenge}</Text>
                    </View>
                </View>

                <Animated.View style={{ ...styles.time, opacity: fadeAnim, marginBottom: hp('5%') }}>
                    <FontAwesomeIcon icon={faHandPointer} size={32} />
                    <Text style={styles.title12}>Double-Tap, αν βρέθηκε η λέξη</Text>
                </Animated.View>
            </View>

            {!gameState.isLoading && (
                <>
                    <CategoryReveal
                        visible={gameState.categoryModalVisible}
                        onTap={uponCategoryReveal}
                        categoryName={gameState.categoryName}
                        currentRound={gameState.currentRound}
                    />

                    <AwaitsTapModal
                        visible={gameState.awaitModalVisible}
                        onTap={uponBuzzerTap}
                        playerName={playerNames[gameState.playerPlaying]}
                        action={moves[gameState.actionPlaying]}
                        categoryName={gameState.categoryName}
                        playerAsking={playerNames[gameState.playerAsking]}
                        currentRound={gameState.currentRound}
                        roundsCount={roundsCount}
                    />

                    <FullScreenModal
                        visible={gameState.modalVisible}
                        onClose={closeModal}
                        playerName={playerNames[gameState.playerPlaying]}
                        currentRound={gameState.currentRound}
                        roundsCount={roundsCount}
                        categoryName={gameState.categoryName}

                    />

                    {gameState.statsModalVisible && (
                        <StatsModal
                            visible={gameState.statsModalVisible}
                            gameMatrix={gameState.gameMatrix}
                            navigation={navigation}
                        />
                    )}
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('80%'),
        flex: 2,
    },
    content: {
        backgroundColor: '#457b9d',
        borderRadius: wp('10%'),
        padding: hp('4.5%'),
    },
    main: {
        flex: 1,
        rowGap: hp('3%'),
    },
    bannerTitle: {
        fontSize: hp('3%'),
        textAlign: 'center',
        color: '#fdf0d5',
    },
    banner: {
        backgroundColor: '#E63946',
        width: wp('100%'),
        alignItems: 'center',
        padding: hp('1.5%'),
    },
    time: {
        alignItems: 'center',
        padding: hp('1%'),
        rowGap: hp('2%'),
        marginTop: hp('2%'),
    },
    title1: {
        fontSize: hp('4%'),
        color: '#F1FAEE',
        textAlign: 'center',
    },
    title12: {
        fontSize: hp('2%'),
        fontWeight: 'bold',
    },
    h1: {
        fontSize: hp('2%'),
        fontWeight: 'bold',
        color: '#fdf0d5',
    },
});

export default GameScreen;
