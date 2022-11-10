import { StyleSheet, Text, View, TouchableOpacity, Animated, ActivityIndicator, ScrollView, Image } from 'react-native';
import {React} from 'react-native';
import { useState,useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../Css/pageCss';
import handleApp from '../Handle/setHandleApp.json';
import localhost from '../Route/configIP'
export default function AdminHomePage({navigation})
{   const [isLoading, setLoading] = useState(true);
    const [filmsData, setFilmsData] = useState([]);
    const [language, setLanguage] = useState(handleApp.isLanguage)
    
    return(
      <LinearGradient colors={['#663399','#CC33FF','#CC66FF','#FFCCFF','#FFFFFF', '#FFCCFF','#CC66FF','#CC33FF', '#663399']}
        start={{ x: 0.1, y: 0 }}
        end={{x: 0.7, y:1}} style={styles.linearBackground}>
      <ScrollView>
        <View style={styles.indexStyle}>
        {isLoading ? <View style={{alignItems:'center',marginTop:'10%'}}>
        <Image source={require('../images/iconLoading.gif')} style={{ maxWidth:'20%',maxHeight:'20%', display:'block'}}></Image>
        <Text style={{marginTop:'5%', fontSize:20,fontWeight:'bold'}}> Loading...</Text>
        </View> :<View></View> }
        </View>
        </ScrollView>
      </LinearGradient>
    );
}
//
