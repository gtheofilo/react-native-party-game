// FullScreenModal.js
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

const StatsModal = ({ visible, gameMatrix }) => {
    const [sortedEntries, setSortedEntries] = useState([]);

    // Convert the gameMatrix to an array of entries and sort it in descending order based on scores
    useEffect(() => {
        const entries = Object.entries(gameMatrix).sort((a, b) => b[1] - a[1]);
        setSortedEntries(entries);
    }, [gameMatrix]); // Re-run effect when gameMatrix changes

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
                <View>

                    <TouchableOpacity style={styles.no}>
                        <Text style={styles.closeButtonText}>ΟΧΙ</Text>
                    </TouchableOpacity>

                </View>
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
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        height: hp('100%'),
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    leaderboard: {
        backgroundColor: 'gray',
        borderTopLeftRadius: hp('5%'),
        borderTopRightRadius: hp('5%'),
        width: wp('100%'),
        paddingTop: hp('3%'),
        paddingBottom: hp('30%'),
        alignItems: 'center',
        rowGap: hp('1.5%')
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
});

export default StatsModal;
