import {React} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import IndexView from './IndexScreen';
import NewsView from './NewsScreen';
import FilmsView from './FlimsScreen';

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

            if (route.name === 'Chính') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Tin tức') {
              iconName = focused ? 'newspaper-outline' : 'newspaper';
            }
            else if (route.name === 'Đặt vé') {
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
        <Tab.Screen name="Đặt vé" component={FilmsView} />
        <Tab.Screen name="Chính" component={IndexView} />
        <Tab.Screen name="Tin tức" component={NewsView} />
      </Tab.Navigator>
    );
}