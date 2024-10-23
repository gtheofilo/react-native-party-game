import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AwaitsTapModal from "../Components/AwaitsTapModal";
import GameButton from "../Components/Button";
import FullScreenModal from "../Components/FullScreenModal";
import data from '../assets/db/tmp.json';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Sound from 'react-native-sound';
import StatsModal from "../Components/StatsModal";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import KeepAwake from 'react-native-keep-awake';
import CategoryReveal from "../Components/CategoryReveal";

// Enable playback in silent mode (iOS only)
Sound.setCategory('Playback');

const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

const pickRandomKey = (obj) => {
    const keys = Object.keys(obj);
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
};

const moves = {
    'whoami': 'Ναί, Όχι, Περίπου',
    'sound': 'Κάντο το με ήχο!',
    'gestures': 'Παντομίμα',
};

function GameScreen({ route }) {
    let { playerNames, roundsCount, seconds } = route.params;

    const [currentRound, setCurrentRound] = useState(1);
    const [playerPlaying, setPlayerPlaying] = useState(0);
    const [playerAsking, setPlayerAsking] = useState(1);
    const [shuffledPlayerNames, setShuffledPlayerNames] = useState([]);
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

    useEffect(() => {
        // Activate the keep awake functionality
        KeepAwake.activate();

        // Cleanup function to deactivate when the component unmounts
        return () => {
            KeepAwake.deactivate();
        };
    }, []);


    const gameStart = () => {
        // Shuffle Names
        const shuffledNames = shuffleArray(playerNames);
        setShuffledPlayerNames(shuffledNames);

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
        if (playerPlaying + 1 < shuffledPlayerNames.length) {
            setPlayerPlaying((prev) => prev + 1);
            setPlayerAsking((prev) => (prev + 1) % shuffledPlayerNames.length);

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
        gameStart();
    }, []);

    useEffect(() => {
        let timer;
        if (currentRound <= roundsCount && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            if (timeLeft === 10) {
                playBeep();
            }
        } else if (currentRound <= roundsCount && timeLeft === 0) {
            clearInterval(timer);
            setModalVisible(true);
        } else if (currentRound > roundsCount) {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [timeLeft]);

    const closeModal = (answer) => {
        if (answer === 1) {
            let tmpMatrix = { ...gameMatrix };
            tmpMatrix[shuffledPlayerNames[playerPlaying]] += 1;
            setGameMatrix(tmpMatrix);
        }
        console.log(gameMatrix);
        switchPlayer();
        setModalVisible(false);
    };

    const beepSound = useRef(null);

    useEffect(() => {
        beepSound.current = new Sound(require('../assets/sounds/countdown.mp3'), Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Failed to load the sound', error);
                return;
            }
        });

        return () => {
            beepSound.current.release();
        };
    }, []);

    const playBeep = () => {
        beepSound.current.play((success) => {
            if (!success) {
                console.log('Sound playback failed');
            }
        });
    };

    const handleDoubleTap = () => {
        const currentTime = Date.now();
        const DOUBLE_TAP_DELAY = 300; // Time interval for double tap detection (in milliseconds)

        if (lastTap && (currentTime - lastTap) < DOUBLE_TAP_DELAY && playingNow) {
            // Double tap detected
            setModalVisible(true);
            setLastTap(null);
            setPlayingNow(false);
            setTimeLeft(-1);
        } else {
            // Single tap or reset
            setLastTap(currentTime);
        }
    };

    return (
        <TouchableOpacity
            style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
            onPress={handleDoubleTap} // Handle double tap
            activeOpacity={1} // Ensure the touchable area is fully responsive
        >
            <View style={styles.banner}>
                <Text style={styles.h1}>Γύρος {currentRound} από {roundsCount}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.title1}>{challenge}</Text>
            </View>

            <View style={styles.time}>
                <FontAwesomeIcon icon={faHourglass} size={32} color="#E63946" />
                <Text style={styles.title12}>{timeLeft} δευτερόλεπτα απομένουν...</Text>
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
                        playerName={shuffledPlayerNames[playerPlaying]}
                        action={moves[actionPlaying]}
                        categoryName={categoryName}
                        playerAsking={shuffledPlayerNames[playerAsking]}
                        currentRound={currentRound}
                        roundsCount={roundsCount}
                    />

                    <FullScreenModal
                        visible={modalVisible}
                        onClose={closeModal}
                        playerName={shuffledPlayerNames[playerPlaying]}
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
        backgroundColor: '#1D3557',
        width: wp('80%'),
        borderRadius: wp('10%'),
        padding: hp('4.5%'),
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
