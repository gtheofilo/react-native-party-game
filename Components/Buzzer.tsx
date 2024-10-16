import React, { useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    StyleSheet,
} from 'react-native';

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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buzzer: {
        backgroundColor: '#E63946',
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 100, // Make it circular
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5, // Shadow for Android
    },
    buzzerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Buzzer;
