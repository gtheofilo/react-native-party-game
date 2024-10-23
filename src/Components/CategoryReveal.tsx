// FullScreenModal.js
import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import RandomTextReveal from '../Components/RandomTextReveal';

const CategoryReveal = ({ visible, onTap, categoryName = 1, currentRound }) => {
    const [time, setTime] = useState(2)
    const [animationFinsihed, setAnimationFinished] = useState(false)
    
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setTime((prev) => {
    //             if (prev === 0) {
    //                 clearInterval(interval);
    //                 onTap()
    //                 return prev;  // Return the same value (0), so it doesn't go negative
    //             }
    //             return prev - 1;  // Decrease time by 1
    //         });
    //     }, 1000);

    //     // Cleanup function to clear the interval when the component unmounts or re-renders
    //     return () => clearInterval(interval);
    // }, []);  // Empty dependency array so it only runs once when the component mounts


    return (
        <Modal visible={visible}>
            <TouchableOpacity style={styles.container} >
                <Text style={styles.h1}>ΓΥΡΟΣ {currentRound}</Text>
                <RandomTextReveal
                    text={categoryName}   // The text you want to reveal
                    revealSpeed={200}     // Delay between starting to reveal next letter
                    scrambleSpeed={50}    // Speed of random letters switching
                    iterations={5}        // Number of random letter iterations before revealing
                />

                <Text style={styles.h2} onPress={onTap}>Συνέχεια</Text>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: hp('1%')
    },
    h1: {
        color: 'black',
        fontSize: hp('3%'),
        textAlign: 'center',
    },
    h2: {
        color: 'black',
        fontSize: hp('2%'),
        textAlign: 'center',
        marginTop: hp('15%')
    }
});

export default CategoryReveal;
