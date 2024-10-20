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

function Buzzer({onPress}) {
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
        <View style={styles.container}>
            <Animated.View style={[styles.buzzer, { transform: [{ scale: scaleValue }] }]}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                >
                    <Text style={styles.buzzerText}>Παίξε</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buzzer: {
        backgroundColor: '#E63946',
        borderColor: 'white',
        borderRadius: hp('100%'), // Make it circular
        width: wp('40%'),
        height: hp('20%'),
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
