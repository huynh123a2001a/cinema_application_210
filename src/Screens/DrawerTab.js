import {React} from 'react-native';
import { DrawerContent } from '../DrawerDesign/DrawerContent';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import TabBottomView from './TabBottom';
import handleApp from '../Handle/setHandleApp.json';
import VouchersView from './VouchersScreen'
const Drawer = createDrawerNavigator();
export default function DrawerTab({navigation})
{
    return(
       
        <Drawer.Navigator  useLegacyImplementation
            drawerContent={props => <DrawerContent{...props}/>} 
            screenOptions={{
                headerStyle: {backgroundColor: '#330066',
                borderBottomLeftRadius:40,
            },
                headerTintColor: '#FFFF33',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                },
              }}>
              <Drawer.Screen name="Trang chủ" component={TabBottomView} />
              <Drawer.Screen name="Home page" component={TabBottomView} />
              <Drawer.Screen name="Mã giảm giá" component={VouchersView} />
              <Drawer.Screen name="Vouchers" component={VouchersView} />   
        </Drawer.Navigator>
       
    );
}