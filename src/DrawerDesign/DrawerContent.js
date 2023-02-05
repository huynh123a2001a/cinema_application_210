import React, { useState } from 'react';
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
    const [onView, setOnView] = useState(1)
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
      props.navigation.push('DrawerTab')
      // handleApp.isLanguage==false?
      //   props.navigation.navigate('Trang chủ')
      //   :
      //   props.navigation.navigate('Home page')
      }
      catch (e) {console.log(e);}
    }
    function onIndex()
    {
      props.navigation.closeDrawer();
      setOnView(1);
      handleApp.isLanguage==false?
        props.navigation.navigate('Trang chủ')
        :
        props.navigation.navigate('Home page')
    }
    function onVouchers()
    {
      props.navigation.closeDrawer();
      setOnView(2);
      handleApp.isLanguage==false?
        props.navigation.navigate('Mã giảm giá')
        :
        props.navigation.navigate('Vouchers')
    }
    function onUser()
    {
      props.navigation.closeDrawer();
      setOnView(4);
      handleApp.isLanguage==false?
      props.navigation.navigate('Thông tin tài khoản')
      :
      props.navigation.navigate('Profile')
    }
    function onBillHistory()
    {
      props.navigation.closeDrawer();
      setOnView(5);
      handleApp.isLanguage==false?
        props.navigation.navigate('Lịch sử thanh toán')
        :
        props.navigation.navigate('Payment history')
    }
    function onBooked()
    {
      props.navigation.closeDrawer();
      setOnView(3);
      handleApp.isLanguage==false?
        props.navigation.navigate('Vé đã đặt')
        :
        props.navigation.navigate('Booked tickets')
    }
    
    function Logout()
    {
      setOnView(1);
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
        <ImageBackground style={styles.drawerMain} source={require('../images/christmasFlower.png')}>
          <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
              <View style={styles.userAvatar}>
                <View>
                  {
                    Users.avatar=="null" || Users.avatar==null?
                    <Avatar.Image source={require("../Screens/imageavt/Avatar-trang-den.png")} 
                      size={50}>
                    </Avatar.Image>
                    :
                    <Avatar.Image source={{uri:Users.avatar}} 
                      size={50}>
                    </Avatar.Image>
                  }
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
              <DrawerItem style={onView==1?({backgroundColor:'#99FFFF', borderWidth:0.5}):({backgroundColor:null})} icon={({color, size})=>(<Icon name="film" size={20} color="#000"/>)} label={handleApp.isLanguage==false?"Trang chủ":"Home page"} onPress={(onIndex)}></DrawerItem>
              <DrawerItem style={onView==2?({backgroundColor:'#99FFFF', borderWidth:0.5}):({backgroundColor:null})} icon={({color, size})=>(<Icon name="gift" size={20} color="blue"/>)} label={handleApp.isLanguage==false?"Mã giảm giá":"Vouchers"} onPress={(onVouchers)}></DrawerItem>
              <DrawerItem style={onView==3?({backgroundColor:'#99FFFF', borderWidth:0.5}):({backgroundColor:null})} icon={({color, size})=>(<Icon name="ticket" size={20} color="orange"/>)} label={handleApp.isLanguage==false?"Vé đã đặt":"Booked tickets"} onPress={(onBooked)}></DrawerItem>
              <DrawerItem style={onView==4?({backgroundColor:'#99FFFF', borderWidth:0.5}):({backgroundColor:null})} icon={({color, size})=>(<Icon name="user" size={20} color="#001"/>)} label={handleApp.isLanguage==false?"Thông tin cá nhân":"Profile"} onPress={(onUser)}></DrawerItem>
              <DrawerItem style={onView==5?({backgroundColor:'#99FFFF', borderWidth:0.5}):({backgroundColor:null})} icon={({color, size})=>(<Icon name="refresh" size={20} color="#001"/>)} label={handleApp.isLanguage==false?"Hoá đơn":"Bills"} onPress={(onBillHistory)}></DrawerItem>
              <DrawerItem icon={({color, size})=>(<Icon name="power-off" size={20} color="red"/>)} label={handleApp.isLanguage==false?"Đăng xuất":"Logout"} onPress={Logout}></DrawerItem>
              </Drawer.Section>
              </LinearGradient>
              <Drawer.Section title={handleApp.isLanguage==false?"Chế độ xem":"View mode"}>
                <LinearGradient colors={['#CCFFFF','#99FFFF', '#3399FF', '#003366','#003366']}
                start={{ x: 0.2, y: 0 }}
                end={{x: 1, y:1}}>
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
        </ImageBackground>
    );
}