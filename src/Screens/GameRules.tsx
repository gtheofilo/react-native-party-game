import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import BgAnimated from '../Components/BgAnimated';


type GameRulesProps = PropsWithChildren<{
    navigation: any;
}>;

function GameRules({ navigation }: GameRulesProps): React.JSX.Element {

    const moveToHome = () => {
        navigation.navigate('Home')
    }

    return (
        <SafeAreaView style={styles.container}>
            <BgAnimated></BgAnimated>
            <View style={styles.content}>
                <Text style={styles.textHeader}>Κανόνες Παιχνιδιού</Text>

                <Text style={styles.text}>
                    Αφού επιλέξετε τις ρυθμίσεις του παιχνιδιού (αριθμός παικτών, γύρων και διάρκεια της κάθε δοκιμασίας), το παιχνίδι ξεκινάει!
                </Text>

                <Text style={styles.text}>
                    Σε κάθε γύρο, παίζεται μία συγκεκριμένη κατηγορία ερωτήσεων. Οι παίκτες παίζουν συνεργατικά, με τον έναν να περιγράφει την κάρτα και τον άλλο να προσπαθεί να τη βρει.
                </Text>

                <Text style={styles.text}>
                    Υπάρχουν τρεις τρόποι για την περιγραφή της κάρτας:
                </Text>

                <Text style={styles.text}>
                    1. Με παντομίμα, όπου ο παίκτης προσπαθεί να μιμηθεί το περιεχόμενο της κάρτας με κινήσεις.
                </Text>
                <Text style={styles.text}>
                    2. Με ήχους, όπου ο παίκτης δημιουργεί ήχους σχετικούς με την κάρτα.
                </Text>
                <Text style={styles.text}>
                    3. Με τις απαντήσεις "Ναι", "Όχι", "Περίπου", όπου ο παίκτης που ψάχνει την κάρτα κάνει ερωτήσεις και ο άλλος απαντάει μόνο με αυτές τις τρεις λέξεις.
                </Text>

                <Text style={styles.text}>
                    Κάθε σωστή απάντηση δίνει και στους δύο παίκτες από έναν πόντο, ως ένδειξη της επιτυχούς συνεργασίας τους.
                </Text>

                <TouchableOpacity style={styles.btn} onPress={moveToHome}>
                    <Text style={styles.closeButtonText}>ΠΙΣΩ...</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    textHeader: {
        fontSize: hp('3.5%'),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        color: 'black',
        fontSize: hp('2%'),
        width: wp('90%'),
        textAlign: 'justify',
    },
    container: {
        flex: 1,
    },
    content: {
        padding: hp('1%'),
        flex: 1,
        rowGap: hp('3%'),
        width: wp('100%'),
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: '#E63946',
        paddingVertical: hp('2%'),
        borderRadius: hp('2%'),
        width: wp('70%'),
        alignItems: 'center',
        marginTop: hp('5%'),
        borderColor: '#fff',
        borderWidth: hp('0.5%'),
        elevation: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: hp('2.2%'),
        fontWeight: 'bold',
    },
});

export default GameRules;
