// FullScreenModal.js
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

import { BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';


const StatsModal = ({ visible, gameMatrix, navigation }) => {
    const [sortedEntries, setSortedEntries] = useState([]);
    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2209521706517983/4199716068'; // Replace with actual Ad Unit ID in production

    // Convert the gameMatrix to an array of entries and sort it in descending order based on scores
    useEffect(() => {
        const entries = Object.entries(gameMatrix).sort((a, b) => b[1] - a[1]);
        setSortedEntries(entries);
    }, []);

    return (
        <Modal visible={visible}>
            <BannerAd unitId={adUnitId} size={BannerAdSize.FULL_BANNER} />

            <View style={styles.container}>

                <View style={styles.col1}>

                    <Text style={styles.h2}>Το παιχνίδι τελείωσε!</Text>

                    <Text style={styles.h2}>Συγχαρητήρια σε όλους. Δείτε τους πόντους σας παρακάτω.</Text>

                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.closeButtonText}>ΝΕΟ ΠΑΙΧΝΙΔΙ</Text>
                    </TouchableOpacity>

                    <Image
                        source={require('../assets/images/trophy.webp')}
                        style={styles.image}
                    />


                </View>
                <View style={styles.leaderboard}>
                    <Text style={styles.h1}>Αποτελέσματα</Text>
                    <View style={styles.row}>
                        <Text>Παίχτης</Text>
                        <Text>Score</Text>
                    </View>

                    <ScrollView contentContainerStyle={styles.content}>
                        {sortedEntries.map(([player, score], index) => (
                            <View key={player} style={styles.row}>
                                <Text style={[
                                    index === 0 && styles.top,
                                    index === 1 && styles.second,
                                    index === 2 && styles.third,
                                    index > 2 && styles.sample
                                ]}>
                                    {index + 1}. {player}
                                </Text>
                                <Text style={[
                                    index === 0 && styles.top,
                                    index === 1 && styles.second,
                                    index === 2 && styles.third,
                                    index > 2 && styles.sample

                                ]}>
                                    {score}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>

                </View>
            </View>
        </Modal >
    );
};

const styles = StyleSheet.create({
    container: {
        height: hp('100%'),
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#E0E0E0',
    },
    col1: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('50%'),
        width: wp('95%'),
        rowGap: hp('2%')
    },
    h2: {
        fontSize: hp('2%'),
        fontWeight: 'bold',
        color: '#457B9D',
    },
    content: {
        alignItems: 'center',
        width: wp('100%'), 
    },
    leaderboard: {
        backgroundColor: 'white',
        borderTopLeftRadius: hp('5%'),
        borderTopRightRadius: hp('5%'),
        width: wp('100%'),
        height: hp('50%'),
        paddingTop: hp('3%'),
        // paddingBottom: hp('30%'),
        alignItems: 'center',
        rowGap: hp('1.5%'),
        shadowColor: '#000', // Shadow color
        elevation: 5, // Elevation level
    },
    row: {
        flexDirection: 'row',
        gap: wp('5%'),
        width: wp('70%'),
        justifyContent: 'space-between',
    },
    h1: {
        fontWeight: 'bold',
        fontSize: hp('3%'),
    },
    no: {
        backgroundColor: 'green',
    },
    top: {
        color: 'gold',
        fontWeight: 'bold',
        fontSize: hp('2.5%'),
    },
    second: {
        color: 'silver',
        fontWeight: 'bold',
        fontSize: hp('2.5%'),
    },
    third: {
        color: '#CD7F32',
        fontWeight: 'bold',
        fontSize: hp('2.5%'),
    },
    sample: {
        color: 'black',
        fontSize: hp('2.5%'),
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    image: {
        height: hp('20%'),  // set height for the image
        resizeMode: 'contain', // other options: 'contain', 'stretch', 'repeat', 'center'
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
});

export default StatsModal;
