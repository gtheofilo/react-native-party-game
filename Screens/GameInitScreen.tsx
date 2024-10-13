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
import { Alert } from '../node_modules/react-native/types/index';

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
                    <FontAwesomeIcon icon={faUserNinja} size={16} color="#C1121F" />
                    <Text style={styles.h2}>Αριθμός Παικτών</Text>
                </View>

                <HorizontalListOption options={[2, 3, 4, 5, 6, 7, 8, 9, 10]} callBack={callbackPlayersCount} />
            </View>

            <View style={styles.list}>
                <View style={styles.row}>
                    <FontAwesomeIcon icon={faCircle} size={16} color="#C1121F" />
                    <Text style={styles.h2}>Αριθμός Γύρων</Text></View>
                <HorizontalListOption options={[3, 5, 10, 15]} callBack={callbackRoundsCount} />
            </View>

            <View style={styles.list}>
                <View style={styles.row}>

                    <FontAwesomeIcon icon={faClock} size={16} color="#C1121F" />

                    <Text style={styles.h2}>Αριθμός Δευτερολέπτων</Text></View>
                <HorizontalListOption options={[30, 60, 90]} callBack={callbackSeconds} />
            </View>

            <View style={styles.list}>
                <View style={styles.row}>

                    <FontAwesomeIcon icon={faList} size={16} color="#C1121F" />

                    <Text style={styles.h2}>Κατηγορίες</Text></View>
                <HorizontalListOption options={[30, 60, 90]} callBack={callbackSeconds} />
            </View>

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
        rowGap: 24,
        paddingHorizontal: 8,
        height: '100%',
        width: '100%',
        flex: 1,
        alignItems: 'center',

    },
    h1: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 16,
        textAlign: 'center', // Ensure title is centered
    },
    h2: {
        fontSize: 16,
    },
    list: {
        paddingVertical: 0,
        paddingHorizontal: 0,
        alignItems: 'center',
        rowGap: 4,
    },
    btn: {
        backgroundColor: '#C1121F',
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 'auto',
        marginBottom: 16,
        alignItems: 'center'
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 8,
    }
});

export default GameInitScreen;
