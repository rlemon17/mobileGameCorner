import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';

import HomeScreen from './components/HomeScreen';
import TicTacToe from './components/TicTacToe';
import Mastermind from './components/Mastermind';
import Colors from './components/Colors';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <MenuProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName='Home'
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="TicTacToe" component={TicTacToe}/>
            <Stack.Screen name="Mastermind" component={Mastermind}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </MenuProvider>
  );
}

export default App;