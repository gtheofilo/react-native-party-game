import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, Pressable, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';
import { debounce } from 'lodash';

function GameRules({ navigation }) {
    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2209521706517983/4199716068'; // Replace with your actual Ad Unit ID for production

    // Define the debounced function once
    const debouncedMoveToHome = debounce(() => {
        navigation.navigate('Home');
    }, 100);

    // Cancel debounce on component unmount
    useEffect(() => {
        return () => {
            debouncedMoveToHome.cancel();
        };
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <BannerAd
                unitId={adUnitId} // Set Ad Unit ID
                size={BannerAdSize.INLINE_ADAPTIVE_BANNER}

            />
            <View style={styles.content}>
                <Text style={styles.textHeader}>Κανόνες Παιχνιδιού</Text>
                <Text style={styles.text}>
                    Αφού επιλέξετε τις ρυθμίσεις του παιχνιδιού (αριθμός παικτών, γύρων και διάρκεια της κάθε δοκιμασίας), το παιχνίδι ξεκινάει!
                </Text>
                <Text style={styles.text}>
                    Σε κάθε γύρο, παίζεται μία συγκεκριμένη κατηγορία ερωτήσεων. Οι παίκτες παίζουν συνεργατικά, με τον έναν να περιγράφει την κάρτα και τον άλλο να προσπαθεί να τη βρει.
                </Text>
                <Text style={styles.text}>Υπάρχουν τρεις τρόποι για την περιγραφή της κάρτας:</Text>
                <Text style={styles.text}>1. Με παντομίμα, όπου ο παίκτης προσπαθεί να μιμηθεί το περιεχόμενο της κάρτας με κινήσεις.</Text>
                <Text style={styles.text}>2. Με ήχους, όπου ο παίκτης δημιουργεί ήχους σχετικούς με την κάρτα.</Text>
                <Text style={styles.text}>3. Με τις απαντήσεις "Ναι", "Όχι", "Περίπου", όπου ο παίκτης που ψάχνει την κάρτα κάνει ερωτήσεις και ο βοηθός απαντάει μόνο με τις τρεις λέξεις.</Text>
                <Text style={styles.text}>
                    Η εύρεση της κάρτας επιβραβεύει τον παίχτη που ψάχνει με 1.5 πόντο και αυτόν που βοηθάει με 0.5 πόντο,
                    ως ένδειξη της καλής τους συνεργασίας.
                </Text>
                <Pressable
                    android_disableSound={true}
                    accessible={true}
                    accessibilityLabel="Back Button"
                    style={styles.btn}
                    onPress={debouncedMoveToHome}
                >
                    <Text style={styles.closeButtonText}>ΠΙΣΩ...</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

// Memoized height and width values
const headerFontSize = hp('3.5%');
const textFontSize = hp('2%');
const buttonPadding = hp('2%');
const buttonBorderRadius = hp('2%');
const buttonBorderWidth = hp('0.5%');

const styles = StyleSheet.create({
    textHeader: {
        fontSize: headerFontSize,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        color: 'black',
        fontSize: textFontSize,
        width: wp('90%'),
        textAlign: 'justify',
    },
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        width: wp('100%'),
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: hp('2%'),
    },
    btn: {
        backgroundColor: '#E63946',
        paddingVertical: buttonPadding,
        borderRadius: buttonBorderRadius,
        width: wp('70%'),
        alignItems: 'center',
        marginTop: hp('5%'),
        borderColor: '#fff',
        borderWidth: buttonBorderWidth,
        elevation: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: hp('2.2%'),
        fontWeight: 'bold',
    },
});

export default React.memo(GameRules);
