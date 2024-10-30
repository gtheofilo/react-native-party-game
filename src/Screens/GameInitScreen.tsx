import React, { useState, useCallback, useMemo } from 'react';
import {
    SafeAreaView,
    Pressable,
    StyleSheet,
    Text,
    View,
    Alert,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserNinja, faClock, faCircle } from '@fortawesome/free-solid-svg-icons';
import HorizontalListOption from '../Components/HorizontalListOption';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

function GameInitScreen({ navigation }) {
    const [settings, setSettings] = useState({ playersCount: 0, roundsCount: 0, seconds: 0 });

    const handleChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleNavigate = () => {
        const { playersCount, roundsCount, seconds } = settings;

        if (!playersCount || !roundsCount || !seconds) {
            Alert.alert('Προσοχή!', 'Επιλέξτε όλες τις ρυθμίσεις.', [{ text: 'OK' }]);
        } else {
            navigation.navigate('GameNames', settings);
        }
    };

    const Icons = useMemo(() => ({
        players: <FontAwesomeIcon icon={faUserNinja} size={16} color="#E63946" />,
        rounds: <FontAwesomeIcon icon={faCircle} size={16} color="#E63946" />,
        time: <FontAwesomeIcon icon={faClock} size={16} color="#E63946" />
    }), []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.h1}>Ρυθμίσεις Παιχνιδιού</Text>

                <OptionList
                    label="Αριθμός Παιχτών"
                    icon={Icons.players}
                    options={[2, 3, 4, 5, 6, 7, 8, 9, 10]}
                    onChange={value => handleChange('playersCount', value)}
                />
                <OptionList
                    label="Αριθμός Γύρων"
                    icon={Icons.rounds}
                    options={[3, 5, 10, 15]}
                    onChange={value => handleChange('roundsCount', value)}
                />
                <OptionList
                    label="Αριθμός Δευτερολέπτων"
                    icon={Icons.time}
                    options={[30, 60, 90]}
                    onChange={value => handleChange('seconds', value)}
                />

                <Pressable style={styles.btn} onPress={handleNavigate}>
                    <Text style={styles.btnText}>Επόμενο</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const OptionList = ({ label, icon, options, onChange }) => (
    <View style={styles.list}>
        <View style={styles.row}>
            {icon}
            <Text style={styles.h2}>{label}</Text>
        </View>
        <HorizontalListOption options={options} callBack={onChange} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: hp('5%'),
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
        elevation: 5,
    },
    btnText: {
        color: '#fff',
        fontSize: hp('2%'),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: wp('3%'),
    },
});

export default GameInitScreen;
