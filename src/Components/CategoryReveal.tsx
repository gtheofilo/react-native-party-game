// FullScreenModal.js
import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RandomTextReveal from '../Components/RandomTextReveal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHandPointer } from '@fortawesome/free-solid-svg-icons';

const FADE_DURATION = 1000;
const FADE_DELAY = 300;

const CategoryReveal = ({ visible, onTap, categoryName = "1", currentRound }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            const loopAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: FADE_DURATION,
                        useNativeDriver: true,
                    }),
                    Animated.delay(FADE_DELAY),
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: FADE_DURATION,
                        useNativeDriver: true,
                    }),
                    Animated.delay(FADE_DELAY),
                ])
            );
            loopAnimation.start();
            return () => loopAnimation.stop();
        }
    }, [visible, fadeAnim]);

    return (
        <Modal visible={visible}>
            <TouchableOpacity style={styles.container} onPress={onTap}>
                <Text style={styles.h1}>ΓΥΡΟΣ {currentRound}</Text>
                <RandomTextReveal
                    text={categoryName}
                    revealSpeed={200}
                    scrambleSpeed={50}
                    iterations={5}
                />
                <Animated.View style={[styles.fadingContainer, { opacity: fadeAnim }]}>
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
        gap: hp('2%'),
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
        alignItems: 'center',
        gap: hp('2%'),
    },
});

export default CategoryReveal;
