// SoundContext.js
import React, { createContext, useContext, useEffect, useRef } from 'react';
import Sound from 'react-native-sound';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
    const soundRef = useRef(null);

    const playSound = (soundFile) => {
        console.log('PLAAAAAAY')
        if (soundRef.current) {
            soundRef.current.stop(() => {
                soundRef.current.release();
            });
        }

        soundRef.current = new Sound(require('../assets/countdown.mp3'), Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Failed to load the sound', error);
                return;
            }
            soundRef.current.play();
        });
    };

    const stopSound = (fadeDuration = 1000) => {
        if (!soundRef.current) return;

        let currentVolume = 1.0; // Start with full volume (1.0)
        const fadeSteps = 20; // Number of steps in the fade
        const fadeInterval = fadeDuration / fadeSteps; // Time between each step

        // Gradually reduce the volume
        const fadeOut = () => {
            currentVolume -= 1 / fadeSteps; // Reduce the volume in equal steps

            if (currentVolume <= 0) {
                soundRef.current.setVolume(0);
                soundRef.current.stop(() => {
                    soundRef.current.release();
                });
            } else {
                soundRef.current.setVolume(currentVolume); // Set the reduced volume
                setTimeout(fadeOut, fadeInterval); // Call the fadeOut function again after the interval
            }
        };

        fadeOut(); // Start the fade-out process
    };

    useEffect(() => {
        return () => {
            stopSound();
        };
    }, []);

    return (
        <SoundContext.Provider value={{ playSound, stopSound }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => {
    return useContext(SoundContext);
};
