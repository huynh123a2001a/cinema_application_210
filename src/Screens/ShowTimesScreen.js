import { StyleSheet, Text, View,TouchableOpacity, Image,ScrollView, Table, Row} from 'react-native';
import {React} from 'react-native';
import styles from '../Css/pageCss';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { DataTable } from 'react-native-paper';
export default function ShowTimesView ({navigation, route})
{   

    const showTimeData = route.params;
    const dataTables=[
        {
            id:1,
            idFilm:1,
            idBranch:1,
            idRoom:1,
            showTime:"11:30",

        },
        {
            id:2,
            idFilm:1,
            idRoom:1,
            idBranch:1,
            showTime:"12:30",

        },
        {
            id:3,
            idFilm:1,
            idRoom:1,
            idBranch:2,
            showTime:"13:30",

        },
        {
            id:4,
            idFilm:1,
            idRoom:2,
            idBranch:1,
            showTime:"14:30",

        },
        {
            id:5,
            idFilm:2,
            idRoom:2,
            idBranch:2,
            showTime:"15:30",

        },
        {
            id:6,
            idFilm:2,
            idRoom:2,
            idBranch:2,
            showTime:"16:30",
        },
        {
            id:7,
            idFilm:2,
            idRoom:2,
            idBranch:2,
            showTime:"15:30",

        },
        {
            id:8,
            idFilm:2,
            idRoom:2,
            idBranch:2,
            showTime:"16:30",
        },
        {
            id:9,
            idFilm:2,
            idRoom:2,
            idBranch:2,
            showTime:"15:30",

        },
        {
            id:10,
            idFilm:2,
            idRoom:2,
            idBranch:2,
            showTime:"16:30",
        }
    ]
    const getChair = (id,number) =>
    {   
        showTimeData.showTimeId=id;
        showTimeData.showTime=number;
        console.log("ShowtimeID: "+ showTimeData.showTimeId);
        return navigation.navigate("Tickets",showTimeData);
    }
    const getCardFilm=(branchId)=>{
        const getDataTables = dataTables.filter(data => data.idBranch==branchId)
        if (getDataTables.length==0)
        return(
            <View style={{justifyContent:'center',alignItems:'center', width:"100%",height:"100%"}}>
                <Text style={{fontWeight:'bold', fontSize:20}}>Địa chỉ hiện tại không có lịch chiếu</Text>
            </View>
        )
        return(
            <View style={{width:"100%", height:"100%",}}>
            <View style={styles.showTimesCard}>
            <LinearGradient style={styles.showTimesCinema} colors={['#8B6914','#B8860B','#CD950C','#DAA520','#CDAD00','#FFFF00']}
                start={{ x: 0, y: 0 }}
                end={{x: 1, y:1}}>
                    <Text style={styles.textShowTimesCinema}>Cinema 210: {"Bình Thạnh"}</Text>
                </LinearGradient>
                <View style={styles.showTimes}>
                    <View style={styles.showTimesTitle}>
                        <Text style={styles.textShowTimesTitle}> 2D Phụ đề</Text>
                    </View>
                    <View style={styles.showTimesContent}>
                        <ScrollView>
                            {getTableShowTimes(getDataTables)}
                        </ScrollView>
                    </View>
                </View>
            </View>
            <View style={styles.showTimesCard}>
            <LinearGradient style={styles.showTimesCinema} colors={['#8B6914','#B8860B','#CD950C','#DAA520','#CDAD00','#FFFF00']}
                start={{ x: 0, y: 0 }}
                end={{x: 1, y:1}}>
                    <Text style={styles.textShowTimesCinema}>Cinema 210: {"Bình Thạnh"}</Text>
                </LinearGradient>
                <View style={styles.showTimes}>
                    <View style={styles.showTimesTitle}>
                        <Text style={styles.textShowTimesTitle}> 2D Lồng tiếng</Text>
                    </View>
                    <View style={styles.showTimesContent}>
                        <ScrollView>
                            {getTableShowTimes(getDataTables)}
                        </ScrollView>
                    </View>
                </View>
            </View>
            </View>
        )
    }
    const getColumnShowTimes = (number,id) =>
    {
        return(
                <TouchableOpacity key={id} onPress={()=>getChair(id,number)} >
                    <View style={styles.buttonShowTimes}>
                        <Text style={styles.textContentShowTimes}>
                            {number}:{id}
                        </Text>
                    </View>
                </TouchableOpacity>
        );
    }
    const getTableShowTimes = (getDataTables)=>
    {
        const getTable = [];
        var getColumns =[];
        let keycolumn=0;
        
        for (let i =0; i<getDataTables.length;i++)
        {
            if(i!=0 && i%3==0)
            {
                getTable.push(getColumns);
                getColumns=[];
            }
            getColumns.push({name:getDataTables[i].showTime, id:getDataTables[i].id})
            if(i==getDataTables.length-1 && getColumns.length > 0)
            {
                getTable.push(getColumns);
            }
        }
        return(
            getTable.map((index) =>
                <View style={styles.boxContent} key= {keycolumn++}>
                    {
                    index.map((item) =>
                        <Text key={item.id}>{getColumnShowTimes(item.name,item.id)}</Text>
                    )
                    }
                </View>
            )
        );
    }
    
    return(
        <LinearGradient style={styles.filmContentIndex} colors={['#000066','#3300FF','#0099FF','#0099FF','#33CCFF', '#0099FF','#0099FF','#3300FF', '#000066']}
        start={{ x: 0.1, y: 0 }}
        end={{x: 0.7, y:1}}>
            <ScrollView>
                {getCardFilm(showTimeData.branchId)}
            </ScrollView>
        </LinearGradient>
    );
}
