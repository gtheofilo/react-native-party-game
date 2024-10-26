import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
} from 'react-native';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useSound } from '../Components/SoundContext';

function GameNamesScreen({ route, navigation }) {
    const { playersCount, roundsCount, seconds } = route.params;
    const [players, setPlayers] = useState(Array(playersCount).fill(''));
    const { stopBg } = useSound();

    const handleChangeText = (text, index) => {
        const newPlayers = [...players];
        newPlayers[index] = text;
        setPlayers(newPlayers);
    };

    return (
        <SafeAreaView style={styles.container}>
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
                        />
                    </View>
                ))}

                <Pressable 
                    android_disableSound={true}
                    style={styles.btn}
                    onPress={() => {
                        stopBg();
                        navigation.navigate('Game', {
                            playerNames: players,
                            roundsCount: roundsCount,
                            seconds: seconds,
                        });
                    }}
                >
                    <Text style={styles.btnText}>Ας ξεκινήσουμε!</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    content: {
        flexGrow: 1, 
        alignItems: 'center',
        width: wp('90%'), // Adjust width to 90% of the screen
    },
    inputContainer: {
        rowGap: hp('1%'),
        alignItems: 'flex-start',
        width: '100%', // Full width to prevent overflow
        marginBottom: hp('2%'), // Added margin to create space between inputs
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
        textAlign: 'left', // Align text to the left for better readability
        marginBottom: hp('0.5%'), // Space below the label
    },
    input: {
        height: hp('5%'),
        borderColor: '#e63946',
        color: '#1d3557',
        borderWidth: hp('0.3%'),
        paddingHorizontal: wp('2%'),
        borderRadius: hp('1%'),
        width: '100%', // Keep input full width within inputContainer
    },
    btn: {
        marginTop: 'auto',
        backgroundColor: '#E63946',
        paddingVertical: hp('2%'),
        borderRadius: hp('2%'),
        width: wp('70%'), // Keep button width the same
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
