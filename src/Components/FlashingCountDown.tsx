import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FlashingCountDown = forwardRef((props, ref) => {
    const { onSendData } = props; // Destructure props
    const [countdown, setCountdown] = useState(3); // Start countdown at 3 seconds
    const [flashing, setFlashing] = useState(false);
    let intervalId;

    useImperativeHandle(ref, () => ({
        Play() {
            console.log('PLAYED');
            setCountdown(3); // Reset the countdown to 3
            setFlashing(false); // Reset flashing
        }
    }));

    useEffect(() => {
        // Start the countdown when it is greater than 0
        if (countdown > -1) {
            intervalId = setInterval(() => {
                setCountdown((prev) => prev - 1);
                setFlashing((prev) => !prev); // Toggle flashing state
            }, 1000); // Decrease countdown every second
        } else {
            // When countdown reaches 0, clear interval
            clearInterval(intervalId);
            onSendData && onSendData(); // Optionally call onSendData callback
        }

        // Cleanup the interval on unmount or when countdown changes
        return () => clearInterval(intervalId);
    }, [countdown]);

    return (
        <View style={[
            countdown === -1 ? { opacity: 0 } : styles.container,
        ]}>

            <Text style={[styles.countdownText, flashing && styles.flashingText]}>
                {countdown > 0 ? countdown : "Go"}
            </Text>

        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    countdownText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white'
    },
    flashingText: {
        color: 'red', // Change color to red when flashing
    },
});

export default FlashingCountDown;
