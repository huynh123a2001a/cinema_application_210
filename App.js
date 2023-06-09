import { StatusBar } from 'expo-status-bar';
import { LogBox, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import LoginView from './src/Screens/LoginScreen';
import DrawerTab from './src/Screens/DrawerTab';
import DrawerTabAdmin from './src/AdminScreens/DrawerTab';
import FilmsView from './src/Screens/FlimsScreen';
import NewsView from './src/Screens/NewsScreen';
import FeedbackView from './src/Screens/FeedbackScreen';
import TicketsView from './src/Screens/TicketsScreen';
import SupportView from './src/Screens/SupportScreen';
import VouchersView from './src/Screens/VouchersScreen';
import FilmsContentView from './src/Screens/FilmsContentScreen';
import ShowTimesView from './src/Screens/ShowTimesScreen';
import BranchView from './src/Screens/Branch';
import BillView from './src/Screens/BillScreen';
import TicketBookedView from './src/Screens/TicketBookingScreen';
import ChangeTicketsView from './src/Screens/ChangeTicketsScreen';
import FoodsView from './src/Screens/FoodCombo';
import TestView from './src/Screens/TestScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  LogBox.ignoreAllLogs();
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
        {/* <Stack.Screen name="Home page" component={FilmsView} options={{headerShown: false}} />
        <Stack.Screen name="Trang chủ" component={FilmsView} options={{headerShown: false}} /> */}
        <Stack.Screen name="Thay đổi vị trí ghế" component={ChangeTicketsView} />
        <Stack.Screen name="Change location chair" component={ChangeTicketsView} />
        <Stack.Screen name="News" component={NewsView} />
        <Stack.Screen name="Tin tức" component={NewsView} />
        <Stack.Screen name="Góp ý" component={FeedbackView} />
        <Stack.Screen name="Feedback" component={FeedbackView} />
        <Stack.Screen name="Đặt vé" component={TicketsView} />
        <Stack.Screen name="Tickets" component={TicketsView} />
        <Stack.Screen name="Support" component={SupportView} />
        <Stack.Screen name="Hỗ trợ" component={SupportView} />
        <Stack.Screen name="Vouchers" component={VouchersView} />
        <Stack.Screen name="Mã giảm giá" component={VouchersView} />
        <Stack.Screen name="Thông tin phim" component={FilmsContentView} />
        <Stack.Screen name="Film detail" component={FilmsContentView} />
        <Stack.Screen name="Lịch chiếu" component={ShowTimesView} />
        <Stack.Screen name="Schedules" component={ShowTimesView} />
        <Stack.Screen name="Chọn khu vực" component={BranchView} />
        <Stack.Screen name="Choose branch" component={BranchView} />
        <Stack.Screen name="Thanh toán" component={BillView} />
        <Stack.Screen name="Payment" component={BillView} />
        <Stack.Screen name="Phụ phẩm" component={FoodsView} />
        <Stack.Screen name="By-products" component={FoodsView} />
        <Stack.Screen name="TEST VIEW" component={TestView} />
        <Stack.Screen name="DrawerTabAdmin" component={DrawerTabAdmin} options={{headerShown: false}} />
        <Stack.Screen name="Booked tickets" component={TicketBookedView} />
        <Stack.Screen name="Vé đã đặt" component={TicketBookedView} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}