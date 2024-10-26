// FullScreenModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

const FullScreenModal = ({ visible, onClose, playerName, action, currentRound, roundsCount }) => {
    return (
        <Modal
            visible={visible}
            transparent={false}
            animationIn="slideInLeft"

        >
            <View style={styles.banner}>
                <Text style={styles.h1}>Γύρος {currentRound} από {roundsCount}</Text>
            </View>

            <View style={styles.container}>

                <View style={styles.col}>

                    <Text style={styles.finished}>Βρήκες την σωστή κάρτα;</Text>
                    <View style={[{ flexDirection: 'row', columnGap: wp('3%') },]}>

                        <TouchableOpacity style={styles.yes} onPress={() => { onClose(1) }}>
                            <Text style={styles.closeButtonText}>ΝΑΙ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.no} onPress={() => { onClose(0) }}>
                            <Text style={styles.closeButtonText}>ΟΧΙ</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('100%'),
        height: hp('100%'),
    },
    finished: {
        fontWeight: 'bold',
        fontSize: hp('3%')
    },
    col: {
        alignItems: 'center',
        justifyItems: 'center',
        rowGap: hp('3%'),
        width: wp('100%'),

    },
    yes: {
        padding: hp('3%'),
        backgroundColor: 'green',
        borderRadius: hp('5%'),
    },
    no: {
        padding: hp('3%'),
        backgroundColor: 'red',
        borderRadius: hp('5%'),
    },
    closeButtonText: {
        color: '#fff',
        fontSize: hp('2%'),
    },
    banner: {
        backgroundColor: '#E63946',
        width: wp('100%'),
        alignItems: 'center',
        padding: hp('1.5%'),
    },
    h1: {
        fontSize: hp('2%'),
        fontWeight: 'bold',
        color: '#fdf0d5',
    },
});

export default FullScreenModal;
