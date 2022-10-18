import { StyleSheet, Text, View, TouchableOpacity, Animated, Input, ScrollView, Image } from 'react-native';
import {React} from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../Css/pageCss';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button } from 'react-native-paper';
export default function FilmsView({navigation})
{   
    const  filmsContent = [
        {
            id:1,
            nameFilm: "AVATAR 2",
            releaseDate:"12/12/2022",
            status:1,
            runTime:163,
            rate:3.2,
            image:"https://ss-images.saostar.vn/w800/2020/05/29/7555433/z.jpg",
            content:"Đây là thông tin phim 1",
            branchId:null,
        },
        {
            id:2,
            nameFilm: "AVATAR 3",
            releaseDate:"12/12/2021",
            status:1,
            runTime:123,
            rate:4.2,
            image:"https://ss-images.saostar.vn/w800/2020/05/29/7555433/z.jpg",
            content:"Đây là thông tin phim 2",
            branchId:null,
        },
    ]
    const showFilmsContent = (data) =>{
        return navigation.navigate("Thông tin phim",data);
    }
    const getFilmsData = () =>{

        return(

        filmsContent.map((data)=>(
        <TouchableOpacity style={styles.filmsCard} key={data.id} onPress={()=>showFilmsContent(data)}>
        <Image style={styles.topFilmsCard} source={{
            uri: (data.image)}}>
        </Image>
        <View style={styles.bottomFilmsCard}>
            <View style={styles.itemBottomCard}>
                <View style={styles.titleTextCard}>
                    <ScrollView>
                        <Text style={styles.titleText}>{data.nameFilm}</Text>
                    </ScrollView>
                </View>
                <Text style={styles.titleContentText}>
                    Ngày khởi chiếu: 
                    <Text style={styles.contentTextCard}> {data.releaseDate}</Text>    
                </Text>
                <Text style={styles.titleContentText}>
                    Trạng thái: 
                    <Text style={styles.contentTextCard}>{data.status == 1?"Đang chiếu":"Sắp chiếu"}</Text>    
                </Text>
                <Text style={styles.titleContentText}>
                    Thời lượng: 
                    <Text style={styles.contentTextCard}> {data.runTime}</Text>    
                </Text>
                <Text style={styles.titleContentText}>
                    Đánh giá: 
                    <Text style={styles.contentTextCard}> {data.rate}/5</Text>    
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
            {getFilmsData()}
        </View>
        </ScrollView>
      </LinearGradient>
    );
}
