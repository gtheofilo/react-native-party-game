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
} from 'react-native-responsive-screen'
import { useSound } from '../Components/SoundContext';

function GameNamesScreen({ route, navigation }) {
    const { playersCount, roundsCount, seconds } = route.params;
    const [players, setPlayers] = useState(Array(playersCount).fill(''));
    const { stopBg } = useSound()

    const handleChangeText = (text, index) => {
        const newPlayers = [...players];
        newPlayers[index] = text;
        setPlayers(newPlayers);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentWrapper}>
                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.h1}>Επιλέξτε username και ετοιμαστείτε για παιχνίδι!</Text>

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

                    <Pressable android_disableSound={true}
                        style={styles.btn}
                        onPress={() => {
                            stopBg()
                            navigation.navigate('Game', {
                                playerNames: players,
                                roundsCount: roundsCount,
                                seconds: seconds,
                            })
                        }}
                    >
                        <Text style={styles.btnText}>Ας ξεκινήσουμε!</Text>
                    </Pressable>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: hp('5%'),
        width: wp('95%'),
    },
    inputContainer: {
        rowGap: hp('1%'),
        alignItems: 'flex-start',
        width: '100%'

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
    input: {
        height: hp('5%'),
        borderColor: '#e63946',
        color: '#1d3557',
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
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default GameNamesScreen;
