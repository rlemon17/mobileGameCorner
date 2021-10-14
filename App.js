import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './components/HomeScreen';
import TicTacToe from './components/TicTacToe';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName='Home'
          screenOptions={{
            headerStyle: {
              backgroundColor: '#00B2C2',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TicTacToe" component={TicTacToe}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;