import React, { useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    StyleSheet,
} from 'react-native';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

function Buzzer({ onPress, countdown }) {
    // Reference for scaling animation
    const scaleValue = useRef(new Animated.Value(1)).current;

    // Function to handle button press with scale animation
    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.9, // Shrink the button slightly
            useNativeDriver: true,
        }).start();
        onPress()
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1, // Return to original size
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={styles.main}>
            <TouchableOpacity style={[styles.buzzer, { transform: [{ scale: scaleValue }] }]}
                activeOpacity={0.8}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                {
                    (countdown === 3) ? (
                        <Text style={styles.buzzerText}>Παίξε!</Text>
                    ) : (
                        <Text style={styles.buzzerText}>{countdown + 1}</Text>
                    )
                }


            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
    },
    buzzer: {
        backgroundColor: '#E63946',
        borderColor: 'white',
        borderRadius: hp('100%'), 
        width: wp('30%'),
        height: hp('15%'),
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
    },
    buzzerText: {
        color: '#fff',
        fontSize: hp('3%'),
        fontWeight: 'bold',
    },
});

export default Buzzer;
