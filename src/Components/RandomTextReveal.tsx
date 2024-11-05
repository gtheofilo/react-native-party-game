import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const getRandomLetter = () => {
  const letters = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω';
  return letters[Math.floor(Math.random() * letters.length)];
};

const RandomTextReveal = ({ text = "Abc", revealSpeed = 100, scrambleSpeed = 50, iterations = 10 }) => {
  const [revealedText, setRevealedText] = useState('');

  useEffect(() => {
    const textArray = text.split('');
    let currentText = new Array(textArray.length).fill(' ');
    let indices = Array.from(Array(textArray.length).keys());
    let isComponentMounted = true;

    const revealLetter = (index) => {
      currentText[index] = textArray[index];
      setRevealedText(currentText.join(''));
    };

    const revealWithScramble = (index) => {
      let scrambleCount = 0;

      const scrambleLoop = () => {
        if (!isComponentMounted) return;

        if (scrambleCount < iterations) {
          if (scrambleCount % 1 === 0) {  // Update every third frame for smoother performance
            currentText[index] = getRandomLetter();
            setRevealedText(currentText.join(''));
          }
          scrambleCount++;
          setTimeout(scrambleLoop, scrambleSpeed);
        } else {
          revealLetter(index);
        }
      };

      scrambleLoop();
    };

    const revealLoop = () => {
      if (indices.length === 0 || !isComponentMounted) {
        return; // Stop if all letters are revealed or component is unmounted
      }

      const randomIndex = Math.floor(Math.random() * indices.length);
      const revealIndex = indices[randomIndex];
      indices = indices.filter(i => i !== revealIndex);

      revealWithScramble(revealIndex);
      setTimeout(revealLoop, revealSpeed); // Control reveal frequency
    };

    revealLoop();

    return () => {
      isComponentMounted = false; // Stop animation on component unmount
    };
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
