import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    Alert
} from 'react-native';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';

function GameNamesScreen({ route, navigation }) {
    const { playersCount, roundsCount, seconds } = route.params;
    const [players, setPlayers] = useState(Array(playersCount).fill(''));
    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2209521706517983/4199716068'; // Replace with actual Ad Unit ID in production

    const handleChangeText = (text, index) => {
        const newPlayers = [...players];
        newPlayers[index] = 
            ['Fistiki', 'Fystiki', 'Φυστίκι', 'Φυστικι'].includes(text) ? '🟢🥜' : text;
        setPlayers(newPlayers);
    };

    const moveToGame = () => {
        if (!players.includes('')) {
            navigation.navigate('Game', {
                playerNames: players,
                roundsCount,
                seconds,
            });
        } else {
            Alert.alert(
                'Προσοχή!',
                'Επιλέξτε όλοι username.',
                [{ text: 'Ok' }]
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <BannerAd unitId={adUnitId} size={BannerAdSize.FULL_BANNER} />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.h1}>Επιλέξτε Username</Text>
                {players.map((player, index) => (
                    <View key={index} style={styles.inputContainer}>
                        <Text style={styles.h2}>Παίχτης {index + 1}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={`Γράψε το username του Παίχτη ${index + 1}`}
                            value={player}
                            onChangeText={(text) => handleChangeText(text, index)}
                            maxLength={10}
                        />
                    </View>
                ))}
                <Pressable style={styles.btn} onPress={moveToGame}>
                    <Text style={styles.btnText}>Ας ξεκινήσουμε!</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        alignItems: 'center',
        width: wp('100%'), 
        flexGrow: 1,
    },
    inputContainer: {
        gap: hp('1%'),
        alignItems: 'flex-start',
        width: wp('95%'), 
        marginBottom: hp('2%'),
    },
    h1: {
        fontWeight: 'bold',
        fontSize: hp('3%'),
        marginTop: hp('2%'),
        marginBottom: hp('5%'),
        textAlign: 'center',
    },
    h2: {
        fontSize: hp('2%'),
        textAlign: 'left',
        marginBottom: hp('0.5%'),
    },
    input: {
        height: hp('6%'),
        borderColor: '#e63946',
        color: '#1d3557',
        borderWidth: hp('0.3%'),
        paddingHorizontal: wp('2%'),
        borderRadius: hp('1%'),
        width: '100%',
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
        elevation: 5,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default GameNamesScreen;
