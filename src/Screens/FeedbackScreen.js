import { Alert, StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { React } from 'react-native';
import styles from '../Css/pageCss';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import handleApp from '../Handle/setHandleApp.json';
import userLogin from '../Handle/setLoginUser.json';
import localhost from '../Route/configIP';
import { useState, useEffect } from 'react';
export default function FeedbackView({ navigation }) {
    const [message, setMessage] = useState();
    const [improve, setImprove] = useState();
    const [phone, setPhone] = useState();
    const [representativeMail, setRepresentativeMail] = useState();
    const [flagMail, setFlagMail] = useState("");
    const validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            handleApp.isLanguage == false ?
                setFlagMail("Vui lòng nhập đúng mail")
                :
                setFlagMail("Email is Not Correct");
            console.log(flagMail)
            return setRepresentativeMail(text)
        }
        else {
            setFlagMail(true);
            return setRepresentativeMail(text)
        }
    }
    function getFormInput(value, data1) {
        return (
            <View style={{ width: '94%', height: 35, marginLeft: '3%', flexDirection: 'row', alignItems: 'center' }}>
                <TextInput style={{
                    width: '100%',
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                    paddingTop: 10,
                    fontSize: 16,
                    minHeight: 40,
                    marginLeft: '3%'
                }} placeholder={value} autoCapitalize="none" onChangeText={data1}></TextInput>
            </View>
        )
    }
    function getFormInputDouble(value1, value2, data1, data2) {
        return (
            <View style={{ width: '94%', height: 35, marginLeft: '3%', flexDirection: 'row', alignItems: 'center' }}>
                <TextInput style={{
                    width: '100%',
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                    paddingTop: 10,
                    fontSize: 16,
                    minHeight: 40,
                    marginLeft: '3%'
                }} placeholder={value1} autoCapitalize="none" onChangeText={data1}></TextInput>
                <TextInput style={{
                    width: '100%',
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                    paddingTop: 10,
                    fontSize: 16,
                    minHeight: 40,
                    marginLeft: '3%'
                }} placeholder={value2} autoCapitalize="none" onChangeText={data2}></TextInput>
            </View>

        )
    }
    //var sql = "INSERT INTO feedbacks(`message`,`email`,`phone`,`userID`,`createDate`,`cinemaID`) VALUES ('"+req.body.message+"','"+req.body.email+"','"+req.body.phone+"','"+req.body.userID+"','"+dateTime+"')";
    const sendFeedBacks = () => {
        try {
            if(representativeMail == null || message == null || improve == null || phone == null || representativeMail == "" || message == "" || improve == "" || phone == "" || representativeMail.trim() == "" || message.trim() == "" || improve.trim() == "" || phone.trim() == "")
                return alert(handleApp.isLanguage==false?"Vui lòng nhập đủ thông tin":"Please enter enough information")
            if(flagMail!=true)
            return alert(handleApp.isLanguage==false?"Email không hợp lệ":"Email not correct")
            fetch(localhost() + "/feedbacks", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    email: representativeMail,
                    phone: phone,
                    userID: userLogin.idUser,
                    improve: improve
                })
            }).then((response) => response.json())
                .then((responseData) => {
                    if (responseData == "SUCCESS") {
                        alert(handleApp.isLanguage == false ? "Gửi thành công" : "Send success")
                        return navigation.push("DrawerTab")
                    }
                })
                .then()
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
        <LinearGradient colors={['#333399', '#3333FF', '#0099FF', '#99FFFF', '#FFFFFF', '#99FFFF', '#0099FF', '#3333FF', '#333399']}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.7, y: 1 }} style={styles.linearBackground}>
            <View style={{
                width: '90%', height: '95%', backgroundColor: 'white', marginLeft: '5%', marginTop: '5%', shadowColor: '#171717', borderRadius: 5,
                shadowOffset: { width: -2, peak: 6 },
                shadowOpacity: 1,
                shadowRadius: 7,
            }}>
                <View style={{width:'100%', height:'100%'}}>
                    <View style={{flex:4}}>
                        <View style={{ width: '100%', height: 150, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontFamily: "Chalkduster", fontWeight: 'bold', fontSize: 35 }}>
                                {handleApp.isLanguage == false ? "Thư góp ý" : "Feedback mail"}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            
                        </View>
                        <View style={{ width: '94%', height: 35, marginLeft: '3%', flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput style={{
                                width: '100%',
                                flex: 1,
                                borderBottomWidth: 1,
                                borderBottomColor: 'black',
                                paddingTop: 10,
                                fontSize: 16,
                                minHeight: 40,
                                marginLeft: '3%'
                            }} placeholder={"Email"} autoCapitalize="none" onChangeText={(text) => validate(text)} value={representativeMail}></TextInput>
                            <TextInput style={{
                                width: '100%',
                                flex: 1,
                                borderBottomWidth: 1,
                                borderBottomColor: 'black',
                                paddingTop: 10,
                                fontSize: 16,
                                minHeight: 40,
                                marginLeft: '3%'
                            }} placeholder={"Phone"} autoCapitalize="none" onChangeText={setPhone}></TextInput>
                        </View>
                        <View>
                            <Text style={{ marginLeft: "5%", marginTop: '2%', fontSize: 8, fontWeight: 'bold', color: 'red' }}>{flagMail}</Text>
                        </View>
                        <View style={{ marginBottom: '5%', width: '94%', maxWidth: '94%', height: 150, marginLeft: '3%', flexDirection: 'row', alignItems: 'center', marginTop: '5%' }}>
                            <TextInput style={{
                                maxWidth: '94%',
                                height: 135,
                                flex: 1,
                                borderBottomWidth: 1,
                                borderBottomColor: 'black',
                                paddingTop: 10,
                                fontSize: 16,
                                minHeight: 40,
                                marginLeft: '3%'
                            }} placeholder={handleApp.isLanguage == false ? "Nội dung góp ý" : "Feedback content"} autoCapitalize="none" multiline onChangeText={setMessage}></TextInput>
                        </View>
                        {handleApp.isLanguage == false ? getFormInput("Mong muốn cải thiện", setImprove) : getFormInput("Desire to improve", setImprove)}
                    </View>
                    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={{ width: '25%', height: '30%', backgroundColor: '#DDDDDD', borderWidth: 1, borderRadius: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} onPress={sendFeedBacks}>
                                <Text>~</Text>
                                <Ionicons name={"send-outline"} size={22} color={"red"} />
                                <Text style={{ marginLeft: '10%', fontWeight: 'bold' }}>{handleApp.isLanguage == false ? "Gửi" : "Send"}</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
}