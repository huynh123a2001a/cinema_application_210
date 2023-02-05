import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View, TextInput, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
} from 'react-native-paper';
import styles from '../Css/drawerCss';
import stylepage from '../Css/pageCss';
import token from '../Handle/setLoginUser.json';
import localhost from '../Route/configIP';
import { LinearGradient } from 'expo-linear-gradient';
import loginUser from '../Handle/setLoginUser.json';
import handleApp from '../Handle/setHandleApp.json'
export default function UserView({ navigation }) {
  const [user, setUser] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [userID, setUserID] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [avatar, setAvatar] = useState();
  const [address, setAddress] = useState();
  const [fullName, setFullName] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState(false);
  const [enterPassword, setEnterPassword] = useState(false);
  const [reEnterPassword, setReEnterPassword] = useState(false);
  const [submitChange, setSubmitChange] = useState('');
  const [modalChangeAvatar, setModalChangeAvatar] = useState(false);
  const [isSave, setSave] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");
  const getUser = async () => {
    try {
      const response = await fetch(localhost() + "/users/" + token.idUser);
      const json = await response.json();
      setUser(json);
      json.filter(item => (setUserID(item.userID), setEmail(item.email), setPhone(item.phone), setAvatar(item.avatar), setAddress(item.address), setFullName(item.fullName)))
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getUser();
  }, []);
  const messageArlert = (value) => {
    Alert.alert(
      handleApp.isLanguage==false?"Thông báo":"Notify",
      value
    )
  }
  function updateProfile() {
    try {
      fetch(localhost() + "/users/edit/" + userID, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userID: userID + " ",
          fullName: fullName + " ",
          email: email + " ",
          avatar: avatar + " ",
          address: address + " ",
          phone: phone + " ",
        })
      }).then((response) => response.json())
        .then((responseData) => {
          if (JSON.stringify(responseData) == 'false') {
            handleApp.isLanguage==false?messageArlert("Cập nhật thất bại."):messageArlert("Update failed.");
            setSave(false);
          }
          else {
            handleApp.isLanguage==false?messageArlert("Cập nhật thành công."):messageArlert("Update success.");
            loginUser.userName = fullName;
            loginUser.email = email;
            getUser();
            user.filter(item => (item.fullName = fullName, item.phone = phone, item.email = email, item.address = address))
            setSave(false);
            navigation.push("DrawerTab")
          }
        })
        .then()
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  }
  function updateAvatar() {
    try {
      fetch(localhost() + "/users/change/avatar", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userID: userID,
          avatar: newAvatar,
        })
      }).then((response) => response.json())
        .then((responseData) => {
          if (JSON.stringify(responseData) == 'false') {
            handleApp.isLanguage==false?messageArlert("Cập nhật thất bại."):messageArlert("Update failed.");
            setSave(false);
          }
          else {
            handleApp.isLanguage==false?messageArlert("Cập nhật thành công."):messageArlert("Update success.");
            loginUser.avatar = newAvatar;
            getUser();
            setSave(false);
            setModalChangeAvatar(!modalChangeAvatar)
            navigation.push("DrawerTab")
          }
        })
        .then()
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  }
  function getFormInput(title, value, setValue) {
    if (value == "null" || value == null || value.trim()=="")
      handleApp.isLanguage==false? value = "Chưa có thông tin":value = "No information";
    value += " ";
    return (
      <View style={{ width: "100%", height: 70, backgroundColor: 'white', borderBottomWidth: 0.4, flexDirection: 'row' }}>
        <View style={{ flex: 3, marginLeft: '5%', justifyContent: 'center' }}>
          <Text>{title}:</Text>
        </View>
        <View style={{ flex: 7, marginLeft: '5%', justifyContent: 'center' }}>
          <View style={{ height: "70%", width: "90%", borderWidth: 1, marginLeft: "5%", backgroundColor: "white" }}>
            <View style={{ height: '100%', marginLeft: '3%', justifyContent: 'center' }}>
              <TextInput onChangeText={setValue}>
                {value.trim()}
              </TextInput>
            </View>
          </View>
        </View>
      </View>
    )
  }
  function getFormText(title, value, hidden) {
    return (
      <View style={{ width: "100%", height: 70, backgroundColor: 'white', borderBottomWidth: 0.4, flexDirection: 'row' }}>
        <View style={{ flex: 3, marginLeft: '5%', justifyContent: 'center' }}>
          <Text>{title}:</Text>
        </View>
        <View style={{ flex: 7, marginLeft: '5%', justifyContent: 'center' }}>
          <View style={{ height: "70%", width: "90%", borderWidth: 1, marginLeft: "5%", backgroundColor: "#ECECEC" }}>
            <View style={{ height: '100%', marginLeft: '3%', justifyContent: 'center' }}>
              <TextInput editable={false} secureTextEntry={hidden} >
                <Text>{value}</Text>
              </TextInput>
            </View>
          </View>
        </View>
      </View>
    )
  }
  function getPasswordText(title, value, hidden) {
    return (
      <View style={{ width: "100%", height: 70, backgroundColor: 'white', borderBottomWidth: 0.4, flexDirection: 'row' }}>
        <View style={{ flex: 3, marginLeft: '5%', justifyContent: 'center' }}>
          <Text>{title}:</Text>
        </View>
        <View style={{ flex: 7, marginLeft: '5%', justifyContent: 'center' }}>
          <TouchableOpacity style={{ height: "70%", width: "90%", borderWidth: 1, marginLeft: "5%", backgroundColor: "white" }} onPress={() => setModalVisible(true)}>
            <View style={{ height: '100%', marginLeft: '3%', justifyContent: 'center' }}>
              <TextInput editable={false} secureTextEntry={hidden} >
                <Text>{value}</Text>
              </TextInput>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  function ChangeAvatar(newavatar) {
    try {
      if (newavatar == "" || newavatar.trim() == "") {
        return handleApp.isLanguage == false ? setSubmitChange("Vui lòng không để trống") : setSubmitChange("Please do not leave it blank");
      }
      handleApp.isLanguage == false ? setSubmitChange("Đang kiểm tra") : setSubmitChange("Checking");
      return updateAvatar();
    }
    catch (e)
    {console.log(e)}
  }
  function ChangePasswood(repass, newpass, renewpass) {
    try {
      if (password == "" || enterPassword == "" || reEnterPassword == "" || password.trim() == "" || enterPassword.trim() == "" || reEnterPassword.trim() == "") {
        return handleApp.isLanguage == false ? setSubmitChange("Vui lòng không để trống") : setSubmitChange("Vui lòng không để trống");
      }
      handleApp.isLanguage == false ? setSubmitChange("Đang kiểm tra") : setSubmitChange("Checking");
      if (newpass !== renewpass)
        return handleApp.isLanguage == false ? setSubmitChange("Mật khẩu mới không trùng khớp") : setSubmitChange("New password does not match");
      fetch(localhost() + "/users/edit/password/" + userID, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userID: userID,
          password: repass,
          newPassword: newpass,
        })
      }).then((response) => response.json())
        .then((responseData) => {
          console.log(JSON.stringify(responseData))
          if (JSON.stringify(responseData) == "1")
            return handleApp.isLanguage == false ? setSubmitChange("Mật khẩu cũ không đúng") : setSubmitChange("Password does not match");
          if (JSON.stringify(responseData) == 'true')
            return handleApp.isLanguage == false ? setSubmitChange("Cập nhật mật khẩu thành công") : setSubmitChange("Password update successful");
          return handleApp.isLanguage == false ? setSubmitChange("Lỗi không mong muốn") : setSubmitChange("Error");
        })
        .then()
    }
    catch (e) {
      handleApp.isLanguage == false ? setSubmitChange("Lỗi không mong muốn") : setSubmitChange("Error");
    }
  }
  function popupChangePassword() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <LinearGradient style={{ width: "90%", height: "95%", backgroundColor: 'yellow', borderRadius: 30, marginTop: "5%", borderWidth: 1 }} colors={['#3366FF', '#3399FF', '#CCFFFF', '#FFFFFF', '#CCFFFF', '#3399FF', '#3366FF',]}
            start={{ x: 0.7, y: 0 }}
            end={{ x: 0.7, y: 1 }}>
            <View style={{ width: "100%", height: '85%' }}>
              <View style={{ width: "100%", height: '40%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{handleApp.isLanguage == false ? "Thay đổi mật khẩu" : "Change password"}</Text>
              </View>
              <View style={{ width: "100%", height: 70, flexDirection: 'row' }}>
                <View style={{ flex: 2, marginLeft: '5%', justifyContent: 'center' }}>
                  <Text style={stylepage.titleContentText}>{handleApp.isLanguage == false ? "Nhập mật khẩu cũ:" : "-"}</Text>
                </View>
                <View style={{ flex: 7, marginLeft: '5%', justifyContent: 'center' }}>
                  <View style={{ height: "70%", width: "90%", borderWidth: 1, marginLeft: "5%", backgroundColor: "white" }} onPress={() => setModalVisible(true)}>
                    <View style={{ height: '100%', marginLeft: '3%', justifyContent: 'center' }}>
                      <TextInput secureTextEntry={true} onChangeText={setPassword}>

                      </TextInput>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ width: "100%", height: 70, flexDirection: 'row' }}>
                <View style={{ flex: 2, marginLeft: '5%', justifyContent: 'center' }}>
                  <Text style={[stylepage.titleContentText, { fontSize: 13 }]}>{handleApp.isLanguage == false ? "Nhập mật khẩu mới:" : "-"}</Text>
                </View>
                <View style={{ flex: 7, marginLeft: '5%', justifyContent: 'center' }}>
                  <View style={{ height: "70%", width: "90%", borderWidth: 1, marginLeft: "5%", backgroundColor: "white" }} onPress={() => setModalVisible(true)}>
                    <View style={{ height: '100%', marginLeft: '3%', justifyContent: 'center' }}>
                      <TextInput secureTextEntry={true} onChangeText={setEnterPassword}>
                      </TextInput>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ width: "100%", height: 70, flexDirection: 'row' }}>
                <View style={{ flex: 2, marginLeft: '5%', justifyContent: 'center' }}>
                  <Text style={[stylepage.titleContentText, { fontSize: 13 }]}>{handleApp.isLanguage == false ? "Nhập lại mật khẩu:" : "-"}</Text>
                </View>
                <View style={{ flex: 7, marginLeft: '5%', justifyContent: 'center' }}>
                  <View style={{ height: "70%", width: "90%", borderWidth: 1, marginLeft: "5%", backgroundColor: "white" }} onPress={() => setModalVisible(true)}>
                    <View style={{ height: '100%', marginLeft: '3%', justifyContent: 'center' }}>
                      <TextInput secureTextEntry={true} onChangeText={setReEnterPassword}>
                      </TextInput>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ width: "100%", height: "20%", alignItems: 'center', justifyContent: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{submitChange}</Text>
              </View>
            </View>
            {submitChange == "Đang kiểm tra" || submitChange == "Checking" ?
              <View style={{ width: '100%', height: '10%', alignItems: 'center', borderTopWidth: 0.5, flexDirection: 'row' }}>

                <View
                  style={[stylepage.button, stylepage.buttonClose, { backgroundColor: "red", flex: 1, margin: "5%" }]}
                  onPress={() => ChangePasswood(password, enterPassword, reEnterPassword)}
                >
                  <Text style={stylepage.titleContentText}>{handleApp.isLanguage == false ? "Xác nhận" : "Confirm"}</Text>
                </View>
                <View
                  style={[stylepage.button, stylepage.buttonClose, { backgroundColor: "red", flex: 1, margin: "5%" }]}
                  onPress={() => (setModalVisible(!modalVisible), setSubmitChange(''))}
                >

                  <Text style={stylepage.titleContentText}>{handleApp.isLanguage == false ? "Đóng" : "Close"}</Text>
                </View>

              </View>
              :
              <View style={{ width: '100%', height: '10%', alignItems: 'center', borderTopWidth: 0.5, flexDirection: 'row' }}>

                <Pressable
                  style={[stylepage.button, stylepage.buttonClose, { backgroundColor: "#FF9900", flex: 1, margin: "5%" }]}
                  onPress={() => ChangePasswood(password, enterPassword, reEnterPassword)}
                >
                  <Text style={stylepage.titleContentText}>{handleApp.isLanguage == false ? "Xác nhận" : "Confirm"}</Text>
                </Pressable>
                <Pressable
                  style={[stylepage.button, stylepage.buttonClose, { backgroundColor: "#FF9900", flex: 1, margin: "5%" }]}
                  onPress={() => (setModalVisible(!modalVisible), setSubmitChange(''))}
                >

                  <Text style={stylepage.titleContentText}>{handleApp.isLanguage == false ? "Đóng" : "Close"}</Text>
                </Pressable>

              </View>
            }
          </LinearGradient>
        </View>
      </Modal>
    );
  }
  function popupChangeAvartar() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalChangeAvatar}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalChangeAvatar(!modalChangeAvatar);
        }}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <LinearGradient style={{ width: "90%", height: "95%", backgroundColor: 'yellow', borderRadius: 30, marginTop: "5%", borderWidth: 1 }} colors={['#3366FF', '#3399FF', '#CCFFFF', '#FFFFFF', '#CCFFFF', '#3399FF', '#3366FF',]}
            start={{ x: 0.7, y: 0 }}
            end={{ x: 0.7, y: 1 }}>
            <View style={{ width: "100%", height: '85%' }}>
              <View style={{ width: "100%", height: '40%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{handleApp.isLanguage == false ? "Thay đổi  đại diện" : "Change avatar"}</Text>
              </View>
              <View style={{ width: "100%", height: 70, flexDirection: 'row' }}>
                <View style={{ flex: 2, marginLeft: '5%', justifyContent: 'center' }}>
                  <Text style={stylepage.titleContentText}>{handleApp.isLanguage == false ? "Nhập đường dẫn image:" : "Enter image path:"}</Text>
                </View>
                <View style={{ flex: 4, marginLeft: '5%', justifyContent: 'center' }}>
                  <View style={{ height: "70%", width: "90%", borderWidth: 1, marginLeft: "5%", backgroundColor: "white" }} onPress={() => setModalVisible(true)}>
                    <View style={{ height: '100%', marginLeft: '3%', justifyContent: 'center' }}>
                      <TextInput onChangeText={setNewAvatar} placeholder={"URL"}>
                      </TextInput>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ width: "100%", height: "20%", alignItems: 'center', justifyContent: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{submitChange}</Text>
              </View>
            </View>
            
              <View style={{ width: '100%', height: '10%', alignItems: 'center', borderTopWidth: 0.5, flexDirection: 'row' }}>

                <Pressable
                  style={[stylepage.button, stylepage.buttonClose, { backgroundColor: "#FF9900", flex: 1, margin: "5%" }]}
                  onPress={() => ChangeAvatar(newAvatar)}
                >
                  <Text style={stylepage.titleContentText}>{handleApp.isLanguage == false ? "Xác nhận" : "Confirm"}</Text>
                </Pressable>
                <Pressable
                  style={[stylepage.button, stylepage.buttonClose, { backgroundColor: "#FF9900", flex: 1, margin: "5%" }]}
                  onPress={() => (setModalChangeAvatar(!modalChangeAvatar))}
                >

                  <Text style={stylepage.titleContentText}>{handleApp.isLanguage == false ? "Đóng" : "Close"}</Text>
                </Pressable>

              </View>
          </LinearGradient>
        </View>
      </Modal>
    );
  }
  return (
    <View>
      <LinearGradient colors={['#3366FF', '#00CCFF', '#33FFFF', '#CCFFFF', '#EEEEEE', '#FFFFFF', '#FFFFFF']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 0 }} style={styles.linearBackground}>
        {popupChangePassword()}
        {popupChangeAvartar()}
        <View style={{ marginTop: '10%', borderBottomWidth: 0.5 }}>
          <View style={styles.userAvatar}>
            <View>
              {avatar == null || avatar == "null" ?
                <TouchableOpacity  onPress={()=>setModalChangeAvatar(!modalChangeAvatar)} >
                  <Avatar.Image source={require('../Screens/imageavt/Avatar-trang-den.png')}
                    size={100}>
                  </Avatar.Image>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>setModalChangeAvatar(!modalChangeAvatar)}> 
                  <Avatar.Image source={{ uri: avatar }}
                    size={100}>
                  </Avatar.Image>
                </TouchableOpacity>
              }
            </View>
            <View style={styles.userInfo}>
              <Title style={styles.title}>
                {user.map(item => item.fullName)}
              </Title>
            </View>
            <Caption style={styles.Caption}>
              Email: {user.map(item => item.email)}
            </Caption>
          </View>
        </View>
      </LinearGradient>
      {isLoading == true ?
        <View style={{ alignItems: 'center', marginTop: '10%' }}>
          <Image source={require('../images/iconLoading.gif')} style={{ maxWidth: '20%', maxHeight: '20%', display: 'block' }}></Image>
          <Text style={{ marginTop: '5%', fontSize: 20, fontWeight: 'bold' }}> Loading...</Text>
        </View>
        :
        <ScrollView>
          <View style={{ width: '100%', height: 'auto', borderTopWidth: 1, marginBottom: '60%' }}>
            <View style={{ width: '100%', marginBottom: "5%" }}>
              {user.map(item =>
                <View key={item.userID}>
                  {getFormText(handleApp.isLanguage==false?"Tên tài khoản":"Username", item.userName)}
                  {getPasswordText(handleApp.isLanguage==false?"Mật khẩu":"Password", item.password, true)}
                  {getFormText(handleApp.isLanguage==false?"ID-Tài khoản":"ID-user", item.userID)}
                  {getFormInput(handleApp.isLanguage==false?"Số điện thoại":"Phone", item.phone, setPhone)}
                  {getFormInput(handleApp.isLanguage==false?"Họ và tên":"Full name", item.fullName, setFullName)}
                  {getFormInput("Email", item.email, setEmail)}
                  {getFormInput(handleApp.isLanguage==false?"Địa chỉ":"Address", item.address, setAddress)}
                </View>
              )}
            </View>
            <View style={{ width: '100%', height: 80, alignItems: 'center', justifyContent: 'center' }}>
              {isSave == false ?
                <TouchableOpacity style={{ width: "50%", height: "70%", borderRadius: 30, alignItems: 'center', justifyContent: 'center', borderWidth: 0.7, backgroundColor: 'orange' }} onPress={() => (updateProfile(), setSave(true))}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Save</Text>
                </TouchableOpacity>
                :
                <View style={{ width: "50%", height: "70%", borderRadius: 30, alignItems: 'center', justifyContent: 'center', borderWidth: 0.7, backgroundColor: 'red' }} onPress={updateProfile}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Save</Text>
                </View>
              }
            </View>

          </View>
        </ScrollView>
      }
    </View>
  );
}