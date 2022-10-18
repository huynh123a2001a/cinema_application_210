import { StyleSheet, Text, View,TouchableOpacity, ImageBackground, TextInput, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';    
import styles from '../Css/pageCss';
export default function LoginView({navigation})
{   
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const onChangeHandler = () => {
    setIsLogin(!isLogin);
    setMessage('');
    };  
    const submitLogin = () =>
    {
        console.log(userName+"|***********");
        navigation.navigate ('DrawerTab');
    }
    return (
        <ImageBackground source={require('../images/backgroundLogin.jpg')} style={[styles.container,{justifyContent:'auto'}]}>
            <View style={styles.logoLogin}>
                <Image source={require('../images/logoLogin.png')} style={styles.logoLogin}></Image>
            </View>
            <LinearGradient style={styles.card} colors={['#FFCC66', '#FFFFCC', '#FFCC66']}
            start={{ x: 0.2, y: 0 }}
            end={{x: 1, y:1}}>
            <Text style={styles.heading}>{isLogin ? 'Login' : 'Signup'}</Text>
            <View style={styles.form}>
                <View style={styles.inputs}>
                    <TextInput style={styles.input} placeholder="Username" autoCapitalize="none" onChangeText={setUsername}></TextInput>
                    {!isLogin && <TextInput style={styles.input} placeholder="Name" onChangeText={setUsername}></TextInput>}
                    <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword}></TextInput>
                    <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
                    <LinearGradient
                    // Button Linear Gradient
                    colors={['#FF9933', '#FFCC00', '#FFCC66', '#FFCC00', '#FF9933']}
                    start={{ x: 0.9, y: 0.7 }}
                    end={{x: 0.1, y:0.3}}
                    style={styles.button}>
                    <TouchableOpacity style={styles.button} onPress={submitLogin}>
                        <Text style={styles.buttonText}>Submit</Text>
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
        </ImageBackground>
    );
}