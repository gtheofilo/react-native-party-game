// FullScreenModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

const quotes = [
    'Εσείς πρέπει να είστε αχτύπητο δίδυμo...😂',
    'Δεν έχω ξανά δει τέτοια συνεργασία 😂'
]
const FullScreenModal = ({ visible, onClose, currentRound, roundsCount, categoryName }) => {
    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2209521706517983/4199716068'; // Replace with your actual Ad Unit ID for production

    return (
        <Modal
            visible={visible}
            transparent={false}
        >
            <View style={styles.banner}>
                <Text style={styles.bannerTitle}>{categoryName}</Text>
                <Text style={styles.h1}>Γύρος {currentRound} από {roundsCount}</Text>
            </View>
            

            <View style={styles.container}>

                <View style={styles.col}>

                    <Text style={styles.finished}>Βρήκες την κάρτα;</Text>
                    <View style={[{ flexDirection: 'row', columnGap: wp('3%') },]}>

                        <TouchableOpacity style={styles.yes} onPress={() => { onClose(1) }}>
                            <Text style={styles.closeButtonText}>ΝΑΙ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.no} onPress={() => { onClose(0) }}>
                            <Text style={styles.closeButtonText}>ΟΧΙ</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
            <BannerAd unitId={adUnitId} size={BannerAdSize.FULL_BANNER} />

        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    quote: {
        fontFamily: 'Mynerve-Regular',
        fontSize: hp('2.5%'),
        color: 'black',
    },
    banner: {
        backgroundColor: '#E63946',
        width: wp('100%'),
        alignItems: 'center',
        padding: hp('1.5%'),
    },
    bannerTitle: {
        fontSize: hp('3%'),
        textAlign: 'center',
        color: '#fdf0d5',
    },
    h1: {
        fontSize: hp('2%'),
        fontWeight: 'bold',
        color: '#fdf0d5',
        textAlign: 'center',
    },
    finished: {
        fontWeight: 'bold',
        fontSize: hp('3%')
    },
    col: {
        alignItems: 'center',
        justifyItems: 'center',
        rowGap: hp('3%'),
        width: wp('100%'),

    },
    yes: {
        padding: hp('3%'),
        backgroundColor: 'green',
        borderRadius: hp('5%'),
    },
    no: {
        padding: hp('3%'),
        backgroundColor: 'red',
        borderRadius: hp('5%'),
    },
    closeButtonText: {
        color: '#fff',
        fontSize: hp('2%'),
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
    },
});

export default FullScreenModal;
