import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    FlatList
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserNinja, faClock, faList, faCircle } from '@fortawesome/free-solid-svg-icons';
import { Picker } from '@react-native-picker/picker'; // Import Picker from the new package

import GameButton from '../Components/Button';
import HorizontalListOption from '../Components/HorizontalListOption';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

function GameInitScreen({ navigation }) {
    const [playersCount, setPlayersCount] = useState(0);
    const [roundsCount, setRoundsCount] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const callbackPlayersCount = (c) => {
        setPlayersCount(c);
    };

    const callbackRoundsCount = (c) => {
        setRoundsCount(c);
    };

    const callbackSeconds = (c) => {
        setSeconds(c);
    };

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.h1}>Ρυθμίσεις Παιχνιδιού</Text>

            <View style={styles.list}>
                <View style={styles.row}>
                    <FontAwesomeIcon icon={faUserNinja} size={16} color="#E63946" />
                    <Text style={styles.h2}>Αριθμός Παικτών</Text>
                </View>

                <HorizontalListOption options={[2, 3, 4, 5, 6, 7, 8, 9, 10]} callBack={callbackPlayersCount} />
            </View>

            <View style={styles.list}>
                <View style={styles.row}>
                    <FontAwesomeIcon icon={faCircle} size={16} color="#E63946" />
                    <Text style={styles.h2}>Αριθμός Γύρων</Text></View>
                <HorizontalListOption options={[1, 3, 5, 10, 15]} callBack={callbackRoundsCount} />
            </View>

            <View style={styles.list}>
                <View style={styles.row}>

                    <FontAwesomeIcon icon={faClock} size={16} color="#E63946" />

                    <Text style={styles.h2}>Αριθμός Δευτερολέπτων</Text></View>
                <HorizontalListOption options={[30, 60, 90]} callBack={callbackSeconds} />
            </View>

            {/* <View style={styles.list}>
                <View style={styles.row}>

                    <FontAwesomeIcon icon={faList} size={16} color="#C1121F" />

                    <Text style={styles.h2}>Κατηγορίες</Text></View>
                <HorizontalListOption options={[30, 60, 90]} callBack={callbackSeconds} />
            </View> */}

            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('GameNames', {
                playersCount: playersCount,
                roundsCount: roundsCount,
                seconds: seconds,
            })}>
                <Text style={styles.closeButtonText}>Επόμενο</Text>
            </TouchableOpacity>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        rowGap: hp('5%'),
        height: hp('100%'),
        width: wp('100%'),
        flex: 1,
        alignItems: 'center',
    },
    h1: {
        fontWeight: 'bold',
        fontSize: hp('3%'),
        marginTop: hp('2%'),
        textAlign: 'center', // Ensure title is centered
    },
    h2: {
        fontSize: hp('2%'),
    },
    list: {
        alignItems: 'center',
        rowGap: hp('1%'),
    },
    btn: {
        marginTop: 'auto',
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
        fontSize: hp('2%'),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: wp('3%'),
    }
});

export default GameInitScreen;
