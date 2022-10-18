import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
      setIsLanguage(!isLanguage);
    }
    function onIndex()
    {
      props.navigation.closeDrawer();
      return props.navigation.navigate('Trang chủ');
    }
    function onVouchers()
    {
      props.navigation.closeDrawer();
      return props.navigation.navigate('Vouchers');
    }
    function onUser()
    {
      props.navigation.closeDrawer();
      return props.navigation.navigate('User');
    }
    function Logout()
    {
      props.navigation.closeDrawer();
      return props.navigation.navigate('Login');
    }
    return (
        <View style={styles.drawerMain}>
          <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
              <View style={styles.userAvatar}>
                <View>
                  <Avatar.Image source={{uri:'https://scontent.fsgn8-2.fna.fbcdn.net/v/t39.30808-1/296108614_5318513248262317_1962124852163417651_n.jpg?stp=c0.67.320.320a_dst-jpg_p320x320&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=i0V9XUsuCT4AX_MLH2x&_nc_ht=scontent.fsgn8-2.fna&oh=00_AT8r-OwJ6KWwSJMll5CxSL3g5QeswdnkD9MGra6rP8KjwA&oe=633A8044'}} 
                  size={50}>
                  </Avatar.Image>
                </View>
                <View style={styles.userInfo}>
                    <Title style={styles.title}>
                        Nguyễn Tuấn Quỳnh
                    </Title>
                </View>
                <Caption style={styles.Caption}>
                  huynh123a2001a@gmail.com
                </Caption>
              </View>
              <View style={styles.row}>
              <View style={styles.section}>
                  <Caption style={[styles.Caption, {color:'blue', paddingLeft:3,}]}>
                    Membership: 
                  </Caption>
                  <Paragraph style={[styles.Paragraph, styles.Caption]}>
                    Gold
                  </Paragraph>
                </View>
                <View style={styles.section}>
                  <Caption style={[styles.Caption, {color:'darkred'}]}>
                    Employee: 
                  </Caption>
                  <Paragraph style={[styles.Paragraph, styles.Caption]}>
                    Customer
                  </Paragraph>
                </View>
              </View>
              <LinearGradient colors={['#FFCC66', '#FFFFCC', '#FFCC66']}
              start={{ x: 0.2, y: 0 }}
              end={{x: 1, y:1}} style={{borderWidth:1}}>
              <Drawer.Section style={styles.drawerSection}>
              <DrawerItem icon={({color, size})=>(<Icon name="film" size={20} color="#000"/>)} label="Trang chủ" onPress={(onIndex)}></DrawerItem>
              <DrawerItem icon={({color, size})=>(<Icon name="ticket" size={20} color="#f90"/>)} label="Vouchers" onPress={(onVouchers)}></DrawerItem>
              <DrawerItem icon={({color, size})=>(<Icon name="history" size={20} color="#001"/>)} label="Thông tin cá nhân" onPress={(onUser)}></DrawerItem>
              <DrawerItem icon={({color, size})=>(<Icon name="history" size={20} color="#001"/>)} label="Đăng xuất" onPress={Logout}></DrawerItem>
              </Drawer.Section>
              </LinearGradient>
              <Drawer.Section title="Chế độ xem">
                <LinearGradient colors={['#CCFFFF','#99FFFF', '#3399FF', '#003366','#003366']}
                start={{ x: 0.2, y: 0 }}
                end={{x: 1, y:1}}>
                <TouchableRipple onPress={()=>{toggleTheme()}}>
                  <View style={styles.preference}>
                    <Text style={{fontWeight:'bold', color:'black'}} >Ban đêm</Text>
                    <View pointerEvents="none">
                    <Switch value={isDarkTheme}/>
                  </View>
                  </View>
                </TouchableRipple>
                <TouchableRipple onPress={()=>{languageTheme()}}>
                  <View style={styles.preference}>
                    <Text style={{fontWeight:'bold', color:'black'}} >Tiếng việt ⇄ Engligh</Text>
                    <View pointerEvents="none">
                      <Switch value={isLanguage}/>
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