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
      handleApp.isLanguage = !handleApp.isLanguage
      handleApp.isLanguage==false?
        props.navigation.navigate('Trang chủ')
        :
        props.navigation.navigate('Home page')
      }
      catch (e) {console.log(e);}
    }
    function onIndex()
    {
      props.navigation.closeDrawer();
      handleApp.isLanguage==false?
        props.navigation.navigate('Trang chủ')
        :
        props.navigation.navigate('Home page')
    }
    function onVouchers()
    {
      props.navigation.closeDrawer();
      handleApp.isLanguage==false?
        props.navigation.navigate('Mã giảm giá')
        :
        props.navigation.navigate('Vouchers')
    }
    function onUser()
    {
      props.navigation.closeDrawer();
      return props.navigation.navigate('Thông tin tài khoản');
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
              <View style={styles.section}>
                  <Caption style={[styles.Caption, {color:'blue', paddingLeft:3,}]}>
                    {handleApp.isLanguage==false?"Thành viên: ":"Membership: "}
                  </Caption>
                  <Paragraph style={[styles.Paragraph, styles.Caption]}>
                    {handleApp.isLanguage==false?Users.membership==""?"Chưa đăng ký thành viên":Users.membership:Users.membershipEn==""?"Not registered member":Users.membershipEn}
                  </Paragraph>
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
              <DrawerItem icon={({color, size})=>(<Icon name="film" size={20} color="#000"/>)} label={handleApp.isLanguage==false?"Trang chủ":"Home page"} onPress={(onIndex)}></DrawerItem>
              <DrawerItem icon={({color, size})=>(<Icon name="ticket" size={20} color="#f90"/>)} label={handleApp.isLanguage==false?"Mã giảm giá":"Vouchers"} onPress={(onVouchers)}></DrawerItem>
              <DrawerItem icon={({color, size})=>(<Icon name="history" size={20} color="#001"/>)} label={handleApp.isLanguage==false?"Thông tin cá nhân":"Profile"} onPress={(onUser)}></DrawerItem>
              <DrawerItem icon={({color, size})=>(<Icon name="history" size={20} color="#001"/>)} label={handleApp.isLanguage==false?"Đăng xuất":"Logout"} onPress={Logout}></DrawerItem>
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