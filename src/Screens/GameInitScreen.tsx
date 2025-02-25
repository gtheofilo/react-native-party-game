import React, { useState, useMemo } from 'react';
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
import { BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';

function GameInitScreen({ navigation }) {
    const [settings, setSettings] = useState({ playersCount: 0, roundsCount: 0, seconds: 0 });
    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2209521706517983/4199716068'; // Replace with your actual Ad Unit ID for production

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
            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            />
            <View style={styles.topSection}>
                <Text style={styles.h1}>Ρυθμίσεις Παιχνιδιού</Text>

            </View>
            <View style={styles.midSection}>

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


            </View>
            <View style={styles.bottomSection}>
                <Pressable
                    style={({ pressed }) => [
                        styles.btn,
                        { borderBottomWidth: pressed ? hp('0%') : hp('1%') },
                    ]}
                    onPress={handleNavigate}
                >
                    <Text style={styles.btnText}>ΕΠΟΜΕΝΟ</Text>
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
    topSection: {
        flex: 1, // 1/5 of the total height
        justifyContent: 'center',
        alignItems: 'center',
    },
    midSection: {
        flex: 3, // 3/5 of the total height
        alignItems: 'center',
        rowGap: hp('5%'),
    },
    bottomSection: {
        flex: 1, // 1/5 of the total height
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: '#e63946',
        paddingVertical: hp('2%'),
        borderRadius: hp('1%'),
        width: wp('70%'),
        alignItems: 'center',
        marginBottom: hp('2%'),
        borderColor: '#94242D',
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
