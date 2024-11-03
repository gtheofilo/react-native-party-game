import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

const getRandomLetter = () => {
  const letters = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω0123456789';
  return letters[Math.floor(Math.random() * letters.length)];
};

const RandomTextReveal = ({ text = "Abc", revealSpeed = 100, scrambleSpeed = 50, iterations = 10 }) => {
  const [revealedText, setRevealedText] = useState('');

  useEffect(() => {
    const textArray = text.split('');
    let currentText = new Array(textArray.length).fill(' ');
    let indices = Array.from(Array(textArray.length).keys());

    const revealLetter = (index) => {
      currentText[index] = textArray[index];
      setRevealedText(currentText.join(''));
    };

    const scrambleLetter = (index) => {
      currentText[index] = getRandomLetter();
      setRevealedText(currentText.join(''));
    };

    const revealWithScramble = (index) => {
      let scrambleCount = 0;
      const scrambleInterval = setInterval(() => {
        if (scrambleCount < iterations) {
          scrambleLetter(index);
          scrambleCount++;
        } else {
          clearInterval(scrambleInterval);
          revealLetter(index);
        }
      }, scrambleSpeed);
    };

    // Shuffle and reveal one by one with random timing
    const intervalId = setInterval(() => {
      if (indices.length === 0) {
        clearInterval(intervalId);
        return;
      }
      const randomIndex = Math.floor(Math.random() * indices.length);
      const revealIndex = indices[randomIndex];
      indices = indices.filter(i => i !== revealIndex);

      revealWithScramble(revealIndex);
    }, revealSpeed);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [text, revealSpeed, scrambleSpeed, iterations]);

  return (
    <Text style={styles.h1}>{revealedText}</Text>
  );
};

export default RandomTextReveal;

const styles = StyleSheet.create({
  h1: {
    color: '#e63946',
    fontSize: hp('4%'),
    textAlign: 'center',
    fontWeight: 'bold'

  }
});