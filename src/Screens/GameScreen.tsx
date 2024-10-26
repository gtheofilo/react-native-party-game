import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, Animated } from 'react-native';
import AwaitsTapModal from "../Components/AwaitsTapModal";
import FullScreenModal from "../Components/FullScreenModal";
import data from '../assets/db/tmp.json';
import { faHourglass, faHandPointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Sound from 'react-native-sound';
import StatsModal from "../Components/StatsModal";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import KeepAwake from 'react-native-keep-awake';
import CategoryReveal from "../Components/CategoryReveal";
import { useSound } from '../Components/SoundContext';

const pickRandomKey = (obj) => {
    const keys = Object.keys(obj);
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
};

const moves = {
    'whoami': 'Ναί, Όχι, Περίπου',
    'sound': 'Κάν\'το με ήχο!',
    'gestures': 'Παντομίμα',
};

function GameScreen({ route }) {
    let { playerNames, roundsCount, seconds } = route.params;

    const [currentRound, setCurrentRound] = useState(1);
    const [playerPlaying, setPlayerPlaying] = useState(0);
    const [playerAsking, setPlayerAsking] = useState(1);
    const [actionPlaying, setActionPlaying] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [statsModalVisible, setStatsModalVisible] = useState(false);
    const [categoryModalVisible, setCategoryModalVisible] = useState(true);

    const [categoryName, setCategoryName] = useState(false);
    const [challenge, setChallenge] = useState(false);
    const [awaitModalVisible, setAwaitModalVisible] = useState(false);
    const [gameMatrix, setGameMatrix] = useState();
    const [lastTap, setLastTap] = useState(null);
    const [playingNow, setPlayingNow] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    const { playSound } = useSound();


    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Create a loop of fade in and fade out animations
        const loopAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,    // Fade in to opacity 1
                    duration: 1000,  // Duration in ms (2 seconds)
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0.1,    // Fade out to opacity 0
                    duration: 1000,  // Duration in ms (2 seconds)
                    useNativeDriver: true,
                }),
            ])
        );

        // Start the animation loop
        loopAnimation.start();

        // Cleanup animation on component unmount
        return () => loopAnimation.stop();
    }, [fadeAnim]);


    const gameStart = () => {
        // Create points/game matrix
        const dictionary = playerNames.reduce((acc, key) => {
            acc[key] = 0;
            return acc;
        }, {});
        setGameMatrix(dictionary);

        // Initialize game state
        setPlayerPlaying(0);
        setPlayerAsking(1);
        setCurrentRound(1);

        // Pick category for the first round
        const selectedCategory = pickRandomKey(data.challenges);
        setCategoryName(selectedCategory);  // Update state, but use local variable for immediate logic

        // Pick move for the first round
        const selectedMoveKey = pickRandomKey(data.challenges[selectedCategory]);
        setActionPlaying(selectedMoveKey);

        // Pick a random challenge from the selected category and move
        const challengeIndex = Math.floor(Math.random() * data.challenges[selectedCategory][selectedMoveKey].length);
        const selectedChallenge = data.challenges[selectedCategory][selectedMoveKey][challengeIndex];
        setChallenge(selectedChallenge);     // Set the challenge

        setIsLoading(false)
    };


    const switchPlayer = () => {
        if (playerPlaying + 1 < playerNames.length) {
            setPlayerPlaying((prev) => prev + 1);
            setPlayerAsking((prev) => (prev + 1) % playerNames.length);

            delete data.challenges[categoryName][actionPlaying][challenge]


            // Pick move for the first round
            const selectedMoveKey = pickRandomKey(data.challenges[categoryName]);
            setActionPlaying(selectedMoveKey);   // Set the actual move key

            // Pick a random challenge from the selected category and move
            const challengeIndex = Math.floor(Math.random() * data.challenges[categoryName][selectedMoveKey].length);
            const selectedChallenge = data.challenges[categoryName][selectedMoveKey][challengeIndex];
            setChallenge(selectedChallenge);     // Set the challenge
            setAwaitModalVisible(true);

        } else {
            if (currentRound < roundsCount) {
                setCurrentRound((prev) => prev + 1);
                delete data.challenges[categoryName]
                setPlayerPlaying(0);
                setPlayerAsking(1);

                // Pick category for the first round
                const selectedCategory = pickRandomKey(data.challenges);
                setCategoryName(selectedCategory);  // Update state, but use local variable for immediate logic

                // Pick move for the first round
                const selectedMoveKey = pickRandomKey(data.challenges[selectedCategory]);
                setActionPlaying(selectedMoveKey);   // Set the actual move key

                // Pick a random challenge from the selected category and move
                const challengeIndex = Math.floor(Math.random() * data.challenges[selectedCategory][selectedMoveKey].length);
                const selectedChallenge = data.challenges[selectedCategory][selectedMoveKey][challengeIndex];
                setChallenge(selectedChallenge);     // Set the challenge

                setCategoryModalVisible(true);


            } else {
                setStatsModalVisible(true);
                return
            }
        }



    };

    useEffect(() => {
        KeepAwake.activate();
        gameStart();

        // Cleanup function to deactivate when the component unmounts
        return () => {
            KeepAwake.deactivate();
        };

    }, []);

    useEffect(() => {
        let timer;
        if (timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            if (timeLeft === 10) {
                playSound('countdown')
            }
        } else if (timeLeft === 0) {
            clearInterval(timer);
            setModalVisible(true);
        } 

        return () => clearInterval(timer);
    }, [timeLeft]);

    const closeModal = (answer) => {
        if (answer === 1) {
            let tmpMatrix = { ...gameMatrix };
            tmpMatrix[playerNames[playerPlaying]] += 1.5;
            tmpMatrix[playerNames[playerAsking]] += 0.5;

            setGameMatrix(tmpMatrix);
        }
        switchPlayer();
        setModalVisible(false);
    };


    const handleDoubleTap = () => {
        const currentTime = Date.now();
        const DOUBLE_TAP_DELAY = 300; // Time interval for double tap detection (in milliseconds)

        if (lastTap && (currentTime - lastTap) < DOUBLE_TAP_DELAY && playingNow) {
            // Double tap detected
            setModalVisible(true);
            setLastTap(null);
            setPlayingNow(false);
            setTimeLeft(0);
        } else {
            setLastTap(currentTime);
        }
    };

    return (
        <TouchableOpacity
            style={{ flex: 1, alignItems: 'center' }}
            onPress={handleDoubleTap} // Handle double tap
            activeOpacity={1} // Ensure the touchable area is fully responsive
        >
            <View style={styles.banner}>
                <Text style={styles.bannerTitle}>{categoryName}</Text>

                <Text style={styles.h1}>Γύρος {currentRound} από {roundsCount}</Text>
            </View>
            <View style={styles.main}>
                <View style={styles.time}>
                    <FontAwesomeIcon icon={faHourglass} size={32} color="#E63946" />
                    <Text style={styles.title12}>{timeLeft}</Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.content}>
                        <Text style={styles.title1}>{challenge}</Text>
                    </View>
                </View>

                <Animated.View style={{ ...styles.time, opacity: fadeAnim, marginBottom: hp('5%') }}>
                    <FontAwesomeIcon icon={faHandPointer} size={32} />

                    <Text style={styles.title12}>Double-Tap, αν βρέθηκε η λέξη</Text>

                </Animated.View>
            </View>



            {!isLoading && (
                <>
                    <CategoryReveal
                        visible={categoryModalVisible}
                        onTap={() => {
                            setCategoryModalVisible(false)

                            setAwaitModalVisible(true)
                        }} categoryName={categoryName} currentRound={currentRound}
                    />

                    <AwaitsTapModal
                        visible={awaitModalVisible}
                        onTap={() => {
                            setAwaitModalVisible(false);
                            setTimeLeft(seconds || 3);
                            setPlayingNow(true);
                        }}
                        playerName={playerNames[playerPlaying]}
                        action={moves[actionPlaying]}
                        categoryName={categoryName}
                        playerAsking={playerNames[playerAsking]}
                        currentRound={currentRound}
                        roundsCount={roundsCount}
                    />

                    <FullScreenModal
                        visible={modalVisible}
                        onClose={closeModal}
                        playerName={playerNames[playerPlaying]}
                        currentRound={currentRound}
                        roundsCount={roundsCount}
                    />

                    {statsModalVisible && (
                        <StatsModal
                            visible={statsModalVisible}
                            gameMatrix={gameMatrix}
                        />
                    )}
                </>
            )}

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('80%'),

        flex: 2,
    },
    content: {
        backgroundColor: '#1D3557',
        borderRadius: wp('10%'),
        padding: hp('4.5%'),
    },
    main: {
        flex: 1,
        rowGap: hp('3%')
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
        marginTop: hp('2%')
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
    fadingContainer: {
        alignItems: 'center',
    }
});

export default GameScreen;
