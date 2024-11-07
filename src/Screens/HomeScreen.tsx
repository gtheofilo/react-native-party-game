import React, { useEffect, useRef } from 'react';
import { SafeAreaView, Text, StyleSheet, View, Pressable, Platform } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { debounce } from 'lodash';
import { GAMBannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import BgAnimated from '../Components/BgAnimated';


function HomeScreen({ navigation }) {
    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2209521706517983/4199716068'; // Replace with your actual Ad Unit ID for production

    const debouncedMoveToGameInit = debounce(() => {
        navigation.navigate('GameInit');
    }, 100);

    const debouncedMoveToGameRules = debounce(() => {
        navigation.navigate('GameRules');
    }, 100);

    const handleAdFailedToLoad = (error) => {
        console.error('Banner ad failed to load:', error);
    };

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

            {/* <GAMBannerAd
                unitId={adUnitId}
                sizes={[BannerAdSize.FULL_BANNER]}

            /> */}



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
    ad: {
        width: '10%',
        backgroundColor: 'red',

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
