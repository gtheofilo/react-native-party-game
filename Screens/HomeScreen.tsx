import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    TouchableOpacity,
    Dimensions
    
} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
   } from 'react-native-responsive-screen'
   






function HomeScreen({ navigation }): React.JSX.Element {
    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/logo.png')} // Path to the image
                style={styles.logo} // Custom style for logo size
            />

            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('GameInit')}>
                <Text style={styles.closeButtonText}>Φύγαμε για παιχνίδι!</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('GameInit')}>
                <Text style={styles.closeButtonText}>Πσστ, έχουμε και κανόνες</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: hp('1%'), 
        borderColor: '#669BBC',
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: hp('5%'),
    },
    logo: {
        width: wp('90%'),  // Adjust according to logo size
        height: hp('15%'), // Adjust according to logo size
        resizeMode: 'contain', // Keep aspect ratio
    },
    btn: {
        backgroundColor: '#669BBC',
        paddingVertical: hp('1.5%'),
        borderRadius: hp('1%'),
        width: wp('80%'),
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: hp('2.2%')
    },
});

export default HomeScreen;