// SoundContext.js
import React, { createContext, useContext, useEffect, useRef, } from 'react';
import { View, Button, AppState, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';

const SoundContext = createContext();
const sounds = {
    "background": require("../assets/sounds/overwerk.mp3"),
    "click": require("../assets/sounds/switch1.mp3"),
    "countdown": require("../assets/sounds/countdown.mp3"),
    "beep": require('../assets/sounds/beep.mp3'),
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

    const stopBg = () => {
        if (bgRef.current) {
            const fadeDuration = 1000;  // Duration of fade-out in milliseconds
            const fadeSteps = 10;       // Number of steps to fade out
            const fadeInterval = fadeDuration / fadeSteps;
            let currentVolume = 1;      // Assuming the sound starts at full volume

            const fadeOut = setInterval(() => {
                currentVolume -= 1 / fadeSteps; // Decrease the volume in steps
                if (currentVolume <= 0) {
                    clearInterval(fadeOut);  // Clear the interval when volume is 0
                    bgRef.current.setVolume(0);  // Ensure volume is 0
                    bgRef.current.stop(() => {
                        console.log('Sound stopped');
                        bgRef.current.release(); // Release resources
                        bgRef.current = null;    // Reset the ref
                    });
                } else {
                    bgRef.current.setVolume(currentVolume);  // Set the reduced volume
                }
            }, fadeInterval);
        }
    };


    useEffect(() => {
        return () => {
            stopSound();
        };
    }, []);

    return (
        <SoundContext.Provider value={{ playSound, stopSound, playBg, stopBg }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => {
    return useContext(SoundContext);
};
