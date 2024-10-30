import React, { useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { debounce } from 'lodash';

import BgAnimated from '../Components/BgAnimated';

function HomeScreen({ navigation }) {

    // Define debounced navigation functions only once
    const debouncedMoveToGameInit = debounce(() => {
        navigation.navigate('GameInit');
    }, 100);

    const debouncedMoveToGameRules = debounce(() => {
        navigation.navigate('GameRules');
    }, 100);

    // Clean up debounce on component unmount to avoid memory leaks
    useEffect(() => {
        return () => {
            debouncedMoveToGameInit.cancel();
            debouncedMoveToGameRules.cancel();
        };
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <BgAnimated />
            <View style={styles.content}>
                <Text style={styles.brandName}>Βρές την κάρτα!</Text>
                <Text style={styles.brandName}>Παιχνίδι Παρέας</Text>

                <Pressable android_disableSound={true} style={styles.btn} onPress={debouncedMoveToGameInit}>
                    <Text style={styles.btnText}>ΕΝΑΡΞΗ</Text>
                </Pressable>

                <Pressable android_disableSound={true} style={styles.btn} onPress={debouncedMoveToGameRules}>
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
        elevation: 5,
    },
    btnText: {
        color: '#fff',
        fontSize: hp('2.2%'),
        fontWeight: 'bold',
    },
});

export default React.memo(HomeScreen);
