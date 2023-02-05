import {React} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import IndexView from './NewsScreen';
import NewsView from './NewsScreen';
import FilmsView from './FlimsScreen';
import FeedbackView from './FeedbackScreen';
import { ImageBackground } from 'react-native';
import handleApp from '../Handle/setHandleApp.json';
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
            } else if (route.name === 'Góp ý' || route.name === 'Feedback') {
              iconName = focused ? 'mail-outline' : 'mail';
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
          tabBarActiveTintColor:'blue',
          tabBarBadgeStyle:{color:'red'},
           tabBarBackground: () => (<ImageBackground style={{backgroundColor:'#99FFFF',bottom:0.5, borderTopWidth:1,width:'100%', height:"100%", maxHeight:'100%',maxWidth:'100%'}} source={require('../images/ImgTabBottom.png')}></ImageBackground>),
        })}
      >
        <Tab.Screen name={handleApp.isLanguage==false?"Đặt vé":"Booking"}component={FilmsView} />
        <Tab.Screen name={handleApp.isLanguage==false?"Sự kiện":"Events"} component={NewsView} />
        <Tab.Screen name={handleApp.isLanguage==false?"Góp ý":"Feedback"} component={FeedbackView} />
      </Tab.Navigator>
    );
}