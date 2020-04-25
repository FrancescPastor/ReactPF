import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import {MapaView} from './App/views/MapaView';
import {InteresView} from './App/views/InteresView';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="Map">
       <Stack.Screen name="Map" component={MapaView} />
       <Stack.Screen name="LlocInteres" component={InteresView} />
       </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
