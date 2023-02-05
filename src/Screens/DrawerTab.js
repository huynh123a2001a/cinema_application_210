import { React } from 'react-native';
import { DrawerContent } from '../DrawerDesign/DrawerContent';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import TabBottomView from './TabBottom';
import handleApp from '../Handle/setHandleApp.json';
import VouchersView from './VouchersScreen';
import UsersView from './UsersScreen';
import TicketBookedView from './TicketBookingScreen';
import BillHistoryView from './BillHistoryScreen';
import { View } from 'react-native';
const Drawer = createDrawerNavigator();
export default function DrawerTab({ navigation }) {
  return (

    <Drawer.Navigator useLegacyImplementation
      drawerContent={props => <DrawerContent{...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#330066',
          borderBottomLeftRadius: 40,
        },
        headerTintColor: '#FFFF33',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
      }}>
      <Drawer.Screen name={handleApp.isLanguage==false?"Trang chủ":"Home page"} component={TabBottomView} />
      {/* <Drawer.Screen name="Home page" component={TabBottomView} /> */}
      <Drawer.Screen name="Mã giảm giá" component={VouchersView} />
      <Drawer.Screen name="Vouchers" component={VouchersView} />
      <Drawer.Screen name="Thông tin tài khoản" component={UsersView} />
      <Drawer.Screen name="Profile" component={UsersView} />
      <Drawer.Screen name="Lịch sử thanh toán" component={BillHistoryView} />
      <Drawer.Screen name="Payment history" component={BillHistoryView} />
      <Drawer.Screen name="Booked tickets" component={TicketBookedView} />
      <Drawer.Screen name="Vé đã đặt" component={TicketBookedView} />
    </Drawer.Navigator>

  );
}