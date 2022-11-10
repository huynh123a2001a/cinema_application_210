import React from 'react';
import {View, Text, DevSettings, ImageBackground, Image, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import handleApp from '../Handle/setHandleApp.json';
import Users from '../Handle/setLoginUser.json';
import styles from '../Css/drawerCss'
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    TouchableRipple,
    Drawer,
    Switch,
  } from'react-native-paper';
  import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
export function DrawerContent(props)
{
    const [isDarkTheme,setIsDarkTheme] = React.useState(false);
    const toggleTheme = () =>
    {
      setIsDarkTheme(!isDarkTheme);
    }
    const [isLanguage,setIsLanguage] = React.useState(false);
    const languageTheme = () =>
    {
      try{
      setIsLanguage(!isLanguage);
      handleApp.isLanguage = !handleApp.isLanguage;
      props.navigation.push("DrawerTabAdmin")
      }
      catch (e) {console.log(e);}
    }
    function ProfileManagers()
    {
      props.navigation.closeDrawer();
      return props.navigation.navigate('Trang chủ');
    }
    function UsersManagers()
    {
      props.navigation.closeDrawer();
      return props.navigation.navigate('Trang chủ');
    }
    function CinemaManagers()
    {
      props.navigation.closeDrawer();
      return props.navigation.navigate('Trang chủ');
    }
    function MembersManagers()
    {
      props.navigation.closeDrawer();
      return props.navigation.navigate('Trang chủ');
    }
    function ProfileManagers()
    {
      props.navigation.closeDrawer();
      return props.navigation.navigate('Trang chủ');
    }
    function FilmsManagers()
    {
      props.navigation.closeDrawer();
      return props.navigation.navigate('Trang chủ');
    }
    function PaymentManagers()
    {
      props.navigation.closeDrawer();
      return props.navigation.navigate('Trang chủ');
    }
    function NewsManagers()
    {
      props.navigation.closeDrawer();
      return props.navigation.navigate('Trang chủ');
    }
    function EventManagers()
    {
      props.navigation.closeDrawer();
      return props.navigation.navigate('Trang chủ');
    }
    function Logout()
    {
      props.navigation.closeDrawer();
      Users.idUser ="";
      Users.email ="";
      Users.membership="";
      Users.membershipEn="";
      Users.point="";
      Users.userName="";
      Users.timeLogin=false;
      Users.avatar="";
      return props.navigation.push('Login');
    }
    return (
        <View style={styles.drawerMain}>
          <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
              <View style={styles.userAvatar}>
                <View>
                  <Avatar.Image source={{uri:Users.avatar==""?'https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang-den.png':Users.avatar}} 
                  size={50}>
                  </Avatar.Image>
                </View>
                <View style={styles.userInfo}>
                    <Title style={styles.title}>
                        {Users.userName}
                    </Title>
                </View>
                <Caption style={styles.Caption}>
                  {Users.email}
                </Caption>
              </View>
              <View style={styles.row}>
              <View style={[styles.section,{marginLeft:"35%"}]}>
                  <Caption style={[styles.Caption, {color:'red', paddingLeft:3}]}>
                    Administrator
                  </Caption>
                </View>
                { Users.membership==""?'':
                <View style={styles.section}>
                  <Caption style={[styles.Caption, {color:'darkred'}]}>
                    {handleApp.isLanguage==false?"Điểm tích luỹ: ":"Point: "}
                  </Caption>
                  <Paragraph style={[styles.Paragraph, styles.Caption]}>
                    {Users.point}
                  </Paragraph>
                </View>
                }
              </View>
              <LinearGradient colors={['#FFCC66', '#FFFFCC', '#FFCC66']}
              start={{ x: 0.2, y: 0 }}
              end={{x: 1, y:1}} style={{borderWidth:1}}>              
              <Drawer.Section style={styles.drawerSection}>
              <DrawerItem icon={({color, size})=>(<Icon name="wrench" size={20} color="#000"/>)} label={handleApp.isLanguage==false?"Thông tin cá nhân":"Profile"} onPress={(ProfileManagers)}></DrawerItem>
              <DrawerItem icon={({color, size})=>(<Icon name="wrench" size={20} color="#000"/>)} label={handleApp.isLanguage==false?"Quản lý Tài khoản":"Users manager"} onPress={(UsersManagers)}></DrawerItem>
              <DrawerItem icon={({color, size})=>(<Icon name="wrench" size={20} color="#000"/>)} label={handleApp.isLanguage==false?"Quản lý rạp":"Cinema manager"} onPress={(CinemaManagers)}></DrawerItem>
              <DrawerItem icon={({color, size})=>(<Icon name="wrench" size={20} color="#000"/>)} label={handleApp.isLanguage==false?"Quản lý thành viên":"Members manager"} onPress={(MembersManagers)}></DrawerItem>
              <DrawerItem icon={({color, size})=>(<Icon name="wrench" size={20} color="#000"/>)} label={handleApp.isLanguage==false?"Quản lý phim":"Films manager"} onPress={(FilmsManagers)}></DrawerItem>
              <DrawerItem icon={({color, size})=>(<Icon name="wrench" size={20} color="#000"/>)} label={handleApp.isLanguage==false?"Quản lý thanh toán":"Payment Managers"} onPress={(PaymentManagers)}></DrawerItem>
              <DrawerItem icon={({color, size})=>(<Icon name="wrench" size={20} color="#000"/>)} label={handleApp.isLanguage==false?"Quản lý tin tức":"News manager"} onPress={(NewsManagers)}></DrawerItem>
              <DrawerItem icon={({color, size})=>(<Icon name="wrench" size={20} color="#000"/>)} label={handleApp.isLanguage==false?"Quản lý sự kiện":"Event manager"} onPress={(EventManagers)}></DrawerItem>
              </Drawer.Section>
              </LinearGradient>
              <Drawer.Section title={handleApp.isLanguage==false?"Chế độ xem":"View mode"}>
                <LinearGradient colors={['#CCFFFF','#99FFFF', '#3399FF', '#003366','#003366']}
                start={{ x: 0.2, y: 0 }}
                end={{x: 1, y:1}}>
                <TouchableRipple onPress={()=>{toggleTheme()}}>
                  <View style={styles.preference}>
                    <Text style={{fontWeight:'bold', color:'black'}} >{handleApp.isLanguage==false?"Chế độ ban đêm":"Dark theme"}</Text>
                    <View pointerEvents="none">
                    <Switch value={isDarkTheme}/>
                  </View>
                  </View>
                </TouchableRipple>
                <TouchableRipple onPress={()=>{languageTheme()}}>
                  <View style={styles.preference}>
                    <Text style={{fontWeight:'bold', color:'black'}} >{handleApp.isLanguage==false?"Tiếng việt ⇄ Engligh":" Engligh ⇄ Tiếng việt"}</Text>
                    <View pointerEvents="none">
                      <Switch value={handleApp.isLanguage}/>
                    </View>
                  </View>
                </TouchableRipple>
                </LinearGradient>
              </Drawer.Section>
            </View>
            <Image style={styles.logoDrawer} source={require('../images/logoCinema.png')}/>
          </DrawerContentScrollView>
        </View>
    );
}