import {React} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomePage from './HomePageAdmin';
import Index2 from './HomePageAdmin';
import Index3 from './HomePageAdmin';
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

            if (route.name === 'Trang chủ' || route.name === 'Home page') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Thống kê' || route.name === 'Statistical') {
              iconName = focused ? 'newspaper-outline' : 'newspaper';
            }
            else if (route.name === 'Phản hồi' || route.name === 'Feedback') {
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
        <Tab.Screen name={handleApp.isLanguage==false?"Trang chủ":"Home page"}component={HomePage} />
        {/* <Tab.Screen name={handleApp.isLanguage==false?"Thống kê":"Statistical"} component={Index2} />
        <Tab.Screen name={handleApp.isLanguage==false?"Phản hồi":"Feedback"} component={Index3} /> */}
      </Tab.Navigator>
    );
}