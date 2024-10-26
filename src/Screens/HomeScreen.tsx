import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    Pressable
} from 'react-native';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { useSound } from '../Components/SoundContext';
import BgAnimated from '../Components/BgAnimated';


type HomeScreenProps = PropsWithChildren<{
    navigation: any;
}>;

function HomeScreen({ navigation }: HomeScreenProps): React.JSX.Element {

    const { playSound } = useSound();

    const moveToGameInit = () => {
        playSound('click');
        navigation.navigate('GameInit');
    }

    const moveToGameRules = () => {
        playSound('click');
        navigation.navigate('GameRules')
    }

    return (
        <SafeAreaView style={styles.container}>
            <BgAnimated></BgAnimated>

            <View style={styles.content}>
                <Text style={styles.brandName}>Βρές την κάρτα!</Text>
                <Text style={styles.brandName}>Παιχνίδι Παρέας</Text>

                <Pressable android_disableSound={true} style={styles.btn} onPress={moveToGameInit}>
                    <Text style={styles.btnText}>ΕΝΑΡΞΗ</Text>
                </Pressable>

                <Pressable android_disableSound={true} style={styles.btn} onPress={moveToGameRules}>
                    <Text style={styles.btnText}>ΟΔΗΓΟΣ ΠΑΙΧΝΙΔΙΟΥ</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    brandName: {
        color: "#457B9D",
        fontSize: hp('4%'),
        fontFamily: 'Mynerve-Regular',
        marginBottom: hp('2%'),
    },
    btn: {
        backgroundColor: '#E63946',
        paddingVertical: hp('2%'),
        borderRadius: hp('2%'),
        width: wp('70%'),
        alignItems: 'center',
        marginBottom: hp('2%'),
        borderColor: '#fff',
        borderWidth: hp('0.5%'),
        // Elevation for Android (creates shadow-like effect)
        elevation: 5,
        // Gradient-like effect (optional, if you want to simulate lighting from top)
        backgroundImage: 'linear-gradient(145deg, #D62839, #E63946)',
    },
    btnText: {
        color: '#fff',
        fontSize: hp('2.2%'),
        fontWeight: 'bold',
    },

});

export default HomeScreen;
