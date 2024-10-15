// FullScreenModal.js
import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { faUserNinja } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Sound from 'react-native-sound';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'


Sound.setCategory('Playback');

const funnyQuotes = [
    'Σε παρακαλώ μην μας απογοητεύσεις...',
    'Σε κόβω για κομματάκι άσχετο...',
    'Αν το βρεις θα είναι θαύμα...',
    'Μην το λούσεις πάλι...',
    'Τώρα θα γελάσουμε...',
    'Ξέρεις να διαβάζεις;',
    'Θυμάσαι να σκέφτεσαι ή ξέχασες;'
]

const AwaitsTapModal = ({ visible, onTap, playerName, action, categoryName, playerAsking, currentRound, roundsCount }) => {
    const [countdown, setCountdown] = useState(null);
    const [flashing, setFlashing] = useState(false);
    const [funnyQuote, setFunnyQuote] = useState(null);
    const intervalId = useRef(null);
    const beepSound = useRef(null);

    useEffect(() => {
        // Load the sound file
        beepSound.current = new Sound(require('../assets/beep.mp3'), Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.error('Failed to load the sound', error);
            }
        });

        // Cleanup the sound when the component unmounts
        return () => {
            if (beepSound.current) {
                beepSound.current.release();
            }
        };
    }, []);

    const playBeep = () => {
        if (beepSound.current) {
            beepSound.current.play((success) => {
                if (!success) {
                    console.error('Sound playback failed');
                }
            });
        }
    };

    useEffect(() => {
        if (countdown !== null && countdown >= 0) {
            // Start the countdown when it is greater than or equal to 0
            intervalId.current = setInterval(() => {
                setCountdown((prev) => prev - 1);
                setFlashing((prev) => !prev); // Toggle flashing state
            }, 1000); // Decrease countdown every second
            playBeep(); // Play beep sound immediately when countdown starts
        } else if (countdown === -1) {
            // When countdown reaches -1, clear the interval and stop flashing
            clearInterval(intervalId.current);
            setFlashing(false);
            onTap();
        }

        // Cleanup the interval on unmount or when countdown changes
        return () => clearInterval(intervalId.current);
    }, [countdown]);

    useEffect(() => {
        setFunnyQuote(funnyQuotes[Math.floor(Math.random() * funnyQuotes.length)])
    }, [])

    const startCountDown = () => {
        setFlashing(false);
        setCountdown(3); // Start the countdown at 3
    };

    return (
        <Modal visible={visible} transparent={false}>
            <View style={styles.banner}>
                <Text style={styles.h1}>Γύρος {currentRound} από {roundsCount}</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.card}>
                    <FontAwesomeIcon icon={faUserNinja} size={32} color="#C1121F" />
                    <Text style={styles.playerName}>{playerName}</Text>
                    <FontAwesomeIcon icon={faUserNinja} size={32} color="#C1121F" />
                </View>

                <Text style={styles.title}>Σου περιγράφει ο {playerAsking}</Text>


                <Text style={styles.subtitle}>{funnyQuote}</Text>

                <View style={styles.description}>
                    <Text style={styles.title}>{categoryName}</Text>
                </View>

                <View style={styles.description}>
                    <Text style={styles.title}>{action}</Text>
                </View>

                <Text style={styles.subtitle} onPress={startCountDown}>(Έναρξη Χρόνου)</Text>

                {countdown !== null && (
                    <View style={styles.countdownContainer}>
                        <Text style={[styles.countdownText, flashing && styles.flashingText]}>
                            {countdown > 0 ? countdown : 'Go'}
                        </Text>
                    </View>
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',
        rowGap: 32,
    },
    banner: {
        backgroundColor: '#E63946',
        width: wp('100%'),
        alignItems: 'center',
        padding: hp('1.5%'),
    },
    h1: {
        fontSize: hp('2%'),
        fontWeight: 'bold',
        color: '#fdf0d5',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 32,
        columnGap: 16,
    },
    description: {
        alignItems: 'center',
        borderWidth: 8,
        borderColor: '#E63946',
        width: '90%',
        padding: 16,
    },
    title: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
    playerName: {
        fontFamily: 'Mynerve-Regular',
        fontSize: 36,
        color: 'white',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    countdownContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    countdownText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
    },
    flashingText: {
        color: '#E63946',
    },
});

export default AwaitsTapModal;
