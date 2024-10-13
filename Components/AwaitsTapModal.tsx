// FullScreenModal.js
import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { faUserNinja } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Sound from 'react-native-sound';

// Enable playback in silent mode (iOS only)
Sound.setCategory('Playback');

const AwaitsTapModal = ({ visible, onTap, playerName, action, categoryName, playerAsking }) => {
    const [countdown, setCountdown] = useState(null); // Start countdown at 3 seconds
    const [flashing, setFlashing] = useState(false);

    const intervalId = useRef(null); // useRef for persistent interval reference
    const beepSound = useRef(null);  // useRef for persistent sound reference

    useEffect(() => {
        // Load the sound file
        beepSound.current = new Sound(require('../assets/beep.mp3'), Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Failed to load the sound', error);
                return;
            }
        });

        // Cleanup the sound when the component zunmounts
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

    const startCountDown = () => {
        setFlashing(false);
        setCountdown(3); // Start the countdown at 3
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={false}
        >
            <View style={styles.container}>
                <View style={styles.card}>
                    <FontAwesomeIcon icon={faUserNinja} size={32} color="#C1121F" />
                    <Text style={styles.title}>{playerName}</Text>
                    <FontAwesomeIcon icon={faUserNinja} size={32} color="#C1121F" />
                </View>

                <Text style={styles.title}>Θα σου περιγράψει ο {playerAsking}</Text>

                <Text style={styles.subtitle}>Σε παρακαλώ μην μας απογοητεύσεις...</Text>

                <View style={styles.description}>
                    <Text style={styles.title}>{action}</Text>
                </View>


                <View style={styles.description}>
                    <Text style={styles.title}>{categoryName}</Text>
                </View>

                <Text style={styles.subtitle} onPress={startCountDown}>(Πάτησε εδώ)</Text>

                {countdown !== null && (
                    <View style={styles.countdownContainer}>
                        <Text style={[styles.countdownText, flashing && styles.flashingText]}>
                            {countdown > 0 ? countdown : "Go"}
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
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 32,
        columnGap: 16,
    },
    description: {
        alignItems: 'center',
        borderWidth: 8,
        borderColor: 'red',
        width: '90%',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
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
        color: 'red', // Change color to red when flashing
    },
});

export default AwaitsTapModal;
