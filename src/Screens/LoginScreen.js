import { ScrollView, Text, View,TouchableOpacity, ImageBackground, TextInput, Image, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';    
import styles from '../Css/pageCss';
import localhost from '../Route/configIP';
import loginUser from '../Handle/setLoginUser.json';
export default function LoginView({navigation})
{   
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [getUser, setUser] = useState([]);
    const onChangeHandler = () => {
    setIsLogin(!isLogin);
    setMessage('');
    };
    function waiting (){
        return submitLogin();
    }
    const messageArlert = (value) =>
    {
        Alert.alert(
        "Thông báo",
        value
        )
    }
    const submitLogin = async () =>
    {   
        try {
        setMessage("Đang đăng nhập, vui lòng đợi");
        if(userName=='' || password=='')
            {
                return setMessage("Chưa có thông tin")
            }
        fetch(localhost()+"/users/login", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userName,
                password: password,
            })
            }).then((response) => response.json())
            .then((responseData) => {
                if(JSON.stringify(responseData)=='false')
                {
                    messageArlert("Tài khoản hoặc mật khẩu không đúng");
                    setMessage('');
                }
                else
                {
                    responseData.user.map(item=> {return(
                        loginUser.idUser = item.userID, 
                        loginUser.email = item.email, 
                        loginUser.userName=item.fullName, 
                        loginUser.timeLogin=true,
                        loginUser.avatar=item.avatar)})
                    if(responseData.member!=false)
                    {
                        responseData.member.map(item=>
                            {return(
                            loginUser.membership=item.membershipName,
                            loginUser.membershipEn=item.membershipName1,
                            loginUser.point=item.points
                            )}
                        )
                    }
                    navigation.push ('DrawerTab');
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
    function onIndex(user)
    {
        navigation.navigate ('DrawerTab',user);
    }
    const submitSignUp = () =>
    {   
        try{setMessage("Đang đăng ký, vui lòng đợi");
        fetch(localhost()+"/users/signup", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: userName,
            password: password,
            email:email,
            fullName:fullName,
            address:address,
        })
        }).then((response) => response.json())
        .then((responseData) => {
            if(JSON.stringify(responseData)=='false')
            {
                messageArlert("Tài khoản đã tồn tại");
                setMessage('');
            }
            else
            {
                responseData.map(item=> {return(
                    loginUser.idUser = item.userID, 
                    loginUser.email = item.email, 
                    loginUser.userName=item.fullName, 
                    loginUser.timeLogin=true,
                    loginUser.avatar=item.avatar)})
                navigation.push ('DrawerTab');
            }
        })
        .then()
        }
        catch(e)
        {
            console.log(e);
        }
    }
    function onTestView()
    {
        return navigation.navigate('TEST VIEW')
    }
    const viewLogin = () =>
    {
        return(
            <LinearGradient style={styles.card} colors={['#FFCC66', '#FFFFCC', '#FFCC66']}
            start={{ x: 0.2, y: 0 }}
            end={{x: 1, y:1}}>
            <Text style={styles.heading}>{isLogin ? 'Login' : 'Signup'}</Text>
            <View style={styles.form}>
                <View style={styles.inputs}>
                        <View style={{width:'95%', marginLeft:"15%", height:140}}>
                        <ScrollView>
                        <TextInput style={styles.input} placeholder="Username (user login)" autoCapitalize="none" onChangeText={setUsername}></TextInput>
                        <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword}></TextInput>
                        {!isLogin && <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail}></TextInput>}
                        {!isLogin && <TextInput style={styles.input} placeholder="Full Name" onChangeText={setFullName}></TextInput>}
                        {!isLogin && <TextInput style={styles.input} placeholder="Address (Optional)" onChangeText={setAddress}></TextInput>}
                        <View style={{width:'80%', height:'100%', height:'100%',alignItems:'center', marginTop:'5%'}}>
                            <Text style={{fontSize:20, fontWeight:'bold'}}>{message}</Text>
                        </View>
                        </ScrollView>
                        </View>
                    {
                    message==''||message=="Chưa có thông tin"?
                    (
                    isLogin?
                    <LinearGradient
                    // Button Linear Gradient
                    colors={['#FF9933', '#FFCC00', '#FFCC66', '#FFCC00', '#FF9933']}
                    start={{ x: 0.9, y: 0.7 }}
                    end={{x: 0.1, y:0.3}}
                    style={styles.button}>
                    <TouchableOpacity style={styles.button} onPress={()=>{isLogin? waiting():userName.trim()==""||password.trim()==""||email.trim()==""||fullName.trim()==""?messageArlert("Vui lòng điền đầy đủ thông tin."):submitLogin()}}>
                        <Text style={styles.buttonText}>Đăng nhập</Text>
                    </TouchableOpacity>
                    </LinearGradient>
                    :
                    <LinearGradient
                    // Button Linear Gradient
                    colors={['#FF9933', '#FFCC00', '#FFCC66', '#FFCC00', '#FF9933']}
                    start={{ x: 0.9, y: 0.7 }}
                    end={{x: 0.1, y:0.3}}
                    style={styles.button}>
                    <TouchableOpacity style={styles.button} onPress={()=>{isLogin? waiting():userName.trim()==""||password.trim()==""||email.trim()==""||fullName.trim()==""?messageArlert("Vui lòng điền đầy đủ thông tin."):submitSignUp()}}>
                        <Text style={styles.buttonText}>Đăng ký</Text>
                    </TouchableOpacity>
                    </LinearGradient>
                    )
                    :
                    (
                    isLogin?
                    <LinearGradient
                    // Button Linear Gradient
                    colors={['#3366FF', '#00CCFF', '#99FFFF', '#00CCFF', '#3366FF']}
                    start={{ x: 0.9, y: 0.7 }}
                    end={{x: 0.1, y:0.3}}
                    style={styles.button}>
                        <View style={styles.button} onPress={()=>{isLogin? waiting():userName.trim()==""||password.trim()==""||email.trim()==""||fullName.trim()==""?messageArlert("Vui lòng điền đầy đủ thông tin."):submitLogin()}}>
                            <Text style={styles.buttonText}>Đăng nhập</Text>
                        </View>
                    </LinearGradient>
                    :
                    <LinearGradient
                    // Button Linear Gradient
                    colors={['#3366FF', '#00CCFF', '#99FFFF', '#00CCFF', '#3366FF']}
                    start={{ x: 0.9, y: 0.7 }}
                    end={{x: 0.1, y:0.3}}
                    style={styles.button}>
                        <View style={styles.button} onPress={()=>{isLogin? waiting():userName.trim()==""||password.trim()==""||email.trim()==""||fullName.trim()==""?messageArlert("Vui lòng điền đầy đủ thông tin."):submitSignUp()}}>
                            <Text style={styles.buttonText}>Đăng ký</Text>
                        </View>
                    </LinearGradient>
                    )
                    }
                    <LinearGradient
                    // Button Linear Gradient
                    colors={['#FF9900', '#FFCC33', '#FFCC66', '#FFCC33', '#FF9900']}
                    start={{ x: 0.9, y: 0.7 }}
                    end={{x: 0.1, y:0.3}}
                    style={styles.button}>
                    <TouchableOpacity style={styles.buttonAlt} onPress={()=>(setIsLogin(!isLogin),setMessage(''))}>
                        <Text style={styles.buttonAltText}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
                    </TouchableOpacity>
                    </LinearGradient>
                </View>    
            </View>
        </LinearGradient>
        )
    }
    function setView()
    {
        return(
                // <View style={{width:'100%',height:'100%', alignItems:'center', backgroundColor:'#999999', position:'relative', opacity:'0.7'}}>
                //     <ImageBackground source={require('../images/backgroundLogin.jpg')} style={[styles.container,{width:'100%',height:'100%',justifyContent:'auto'}]}>
                //     </ImageBackground>
                // </View>
                <ImageBackground source={require('../images/backgroundLogin.jpg')} style={[styles.container,{width:'100%',height:'100%',justifyContent:'auto'}]}>
                    <View style={styles.logoLogin}>
                        <Image source={require('../images/logoLogin.png')} style={styles.logoLogin}></Image>
                    </View>
                    
                        {viewLogin()}
                
                </ImageBackground>
        )
    }
    return (
        <View style={{width:'100%',height:'100%'}}>
            {setView()}
        </View>
    );
}