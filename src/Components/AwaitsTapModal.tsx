import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import { BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';

import Buzzer from './Buzzer';
import { useSound } from '../Components/SoundContext';

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
    const [countdown, setCountdown] = useState(3);
    const [beginCountDown, setBeginCountDown] = useState(false);
    const [countDownFinished, setCountDownFinished] = useState(-1)
    const intervalId = useRef(null);
    const { playSound } = useSound();
    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2209521706517983/4199716068'; // Replace with your actual Ad Unit ID for production


    useEffect(() => {
        if (beginCountDown) {
            intervalId.current = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown > 0) {
                        playSound("beep");
                        return prevCountdown - 1;
                    } else {
                        setBeginCountDown(false);
                        setCountDownFinished((prev) => prev + 1)
                        clearInterval(intervalId.current);
                        return 3
                    }
                });
            }, 1000);
        } 
    
        return () => clearInterval(intervalId.current);
    }, [beginCountDown]);

    // useEffect(() => {
    //     console.log(countdown)
    // }, [countdown])
    
    useEffect(() => {
        onTap()
    }, [countDownFinished])
    
    const startCountDown = () => {
        setBeginCountDown(true)
    };

    return (
        <Modal visible={visible} transparent={false}
        >
            <View style={styles.banner}>
                <Text style={styles.bannerTitle}>{categoryName}</Text>
                <Text style={styles.h1}>Γύρος {currentRound} από {roundsCount}</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.playerName}> {playerName}</Text>
                    <Text style={styles.title}>... σου περιγράφει ο παίχτης {playerAsking}</Text>
                </View>

                <View style={styles.description}>
                    <View style={styles.header}>
                        <Text style={styles.categoryName}>{action}</Text>
                    </View>

                    {action === 'Παντομίμα' && <Text style={styles.hint}>
                        Αναπαράστησε την λέξη που θα εμφανιστεί μόνο με χειρονομίες, χωρίς να μιλήσεις.
                        Χρησιμοποίησε κινήσεις για βοήθεια, όπως ο αριθμός λέξεων.

                    </Text>}

                    {action === 'Ναί, Όχι, Περίπου' && <Text style={styles.hint}>
                        Ο παίχτης που ψάχνει την λέξη κάνει ερωτήσεις και εσύ απαντάς μόνο
                        με Ναί, Όχι, Περίπου.
                    </Text>}
                    {action === 'Κάν\'το με ήχο!' && <Text style={styles.hint}>
                        Χρησιμοποίησε την φωνή σου για να περιγράψεις την κάρτα που θα εμφανιστεί.
                        Μην χρησιμοποιήσεις λέξεις αλλά μόνο ήχους.
                    </Text>}
                </View>
                
                <Buzzer onPress={startCountDown} countdown={countdown}></Buzzer>
            </View>
            <BannerAd
                unitId={adUnitId} // Set Ad Unit ID
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}

            />
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
        textAlign: 'center',
    },
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: hp('5%'),
        rowGap: wp('5%'),
        width: wp('90%'),
    },
    description: {
        flex: 1,
        width: '80%',
        borderWidth: hp('1%'),
        alignItems: 'center',
        borderRadius: hp('3%'),
        borderColor: '#457b9d',
    },
    header: {
        backgroundColor: '#457b9d',
        width: '100%',
        padding: hp('1%'),
    },
    categoryName: {
        color: 'white',
        textAlign: 'center',
        fontSize: hp('3.5%'),
        fontStyle: 'italic'
    },
    bannerTitle: {
        fontSize: hp('3%'),
        textAlign: 'center',
        color: '#fdf0d5',
    },
    title: {
        fontSize: hp('3%'),
        textAlign: 'center',
    },
    hint: {
        fontSize: hp('2%'),
        fontWeight: 'bold',
        marginTop: hp('1%'),
        textAlign: 'center',
        padding: hp('1%')
    },
    playerName: {
        fontFamily: 'Mynerve-Regular',
        fontSize: hp('6%'),
        color: 'black',
    },
    countdownContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    countdownText: {
        fontSize: hp('5%'),
        fontWeight: 'bold',
        marginBottom: hp('1%')
    },
    flashingText: {
        color: '#E63946',
    },
    line: {
        height: hp('0.1%'),          // Height of the line
        backgroundColor: 'black', // Color of the line (black)
        marginVertical: hp('2%'), // Space around the line,
        width: wp('70%')
    },
});

export default AwaitsTapModal;
