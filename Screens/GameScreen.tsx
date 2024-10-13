import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Alert } from 'react-native';
import AwaitsTapModal from "../Components/AwaitsTapModal";
import GameButton from "../Components/Button";
import FullScreenModal from "../Components/FullScreenModal";
import data from '../assets/db/tmp.json';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Sound from 'react-native-sound';
import StatsModal from "../Components/StatsModal";

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
    'Τι είμαι;': 'whoami',
    'Πες το με ήχο!': 'sound',
    'Παντομίμα': 'gestures',
};

function GameScreen({ route }) {
    let { playerNames, roundsCount, seconds } = route.params;

    const [currentRound, setCurrentRound] = useState(1);
    const [playerPlaying, setPlayerPlaying] = useState(0);
    const [playerAsking, setPlayerAsking] = useState(1);
    const [shuffledPlayerNames, setShuffledPlayerNames] = useState([]);
    const [actionPlaying, setActionPlaying] = useState(null);
    const [actionPlayingName, setActionPlayingName] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [statsModalVisible, setStatsModalVisible] = useState(false);

    const [categoryName, setCategoryName] = useState(false);
    const [challenge, setChallenge] = useState(false);
    const [awaitModalVisible, setAwaitModalVisible] = useState(true);
    const [gameMatrix, setGameMatrix] = useState({});

    const gameStart = () => {
        const shuffledNames = shuffleArray(playerNames);  // Shuffle the players at the start
        setShuffledPlayerNames(shuffledNames);

        const dictionary = playerNames.reduce((acc, key) => {
            acc[key] = 0;
            return acc;
        }, {});
        setGameMatrix(dictionary)

        setPlayerPlaying(0);
        setPlayerAsking(1);
        setCurrentRound(1);

        let k = pickRandomKey(moves);
        setActionPlaying(k);
        setActionPlayingName(moves[k]);

        let t = pickRandomKey(data.challenges);
        setChallenge(data.challenges[t][moves[k]][Math.floor(Math.random() * data.challenges[t][moves[k]].length)]);
        setCategoryName(t);
    };

    const switchPlayer = () => {
        if (playerPlaying + 1 < shuffledPlayerNames.length) {
            setPlayerPlaying((prev) => prev + 1);
            setPlayerAsking((prev) => (prev + 1) % shuffledPlayerNames.length);
        } else {
            if (currentRound < roundsCount) {
                setCurrentRound((prev) => prev + 1);
                const reshuffledNames = shuffleArray(shuffledPlayerNames);
                setShuffledPlayerNames(reshuffledNames);
                setPlayerPlaying(0);
                setPlayerAsking(1);
            } else {
                Alert.alert("GAME FINISHED");
                setStatsModalVisible(true)
            }
        }

        let k = pickRandomKey(moves);
        setActionPlaying(k);
        setActionPlayingName(moves[k]);

        console.log('DATA CHALLENGES:', data.challenges)
        let t = pickRandomKey(data.challenges);
        setChallenge(data.challenges[t][moves[k]][Math.floor(Math.random() * data.challenges[t][moves[k]].length)]);
        setCategoryName(t);
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
        if (answer == 1) {
            let tmpMatrix = gameMatrix
            tmpMatrix[shuffledPlayerNames[playerPlaying]] = tmpMatrix[shuffledPlayerNames[playerPlaying]] + 1
            setGameMatrix(tmpMatrix)
        }
        console.log(gameMatrix)
        switchPlayer();
        setModalVisible(false);
        setAwaitModalVisible(true);
    };

    const beepSound = useRef(null);

    useEffect(() => {
        beepSound.current = new Sound(require('../assets/countdown.mp3'), Sound.MAIN_BUNDLE, (error) => {
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

    return (
        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={styles.banner}>
                <Text style={styles.h1}>Γύρος {currentRound} από {roundsCount}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.title}>
                    {actionPlaying}
                </Text>
                <View style={styles.line} />
                <Text style={styles.title1}>{challenge}</Text>
            </View>

            <View style={styles.time}>
                <FontAwesomeIcon icon={faHourglass} size={32} color="#C1121F" />
                <Text style={styles.title12}>{timeLeft} δευτερόλεπτα απομένουν...</Text>
            </View>

            <AwaitsTapModal
                visible={awaitModalVisible}
                onTap={() => {
                    setAwaitModalVisible(false);
                    setTimeLeft(seconds || 3);
                }}
                playerName={shuffledPlayerNames[playerPlaying]}
                action={actionPlaying}
                categoryName={categoryName}
                playerAsking={shuffledPlayerNames[playerAsking]}
            />

            <FullScreenModal
                visible={modalVisible}
                onClose={closeModal}
                playerName={shuffledPlayerNames[playerPlaying]}
            />

            <StatsModal
                visible={statsModalVisible}
                // onFinish={closeModal}
                gameMatrix={gameMatrix}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        backgroundColor: '#003049',
        width: '80%',
        borderRadius: 20,
        rowGap: 8,
        height: '30%',
    },
    banner: {
        backgroundColor: '#669bbc',
        width: '100%',
        alignItems: 'center',
        padding: 8,
    },
    time: {
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fdf0d5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title1: {
        fontSize: 32,
        color: '#fdf0d5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        textDecorationLine: 'underline',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fdf0d5',
    },
    line: {
        height: 1,
        backgroundColor: 'white',
        width: '100%',
    },
});

export default GameScreen;

