import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from 'react-native';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

function GameNamesScreen({ route, navigation }) {
    const { playersCount, roundsCount, seconds } = route.params;
    const [players, setPlayers] = useState(Array(playersCount).fill(''));

    const handleChangeText = (text, index) => {
        const newPlayers = [...players];
        newPlayers[index] = text;
        setPlayers(newPlayers);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.h1}>Λάβετε username και ετοιμαστείτε για παιχνίδι!</Text>

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

                <Text style={styles.tipText}>(Φήμες λένε ότι το καλύτερο username κερδίζει το παιχνίδι)</Text>

                <TouchableOpacity 
                    style={styles.btn} 
                    onPress={() => navigation.navigate('Game', {
                        playerNames: players,
                        roundsCount: roundsCount,
                        seconds: seconds,
                    })}
                >
                    <Text style={styles.closeButtonText}>Ας ξεκινήσουμε!</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        height: hp('100%'),
        width: wp('100%')
    },
    container: {
        paddingHorizontal: wp('2.3%'),
        paddingVertical: hp('2%'),
        alignItems: 'center',
        height: hp('100%'),
        width: wp('100%')
    },
    h1: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 20,
        textAlign: 'center',
    },
    h2: {
        fontSize: hp('2%'),
    },
    inputContainer: {
        marginBottom: hp('3%'),
        rowGap: hp('1%'),
        width: '100%',
    },
    input: {
        height: hp('5%'),
        borderColor: '#457b9d',
        borderWidth: hp('0.3%'),
        paddingHorizontal: wp('2%'),
        borderRadius: hp('1%'),
        width: '100%',
    },
    tipText: {
        marginBottom: 20,
        fontStyle: 'italic',
        textAlign: 'center',
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
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default GameNamesScreen;
