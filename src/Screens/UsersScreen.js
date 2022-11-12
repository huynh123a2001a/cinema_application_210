import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  TouchableRipple,
  Drawer,
  Switch,
  Button,
} from'react-native-paper';
import styles from '../Css/drawerCss';
import token from '../Handle/setLoginUser.json';
import localhost from '../Route/configIP';
import { LinearGradient } from 'expo-linear-gradient';
export default function UserView(){
  const [user, setUser] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const getUser = async () => {
    try {
     const response = await fetch(localhost()+"/users/"+token.idUser);
     const json = await response.json();
     setUser(json);
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
 }
  useEffect(() => {
  getUser();
 }, []);
 console.log(user)
const showFilmsContent = (data) =>{
    handleApp.isLanguage==false?
        navigation.navigate("Thông tin phim",data)
        :
        navigation.navigate("Film detail",data)
}
  function getFormInput(title, value)
  {
    return(
      <View style={{width:"100%", height:70, backgroundColor:'white', borderBottomWidth:0.4, flexDirection:'row'}}>
          <View style={{flex:3, marginLeft:'5%', justifyContent:'center'}}>
            <Text>{title}:</Text>
          </View>
          <View style={{flex:7, marginLeft:'5%', justifyContent:'center'}}>
            <TextInput style={{height:"70%", width:"90%", borderWidth:1, marginLeft:"5%", backgroundColor:"white"}}>
              <Text>  {value}</Text>
            </TextInput>
          </View>
      </View>
    )
  }
  function getFormText(title, value, hidden)
  {
    return(
      <View style={{width:"100%", height:70, backgroundColor:'white', borderBottomWidth:0.4, flexDirection:'row'}}>
          <View style={{flex:3, marginLeft:'5%', justifyContent:'center'}}>
            <Text>{title}:</Text>
          </View>
          <View style={{flex:7, marginLeft:'5%', justifyContent:'center'}}>
            <TextInput editable={false} secureTextEntry={hidden} style={{height:"70%", width:"90%", borderWidth:1, marginLeft:"5%", backgroundColor:"#ECECEC"}}>
              <Text>  {value}</Text>
            </TextInput>
          </View>
      </View>
    )
  }
  return (
  <View>
    <LinearGradient colors={['#3366FF','#00CCFF','#33FFFF','#CCFFFF','#EEEEEE', '#FFFFFF','#FFFFFF']}
        start={{ x: 0.1, y: 0 }}
        end={{x: 0.9, y:0}} style={styles.linearBackground}>
      <View style={{marginTop:'10%', borderBottomWidth:0.5}}>
              <View style={styles.userAvatar}>
                <View>
                  <Avatar.Image source={{uri:'https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang-den.png'}} 
                  size={100}>
                  </Avatar.Image>
                </View>
                <View style={styles.userInfo}>
                    <Title style={styles.title}>
                        User
                    </Title>
                </View>
                <Caption style={styles.Caption}>
                      Email
                </Caption>
              </View>
      </View>
      </LinearGradient>
      <ScrollView>
      <View style={{width:'100%', height:'auto', borderTopWidth:1, marginBottom:'60%'}}>
          <View style={{width:'100%', marginBottom:"5%"}}>
          {user.map(item=>
            <View>
            {getFormText("Tên tài khoản",item.userName)}
            {getFormText("Mật khẩu",item.password,true)}
            {getFormInput("Email",item.email)}
            {getFormText("ID-Tài khoản", item.userID)}
            {getFormInput("Họ và tên",item.fullName)}
            </View>
          )}
          </View>
          <View style={{ width:'100%', height:80, alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity style={{width:"50%", height:"70%", backgroundColor:'white', borderRadius:30, alignItems:'center', justifyContent:'center', borderWidth:0.7, backgroundColor:'orange'}}>
              <Text style={{fontWeight:'bold', fontSize:20}}>Save</Text>
            </TouchableOpacity>
          </View>
          
      </View>
      </ScrollView>
  </View>
  );
}