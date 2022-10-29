import {React} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import IndexView from './IndexScreen';
import NewsView from './NewsScreen';
import FilmsView from './FlimsScreen';
import handleApp from '../Handle/setHandleApp.json'
const Tab = createBottomTabNavigator();
export default function TabBottomView()
{
    function IndexViewScreen() {
        return (
        <IndexView/>
        );
      }
      
      function NewsViewScreen() {
        return (
        <NewsView/>
        );
      }
      function TicketsViewScreen() {
        return(
        <TicketsView/>
        );
      }
    return(
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Sự kiện' || route.name === 'Events') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Tin tức' || route.name === 'News') {
              iconName = focused ? 'newspaper-outline' : 'newspaper';
            }
            else if (route.name === 'Đặt vé' || route.name === 'Booking') {
              iconName = focused ? 'barcode' : 'barcode-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name={handleApp.isLanguage==false?"Đặt vé":"Booking"}component={FilmsView} />
        <Tab.Screen name={handleApp.isLanguage==false?"Sự kiện":"Events"} component={IndexView} />
        <Tab.Screen name={handleApp.isLanguage==false?"Tin tức":"News"} component={NewsView} />
      </Tab.Navigator>
    );
}