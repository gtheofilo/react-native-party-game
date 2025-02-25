// SoundContext.js
import React, { createContext, useContext, useEffect, useRef, } from 'react';
import { View, Button, AppState, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';

const SoundContext = createContext();
const sounds = {
    "countdown": require("../assets/sounds/countdown.mp3"),
    "beep": require('../assets/sounds/beep.mp3'),
    "correct": require('../assets/sounds/correct.mp3'),
    "wrong": require('../assets/sounds/wrong.mp3')
}

export const SoundProvider = ({ children }) => {
    const soundRef = useRef(null); // Create a ref for sound
    const bgRef = useRef(null);
    const appState = useRef(AppState.currentState); // Track app state

    const playSound = (soundFile) => {

        if (soundRef.current) {
            soundRef.current.stop(() => {
                soundRef.current.release();
                soundRef.current = null;

                soundRef.current = new Sound(sounds[soundFile], (error) => {
                    if (error) {
                        console.log('Failed to load the sound', error);
                        return;
                    }

                    soundRef.current.play((success) => {
                        if (!success) {
                            console.log('Playback failed');
                        }
                    });
                });
            });
        } else {
            soundRef.current = new Sound(sounds[soundFile], (error) => {
                if (error) {
                    console.log('Failed to load the sound', error);
                    return;
                }

                soundRef.current.play((success) => {
                    if (!success) {
                        console.log('Playback failed');
                    }
                });
            });
        }
    };

    const stopSound = () => {
        if (soundRef.current) {
            soundRef.current.stop(() => {
                soundRef.current.release(); // Release resources
                soundRef.current = null; // Reset the ref
            });
        }
    };

    
    useEffect(() => {
        return () => {
            stopSound();
        };
    }, []);

    return (
        <SoundContext.Provider value={{ playSound, stopSound}}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => {
    return useContext(SoundContext);
};
