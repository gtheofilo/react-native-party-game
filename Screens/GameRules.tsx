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

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import backgroundImage from '../assets/bg.webp';

import {
    INPUT_RANGE_START,
    INPUT_RANGE_END,
    OUTPUT_RANGE_START,
    OUTPUT_RANGE_END,
    ANIMATION_TO_VALUE,
    ANIMATION_DURATION,
} from '../constant';

type GameRulesProps = PropsWithChildren<{
    navigation: any;
}>;

function GameRules({ navigation }: GameRulesProps): React.JSX.Element {
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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentWrapper}>
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
                <View style={styles.content}>
                    <Text style={styles.textHeader}>Πώς παίζεται;</Text>

                    <Text style={styles.text}>
                        Αφού επιλέξετε τις ρυθμίσεις του παιχνιδιού (αριθμός παικτών, γύρων και διάρκεια της κάθε δοκιμασίας), το παιχνίδι ξεκινάει!
                    </Text>

                    <Text style={styles.text}>
                        Σε κάθε γύρο, παίζεται μία συγκεκριμένη κατηγορία ερωτήσεων. Οι παίκτες παίζουν συνεργατικά, με τον έναν να περιγράφει την κάρτα και τον άλλο να προσπαθεί να τη βρει.
                    </Text>

                    <Text style={styles.text}>
                        Υπάρχουν τρεις τρόποι για την περιγραφή της κάρτας:
                    </Text>

                    <Text style={styles.text}>
                        1. Με παντομίμα, όπου ο παίκτης προσπαθεί να μιμηθεί το περιεχόμενο της κάρτας με κινήσεις.
                    </Text>
                    <Text style={styles.text}>
                        2. Με ήχους, όπου ο παίκτης δημιουργεί ήχους σχετικούς με την κάρτα.
                    </Text>
                    <Text style={styles.text}>
                        3. Με τις απαντήσεις "Ναι", "Όχι", "Περίπου", όπου ο παίκτης που ψάχνει την κάρτα κάνει ερωτήσεις και ο άλλος απαντάει μόνο με αυτές τις τρεις λέξεις.
                    </Text>

                    <Text style={styles.text}>
                        Κάθε σωστή απάντηση δίνει και στους δύο παίκτες από έναν πόντο, ως ένδειξη της επιτυχούς συνεργασίας τους.
                    </Text>

                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.closeButtonText}>ΠΙΣΩ...</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    textHeader: {
        color: '#457B9D',
        fontSize: hp('3.5%'),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        color: 'black',
        fontSize: hp('2%'),
        width: wp('90%'),
        textAlign: 'justify',
    },
    container: {
        flex: 1,
    },
    contentWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: hp('1%'),
        flex: 1,
        alignItems: 'center',
        rowGap: hp('3%'),
        width: wp('100%'),
        zIndex: 1,
    },
    btn: {
        backgroundColor: '#E63946',
        paddingVertical: hp('2%'),
        borderRadius: hp('2%'),
        width: wp('70%'),
        alignItems: 'center',
        marginTop: hp('5%'),
        borderColor: '#fff',
        borderWidth: hp('0.5%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: hp('0.8%') },
        shadowOpacity: 0.3,
        shadowRadius: hp('1%'),
        elevation: 5,
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
        zIndex: -1,
    },
});

export default GameRules;
