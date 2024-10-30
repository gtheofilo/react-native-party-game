import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const letters = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω0123456789';
const getRandomLetter = () => letters[Math.floor(Math.random() * letters.length)];

const RandomTextReveal = ({ text = "Abc", revealSpeed = 100, scrambleSpeed = 50, iterations = 10 }) => {
  const [revealedText, setRevealedText] = useState('');

  useEffect(() => {
    const textArray = text.split('');
    const currentText = Array(textArray.length).fill(' ');
    let remainingIndices = [...Array(textArray.length).keys()];

    const revealWithScramble = (index) => {
      let scrambleCount = 0;
      const scrambleInterval = setInterval(() => {
        currentText[index] = scrambleCount < iterations ? getRandomLetter() : textArray[index];
        setRevealedText(currentText.join(''));
        if (scrambleCount++ >= iterations) clearInterval(scrambleInterval);
      }, scrambleSpeed);
    };

    const intervalId = setInterval(() => {
      if (remainingIndices.length === 0) {
        clearInterval(intervalId);
        return;
      }
      const randomIndex = Math.floor(Math.random() * remainingIndices.length);
      const [index] = remainingIndices.splice(randomIndex, 1);
      revealWithScramble(index);
    }, revealSpeed);

    return () => clearInterval(intervalId);
  }, [text, revealSpeed, scrambleSpeed, iterations]);

  return <Text style={styles.h1}>{revealedText}</Text>;
};

const styles = StyleSheet.create({
  h1: {
    color: '#e63946',
    fontSize: hp('4%'),
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default RandomTextReveal;
