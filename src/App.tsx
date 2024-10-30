import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Screens/HomeScreen';
import GameInitScreen from './Screens/GameInitScreen';
import GameNamesScreen from './Screens/GameNamesScreen';
import GameScreen from './Screens/GameScreen';
import GameRules from './Screens/GameRules';

import { SoundProvider } from './Components/SoundContext';

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {

  return (
    <SoundProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
          headerShown: false,
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


export default App;
