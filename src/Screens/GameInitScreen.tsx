import React, { useState } from 'react';
import {
    SafeAreaView,
    Pressable,
    StyleSheet,
    Text,
    View,
    Alert
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserNinja, faClock, faCircle } from '@fortawesome/free-solid-svg-icons';
import HorizontalListOption from '../Components/HorizontalListOption';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import { useSound } from '../Components/SoundContext';

function GameInitScreen({ navigation }) {
    const [playersCount, setPlayersCount] = useState(0);
    const [roundsCount, setRoundsCount] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const { playSound } = useSound();

    const callbackPlayersCount = (c) => {
        playSound('click')
        setPlayersCount(c);
    };

    const callbackRoundsCount = (c) => {
        playSound('click')
        setRoundsCount(c);
    };

    const callbackSeconds = (c) => {
        playSound('click')
        setSeconds(c);
    };

    const moveToGameNames = () => {
        playSound('click')

        if (playersCount * roundsCount * seconds === 0) {
            Alert.alert(
                'Προσοχή!',
                'Επιλέξτε όλες τις ρυθμίσεις.',
                [{ text: 'OK' },]
            )
        } else {
            navigation.navigate('GameNames', {
                playersCount: playersCount,
                roundsCount: roundsCount,
                seconds: seconds,
            })
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.h1}>Ρυθμίσεις Παιχνιδιού</Text>

                <View style={styles.list}>
                    <View style={styles.row}>
                        <FontAwesomeIcon icon={faUserNinja} size={16} color="#E63946" />
                        <Text style={styles.h2}>Αριθμός Παιχτών</Text>
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

                <Pressable android_disableSound={true} style={styles.btn} onPress={moveToGameNames}>
                    <Text style={styles.btnText}>Επόμενο</Text>
                </Pressable>

            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: hp('5%')
    },
    h1: {
        fontWeight: 'bold',
        fontSize: hp('3%'),
        marginTop: hp('2%'),
        textAlign: 'center',
    },
    h2: {
        fontSize: hp('2%'),
        textAlign: 'center',
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
    btnText: {
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
