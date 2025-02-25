import React, { useEffect, useRef } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    Pressable,
    Animated,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { debounce } from 'lodash';
import LavaLampBackground from "../Components/LavaLamp";

function HomeScreen({ navigation }) {
    // Create 4 animated values
    const fadeAnim = [
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
    ];

    // Debounced navigation functions to prevent rapid re-triggering
    const debouncedMoveToGameInit = debounce(() => {
        navigation.navigate('GameInit');
    }, 100);

    const debouncedMoveToGameRules = debounce(() => {
        navigation.navigate('GameRules');
    }, 100);

    // Start sequential animations and clean up debounce functions on unmount
    useEffect(() => {
        const animations = fadeAnim.map((anim, index) =>
            Animated.timing(anim, {
                toValue: 1,
                duration: 1000,
                delay: index * 500, // stagger animations with 500ms delay each
                useNativeDriver: true,
            })
        );
        Animated.stagger(1000, animations).start();

        return () => {
            debouncedMoveToGameInit.cancel();
            debouncedMoveToGameRules.cancel();
        };
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Top Section: occupies 1/5 of the screen */}
            <View style={styles.topSection}>
            </View>

            {/* Middle Section: occupies 3/5 of the screen */}
            <View style={styles.midSection}>
                <Text style={styles.brandName}>Βρές την κάρτα!</Text>
                <Text style={styles.brandName}>Παιχνίδι Παρέας</Text>
                <Pressable
                    android_disableSound={true}
                    onPress={debouncedMoveToGameInit}
                    style={({ pressed }) => [
                        styles.btn,
                        { borderBottomWidth: pressed ? hp('0%') : hp('1%') },
                    ]}
                >
                    <Text style={styles.btnText}>ΕΝΑΡΞΗ</Text>
                </Pressable>

                <Pressable
                    android_disableSound={true}
                    onPress={debouncedMoveToGameRules}
                    style={({ pressed }) => [
                        styles.btn,
                        { borderBottomWidth: pressed ? hp('0%') : hp('1%') },
                    ]}
                >
                    <Text style={styles.btnText}>ΟΔΗΓΟΣ ΠΑΙΧΝΙΔΙΟΥ</Text>
                </Pressable>
            </View>

            {/* Bottom Section: occupies 1/5 of the screen */}
            <View style={styles.bottomSection}>
                <Text style={styles.bottomRightItem}>💌</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#457b9d",
    },
    topSection: {
        flex: 1, // 1/5 of the total height
        justifyContent: 'center',
        alignItems: 'center',
    },
    midSection: {
        flex: 3, // 3/5 of the total height
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSection: {
        flex: 1, // 1/5 of the total height
        justifyContent: 'center',
        alignItems: 'center',
    },
    brandName: {
        color: "white",
        fontSize: hp('4%'),
        fontFamily: 'Mynerve-Regular',
        marginBottom: hp('2%'),
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
        fontSize: hp('2.2%'),
        fontWeight: 'bold',
    },
    bottomRightItem: {
        fontSize: hp('3%'),
    },
});

export default React.memo(HomeScreen);
