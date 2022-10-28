import { StyleSheet, Text, View,TouchableOpacity, ImageBackground, TextInput, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';    
import styles from '../Css/pageCss';
import localhost from '../Route/configIP';
export default function LoginView({navigation})
{   
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
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
    const submitLogin = async () =>
    {   
        console.log(isLoading);
        try {
        if(userName=='' || password=='')
            {
                return console.log("Chưa có thông tin")
                setLoading(false);
                console.log(isLoading);
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
                    console.log("Tài khoản hoặc mật khẩu không đúng");
                }
                else
                {
                    console.log("userID: "+JSON.stringify(responseData));
                    navigation.navigate ('DrawerTab');
                }
            })
            .then()
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
            console.log(isLoading);
        }
    
    }
    function onIndex(user)
    {
        navigation.navigate ('DrawerTab',user);
    }
    const submitSignUp = () =>
    {   
        fetch(localhost()+"/users/signup", {
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
                console.log("Tài khoản đã tồn tại");
            }
            else
            {
                console.log(JSON.stringify(responseData));
                navigation.navigate ('DrawerTab');
            }
        })
        .then()
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
                    <TextInput style={styles.input} placeholder="Username (use login)" autoCapitalize="none" onChangeText={setUsername}></TextInput>
                    {!isLogin && <TextInput style={styles.input} placeholder="Email (Không bắt buộc)" onChangeText={setEmail}></TextInput>}
                    <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword}></TextInput>
                    <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
                    <LinearGradient
                    // Button Linear Gradient
                    colors={['#FF9933', '#FFCC00', '#FFCC66', '#FFCC00', '#FF9933']}
                    start={{ x: 0.9, y: 0.7 }}
                    end={{x: 0.1, y:0.3}}
                    style={styles.button}>
                    <TouchableOpacity style={styles.button} onPress={isLogin? waiting:submitSignUp}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient
                    // Button Linear Gradient
                    colors={['#FF9933', '#FFCC00', '#FFCC66', '#FFCC00', '#FF9933']}
                    start={{ x: 0.9, y: 0.7 }}
                    end={{x: 0.1, y:0.3}}
                    style={styles.button}>
                    <TouchableOpacity style={styles.button} onPress={onTestView}>
                        <Text style={styles.buttonText}>Test view</Text>
                    </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient
                    // Button Linear Gradient
                    colors={['#FF9900', '#FFCC33', '#FFCC66', '#FFCC33', '#FF9900']}
                    start={{ x: 0.9, y: 0.7 }}
                    end={{x: 0.1, y:0.3}}
                    style={styles.button}>
                    <TouchableOpacity style={styles.buttonAlt} onPress={onChangeHandler}>
                        <Text style={styles.buttonAltText}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
                    </TouchableOpacity>
                    </LinearGradient>
                </View>    
            </View>
        </LinearGradient>
        )
    }
    return (
        <ImageBackground source={require('../images/backgroundLogin.jpg')} style={[styles.container,{justifyContent:'auto'}]}>

            <View style={styles.logoLogin}>
                <Image source={require('../images/logoLogin.png')} style={styles.logoLogin}></Image>
            </View>
            {viewLogin()}
        </ImageBackground>
    );
}