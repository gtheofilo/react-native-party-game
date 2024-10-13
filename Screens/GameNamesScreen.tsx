import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    TextInput,
} from 'react-native';

import GameButton from '../Components/Button';

function GameNamesScreen({ route, navigation }): React.JSX.Element {
    const { playersCount, roundsCount, seconds } = route.params;
    const [players, setPlayers] = useState(Array(playersCount).fill(''));

    const handleChangeText = (text, index) => {
        const newPlayers = [...players];
        newPlayers[index] = text;
        setPlayers(newPlayers);
    };

    return (
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

            <Text>(Φήμες λένε ότι το καλύτερο username κερδίζει το παιχνίδι)</Text>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Game', {
                playerNames: players,
                roundsCount: roundsCount,
                seconds: seconds,
            })}>
                <Text style={styles.closeButtonText}>Ας ξεκινήσουμε!</Text>
            </TouchableOpacity>



        </ScrollView>
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
    inputContainer: {
        marginBottom: 15,
        width: '100%',
        rowGap: 4,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: '100%',
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

export default GameNamesScreen;