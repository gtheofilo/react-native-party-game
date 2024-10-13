// FullScreenModal.js
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const StatsModal = ({ visible, gameMatrix }) => {
    let sortedEntries = []
    // Convert the gameMatrix to an array of entries and sort it in descending order based on scores
    useEffect(() => {sortedEntries = Object.entries(gameMatrix).sort((a, b) => b[1] - a[1]);
    }, [visible])

    return (
        <Modal
            visible={visible}
            animationType="slide"
        >
            <View style={styles.container}>
         

                <View style={styles.leaderboard}>
                    <Text style={styles.h1}>Αποτελέσματα</Text>
                    <View style={styles.row}>
                        <Text>Παίχτης</Text>
                        <Text>Score</Text>
                    </View>
                    {sortedEntries.map(([player, score], index) => (
                        <View key={player} style={styles.row}>
                            <Text style={[
                                index === 0 && styles.top,
                                index === 1 && styles.second,
                                index === 2 && styles.third
                            ]}>
                                {index + 1}. {player}
                            </Text>
                            <Text style={[
                                index === 0 && styles.top,
                                index === 1 && styles.second,
                                index === 2 && styles.third
                            ]}>
                                {score}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'black',
    },
    leaderboard: {
        backgroundColor: 'white',
        borderRadius: 32,
        width: '100%',
        paddingTop: 16,
        paddingBottom: 256,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        gap: 14, // Changed from colGap to gap
        width: '70%',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    h1: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    no: {
        backgroundColor: 'green',
    },
    top: {
        color: 'gold',
        fontWeight: 'bold',
        fontSize: 20,
    },
    second: {
        color: 'silver',
        fontWeight: 'bold',
        fontSize: 20,
    },
    third: {
        color: '#CD7F32',
        fontWeight: 'bold',
        fontSize: 20,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default StatsModal;
