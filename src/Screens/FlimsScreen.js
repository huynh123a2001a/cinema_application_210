import { StyleSheet, Text, View, TouchableOpacity, Animated, ActivityIndicator, ScrollView, Image } from 'react-native';
import {React} from 'react-native';
import { useState,useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../Css/pageCss';
import handleApp from '../Handle/setHandleApp.json'
import localhost from '../Route/configIP'
export default function FilmsView({navigation})
{   const [isLoading, setLoading] = useState(true);
    const [filmsData, setFilmsData] = useState([]);
    const getFilms = async () => {
        try {
         const response = await fetch(localhost()+"/films");
         const json = await response.json();
         setFilmsData(json);
       } catch (error) {
         console.error(error);
       } finally {
         setLoading(false);
       }
     }
     useEffect(() => {
        getFilms();
     }, []);
    const showFilmsContent = (data) =>{

        navigation.navigate("Thông tin phim",data)
    }
    const getFilmsData = () =>{

        return(

        filmsData.map((data)=>(
        <TouchableOpacity style={styles.filmsCard} key={data.filmID} onPress={()=>showFilmsContent(data)}>
        <Image style={styles.topFilmsCard} source={{
            uri: (data.image.trim())}}>
        </Image>
        <View style={styles.bottomFilmsCard}>
            <View style={styles.itemBottomCard}>
                <View style={[styles.titleTextCard,{position:"relative",}]}>
                    <Text style={{fontWeight:'bold', fontSize:16}}>{handleApp.isLanguage?data.filmName1:data.filmName}</Text>
                </View>
                <Text style={styles.titleContentText}>
                    {handleApp.isLanguage?"Realse date: ":"Ngày khởi chiếu: "}
                    <Text style={styles.contentTextCard}> {data.releaseDate.substring(0,10)}</Text>    
                </Text>
                <Text style={styles.titleContentText}>
                    {handleApp.isLanguage?"Status: ":"Trạng thái: "}
                    <Text style={styles.contentTextCard}>{handleApp.isLanguage?data.status == 1?"Playing":"Up coming": data.status == 1?"Đang chiếu":"Sắp chiếu"}</Text>    
                </Text>
                <Text style={styles.titleContentText}>
                    {handleApp.isLanguage?"Run time: ":"Thời lượng: "}
                    <Text style={styles.contentTextCard}> {data.runtime}</Text>    
                </Text>
                <Text style={styles.titleContentText}>
                    {handleApp.isLanguage?"Rate":"Đánh giá"}
                    <Text style={styles.contentTextCard}> {handleApp.isLanguage? data.rated?data.rated+"/5":"There are no reviews yet":data.rated?data.rated+"/5":"Chưa có đánh giá"}</Text>    
                </Text>
            </View>
            <View style={styles.otherContent}>
                <Text style={styles.otherContentText}>
                    Nhấn vào để xem thông tin chi tiết và đặt vé
                </Text>
            </View>
        </View>
    </TouchableOpacity>
    )));
    }
    return(
      <LinearGradient colors={['#663399','#CC33FF','#CC66FF','#FFCCFF','#FFFFFF', '#FFCCFF','#CC66FF','#CC33FF', '#663399']}
        start={{ x: 0.1, y: 0 }}
        end={{x: 0.7, y:1}} style={styles.linearBackground}>
      <ScrollView>
        <View style={styles.indexStyle}>
        {isLoading ? <View style={{alignItems:'center',marginTop:'10%'}}>
        <Image source={require('../images/iconLoading.gif')} style={{ maxWidth:'20%',maxHeight:'20%', display:'block'}}></Image>
        <Text style={{marginTop:'5%', fontSize:20,fontWeight:'bold'}}> Loading...</Text>
        </View> : (
            getFilmsData()
        )}
        </View>
        </ScrollView>
      </LinearGradient>
    );
}
//
