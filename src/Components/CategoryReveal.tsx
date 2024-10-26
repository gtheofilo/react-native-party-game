// FullScreenModal.js
import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import RandomTextReveal from '../Components/RandomTextReveal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { faHandPointer } from '@fortawesome/free-solid-svg-icons';


const CategoryReveal = ({ visible, onTap, categoryName = 1, currentRound }) => {
    const [time, setTime] = useState(2)
    const [animationFinsihed, setAnimationFinished] = useState(false)

    const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial opacity value: 0

    useEffect(() => {
        // Create a loop of fade in and fade out animations with smoother transitions
        const loopAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,    // Fade in to opacity 1
                    duration: 1000,  // Duration in ms
                    useNativeDriver: true,
                }),
                Animated.delay(300),  // Short delay at full opacity
                Animated.timing(fadeAnim, {
                    toValue: 0,    // Fade out to opacity 0
                    duration: 1000,  // Duration in ms
                    useNativeDriver: true,
                }),
                Animated.delay(300)   // Short delay at zero opacity
            ])
        );
    
        // Start the animation loop
        loopAnimation.start();
    
        // Cleanup animation on component unmount
        return () => loopAnimation.stop();
    }, [fadeAnim]);

    return (
        <Modal visible={visible} animationIn="slideInLeft"
        >
            <TouchableOpacity style={styles.container} onPress={onTap}>
                <Text style={styles.h1}>ΓΥΡΟΣ {currentRound}</Text>
                <RandomTextReveal
                    text={categoryName}   // The text you want to reveal
                    revealSpeed={200}     // Delay between starting to reveal next letter
                    scrambleSpeed={50}    // Speed of random letters switching
                    iterations={5}        // Number of random letter iterations before revealing
                />

                <Animated.View style={{ ...styles.fadingContainer, opacity: fadeAnim }}>
                    <FontAwesomeIcon icon={faHandPointer} size={32} color="black" />
                    <Text style={styles.h2}>Πατήστε εδώ για συνέχεια</Text>
                </Animated.View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: hp('1%')
    },
    h1: {
        color: 'black',
        fontSize: hp('3%'),
        textAlign: 'center',
    },
    h2: {
        color: 'black',
        fontSize: hp('2%'),
        textAlign: 'center',
    },
    fadingContainer: {
        marginTop: hp('15%'),
        rowGap: hp('2%'),
        alignItems: 'center',
    }
});

export default CategoryReveal;
