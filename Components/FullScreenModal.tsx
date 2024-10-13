// FullScreenModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FullScreenModal = ({ visible, onClose, playerName, action }) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={false}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Player: {playerName}</Text>

                <Text>Ο χρόνος σου τελείωσε. Βρήκες την σωστή απάντηση;</Text>
                <View style={[{ flexDirection: 'row', columnGap: 8 },]}>

                    <TouchableOpacity style={styles.yes} onPress={() => {onClose(1)}}>
                        <Text style={styles.closeButtonText}>ΝΑΙ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.no} onPress={() => {onClose(0)}}>
                        <Text style={styles.closeButtonText}>ΟΧΙ</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    content: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    yes: {
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 5,
    },
    no: {
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default FullScreenModal;
