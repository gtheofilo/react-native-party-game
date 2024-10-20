// SoundContext.js
import React, { createContext, useContext, useEffect, useRef, } from 'react';
import { View, Button, AppState, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';

const SoundContext = createContext();
const sounds = {
    "background": require("../assets/sounds/overwerk.mp3"),
    "click": require("../assets/sounds/switch1.mp3")
}
export const SoundProvider = ({ children }) => {
    const soundRef = useRef(null); // Create a ref for sound
    const bgRef = useRef(null);
    const appState = useRef(AppState.currentState); // Track app state

    const playBg = (soundFile) => {
        if (bgRef.current) {
            console.log('Already playing')
        } else {
            console.log('RELOAD playing')

            bgRef.current = new Sound(sounds[soundFile], (error) => {
                if (error) {
                    console.log('Failed to load the sound', error);
                    return;
                }

                bgRef.current.play((success) => {
                    if (!success) {
                        console.log('Playback failed');
                    }
                });
            });
        }
    }

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
            // Create and play the new sound directly if nothing is playing
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
                console.log('Sound stopped');
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
        <SoundContext.Provider value={{ playSound, stopSound, playBg }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => {
    return useContext(SoundContext);
};
