import React, { useRef, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing,
    ImageBackground,
    View
} from 'react-native';
import Sound from 'react-native-sound';


import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import backgroundImage from '../assets/bg.webp';
import { useSound } from '../Components/SoundContext';

import {
    INPUT_RANGE_START,
    INPUT_RANGE_END,
    OUTPUT_RANGE_START,
    OUTPUT_RANGE_END,
    ANIMATION_TO_VALUE,
    ANIMATION_DURATION,
} from '../constant';

type HomeScreenProps = PropsWithChildren<{
    navigation: any;
}>;

function HomeScreen({ navigation }: HomeScreenProps): React.JSX.Element {
    const initialValue = 0;
    const translateValue = useRef(new Animated.Value(initialValue)).current;

    useEffect(() => {
        const translate = () => {
            translateValue.setValue(initialValue);
            Animated.timing(translateValue, {
                toValue: ANIMATION_TO_VALUE,
                duration: ANIMATION_DURATION,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start(() => translate());
        };

        translate();
    }, [translateValue]);

    const translateAnimation = translateValue.interpolate({
        inputRange: [INPUT_RANGE_START, INPUT_RANGE_END],
        outputRange: [OUTPUT_RANGE_START, OUTPUT_RANGE_END],
    });

    const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);
    const { playSound } = useSound();

    return (
        <SafeAreaView style={styles.container}>
            {/* Wrapper View to hold background image and content */}
            <View style={styles.contentWrapper}>
                {/* Background image */}
                <AnimatedImage
                    resizeMode="repeat"
                    style={[styles.background, {
                        transform: [
                            {
                                translateX: translateAnimation,
                            },
                            {
                                translateY: translateAnimation,
                            },
                        ],
                    }]}
                    source={backgroundImage}
                />

                {/* Content over the background */}
                <View style={styles.content}>
                    <Text style={styles.brandName}>Βρές την κάρτα!</Text>
                    <Text style={styles.brandName}>Παιχνίδι Παρέας</Text>
                    <Text onPress={ () => {    playSound()}}>aaaaaaa</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('GameInit')}>
                        <Text style={styles.closeButtonText}>ΕΝΑΡΞΗ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('GameRules')}>
                        <Text style={styles.closeButtonText}>ΟΔΗΓΟΣ ΠΑΙΧΝΙΔΙΟΥ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, // Ensure the content is above the background
    },
    brandName: {
        color: "#457B9D",
        fontSize: hp('4%'),
        fontFamily: 'Mynerve-Regular',
        marginBottom: hp('2%'),
    },
    btn: {
        backgroundColor: '#E63946',
        paddingVertical: hp('2%'),
        borderRadius: hp('2%'),
        width: wp('70%'),
        alignItems: 'center',
        marginBottom: hp('2%'),
        borderColor: '#fff',
        borderWidth: hp('0.5%'),
        // Shadow properties for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: hp('0.8%') },
        shadowOpacity: 0.3,
        shadowRadius: hp('1%'),
        // Elevation for Android (creates shadow-like effect)
        elevation: 5,
        // Gradient-like effect (optional, if you want to simulate lighting from top)
        backgroundImage: 'linear-gradient(145deg, #D62839, #E63946)',
    },    
    closeButtonText: {
        color: '#fff',
        fontSize: hp('2.2%'),
        fontWeight: 'bold',
    },
    background: {
        position: 'absolute',
        width: 1200,
        height: 1200,
        top: 0,
        opacity: 0.6,
        zIndex: -1, // Move the background behind the content
    },
});

export default HomeScreen;
