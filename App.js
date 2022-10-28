import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import LoginView from './src/Screens/LoginScreen';
import DrawerTab from './src/Screens/DrawerTab';
import FilmsView from './src/Screens/FlimsScreen';
import NewsView from './src/Screens/NewsScreen';
import ContactView from './src/Screens/ContactsScreen';
import TicketsView from './src/Screens/TicketsScreen';
import SupportView from './src/Screens/SupportScreen';
import VouchersView from './src/Screens/VouchersScreen';
import UserView from './src/Screens/UsersScreen';
import FilmsContentView from './src/Screens/FilmsContentScreen';
import ShowTimesView from './src/Screens/ShowTimesScreen';
import BranchView from './src/Screens/Branch';
import BillView from './src/Screens/BillScreen';
import TestView from './src/Screens/TestScreen';
// import routes from './src/Route/db';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{
        headerStyle: {
          backgroundColor: '#330066',
        },
        headerTintColor: '#FFFF33',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
      }}>
        <Stack.Screen name="Login" component={LoginView} options={{headerShown: false}}/>
        <Stack.Screen name="DrawerTab" component={DrawerTab} options={{headerShown: false}}/>
        <Stack.Screen name="Films" component={FilmsView} />
        <Stack.Screen name="News" component={NewsView} />
        <Stack.Screen name="Contacts" component={ContactView} />
        <Stack.Screen name="Tickets" component={TicketsView} />
        <Stack.Screen name="Support" component={SupportView} />
        <Stack.Screen name="Vouchers" component={VouchersView} />
        <Stack.Screen name="User" component={UserView} />
        <Stack.Screen name="Thông tin phim" component={FilmsContentView} />
        <Stack.Screen name="Lịch chiếu" component={ShowTimesView} />
        <Stack.Screen name="Chọn khu vực" component={BranchView} />
        <Stack.Screen name="Thanh toán" component={BillView} />
        <Stack.Screen name="TEST VIEW" component={TestView} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}