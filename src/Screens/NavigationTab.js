import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import FilmsView from './FlimsScreen';
import IndexView from './IndexScreen';
import VouchersView from './VouchersScreen';
const Stack = createNativeStackNavigator();
export default function NavigationTab()
{
    return(
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Films" component={FilmsView} />
        <Stack.Screen name="Index" component={IndexView} />
        <Stack.Screen name="Voucher" component={VouchersView}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
}