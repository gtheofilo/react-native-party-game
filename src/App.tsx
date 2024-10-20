/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import GameButton from './Components/Button';





import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// Import your screens
import HomeScreen from './Screens/HomeScreen';
import GameInitScreen from './Screens/GameInitScreen';

import GameNamesScreen from './Screens/GameNamesScreen';
import GameScreen from './Screens/GameScreen';
// Create the stack navigator

import KeepAwake from 'react-native-keep-awake';
import GameRules from './Screens/GameRules';

import { SoundProvider } from './Components/SoundContext';

function App(): React.JSX.Element {

  return (
    <SoundProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
          headerShown: false, // This hides the header for all screens
        }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="GameInit" component={GameInitScreen} />
          <Stack.Screen name="GameNames" component={GameNamesScreen} />
          <Stack.Screen name="Game" component={GameScreen} />

          <Stack.Screen name="GameRules" component={GameRules} />
        </Stack.Navigator>
      </NavigationContainer>
    </SoundProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
  }
});

export default App;
