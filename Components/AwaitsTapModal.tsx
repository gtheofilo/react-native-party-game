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
import Buzzer from './Buzzer';


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
            beepSound.current.stop(() => {
                beepSound.current.play((success) => {
                    if (!success) {
                        console.error('Sound playback failed');
                    }
                });
            });
        }
    };


    useEffect(() => {
        if (countdown !== null && countdown >= 0) {
            console.log(countdown)
            // Start the countdown when it is greater than or equal to 0
            intervalId.current = setInterval(() => {
                setCountdown((prev) => {
                    if (prev > 0) {
                        playBeep(); // Play beep sound every second, only if countdown is greater than 0
                    }
                    return prev - 1;
                });
                setFlashing((prev) => !prev); // Toggle flashing state
            }, 1000); // Decrease countdown every second
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


                {/* <Text style={styles.subtitle}>{funnyQuote}</Text> */}

                <View style={styles.description}>
                    <Text style={styles.title}>{categoryName}</Text>
                    <View style={styles.line}></View>
                    <Text style={styles.title}>{action}</Text>

                </View>

                <Buzzer onPress={startCountDown}></Buzzer>

                <View style={styles.countdownContainer}>
                    <Text style={[styles.countdownText, flashing && styles.flashingText]}>
                        {countdown > 0 ? countdown : 'Πάμε'}
                    </Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f1faee',
        justifyContent: 'space-between',
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
        borderColor: '#457b9d',
        width: '90%',
        padding: 16,
    },
    title: {
        fontSize: 24,
        color: '#1d3557',
        fontWeight: 'bold',
    },
    playerName: {
        fontFamily: 'Mynerve-Regular',
        fontSize: 36,
        color: '#457b9d',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#457b9d',
    },
    countdownContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    countdownText: {
        fontSize: hp('5%'),
        fontWeight: 'bold',
        color: '#457b9d',
        marginBottom: hp('1%')
    },
    flashingText: {
        color: '#E63946',
    },
    line: {
        height: hp('0.5%'),          // Height of the line
        backgroundColor: '#457b9d', // Color of the line (black)
        marginVertical: hp('2%'), // Space around the line,
        width: wp('70%')
    },
});

export default AwaitsTapModal;
