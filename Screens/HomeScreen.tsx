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

import GameButton from '../Components/Button';

const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;


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
        borderWidth: moderateScale(8), // Thickness of the border
        borderColor: '#669BBC',
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: moderateScale(12),
    },
    logo: {
        width: moderateScale(350),  // Adjust according to logo size
        height: moderateScale(150), // Adjust according to logo size
        resizeMode: 'contain', // Keep aspect ratio
    },
    btn: {
        backgroundColor: '#669BBC',
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: moderateScale(16),
    },
});

export default HomeScreen;