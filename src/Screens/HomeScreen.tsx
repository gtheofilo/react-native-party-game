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
    
    const { playSound, playBg } = useSound();
    // playBg("background")

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentWrapper}>
                {/* Background image */}
                <BgAnimated></BgAnimated>

                {/* Content over the background */}
                <View style={styles.content}>
                    <Text style={styles.brandName}>Βρές την κάρτα!</Text>
                    <Text style={styles.brandName}>Παιχνίδι Παρέας</Text>

                    <Pressable android_disableSound={true}
                        style={styles.btn}
                        onPress={() => {
                            // Play the sound when the button is pressed
                            playSound('click');

                            // Navigate to the GameInit screen
                            navigation.navigate('GameInit');
                        }}
                    >
                        <Text style={styles.closeButtonText}>ΕΝΑΡΞΗ</Text>
                    </Pressable>

                    <Pressable android_disableSound={true} style={styles.btn} onPress={() => {
                        playSound('click');

                        navigation.navigate('GameRules')
                    }}>
                        <Text style={styles.closeButtonText}>ΟΔΗΓΟΣ ΠΑΙΧΝΙΔΙΟΥ</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, // Ensure the content is above the background
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
        // Shadow properties for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: hp('0.8%') },
        shadowOpacity: 0.3,
        shadowRadius: hp('1%'),
        // Elevation for Android (creates shadow-like effect)
        elevation: 5,
        // Gradient-like effect (optional, if you want to simulate lighting from top)
        backgroundImage: 'linear-gradient(145deg, #D62839, #E63946)',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: hp('2.2%'),
        fontWeight: 'bold',
    },

});

export default HomeScreen;
