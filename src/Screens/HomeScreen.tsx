import React, { useEffect, useRef } from 'react';
import { SafeAreaView, Text, StyleSheet, View, Pressable, Platform } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { debounce } from 'lodash';
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';

import BgAnimated from '../Components/BgAnimated';

const adUnitId = "ca-app-pub-2209521706517983/4199716068";

function HomeScreen({ navigation }) {
    const bannerRef = useRef<BannerAd>(null);

    // Define debounced navigation functions only once
    const debouncedMoveToGameInit = debounce(() => {
        navigation.navigate('GameInit');
    }, 100);

    const debouncedMoveToGameRules = debounce(() => {
        navigation.navigate('GameRules');
    }, 100);

    const handleAdFailedToLoad = (error) => {
        console.error('Banner ad failed to load:', error);
        if (error.code === 'NO_FILL') {
            // Retry loading the ad after a delay
            setTimeout(() => {
                bannerRef.current?.load(); // Assuming you have a ref to reload
            }, 3000); // Retry after 3 seconds
        }
    };
    

    // Clean up debounce on component unmount to avoid memory leaks
    useEffect(() => {
        return () => {
            debouncedMoveToGameInit.cancel();
            debouncedMoveToGameRules.cancel();
        };
    }, []);

    useForeground(() => {
        Platform.OS === 'ios' && bannerRef.current?.load();
    })

    return (
        <SafeAreaView style={styles.container}>
            <BgAnimated />
            <BannerAd ref={bannerRef} unitId={TestIds.BANNER} size={BannerAdSize.BANNER}
                onAdFailedToLoad={handleAdFailedToLoad} // Attach error handler
            />

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
