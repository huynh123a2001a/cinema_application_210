import {React} from 'react-native';
import { DrawerContent } from '../DrawerDesign/DrawerContent';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import TabBottomView from './TabBottom';
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
        </Drawer.Navigator>
       
    );
}