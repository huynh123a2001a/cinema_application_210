import { StyleSheet, Text, View,TouchableOpacity, ScrollView} from 'react-native';
import {React} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../Css/pageCss';
export default function BillView({navigation,route}){
    const billData = route.params;
    console.log(billData);
    return (
        <View style={{width:"100%",height:"100%", alignItems:"center"}}>
            <Text>Thông tin thanh toán</Text>
            <View style={{ alignItems:'center', justifyContent:'center', width:"100%",height:"100%" }}>
            <Text>Tên phim: {billData.nameFilm} </Text>
            <Text>Địa chỉ/Chi nhánh: {billData.branchName} </Text>
            <Text>Thời gian: {billData.showTime} </Text>
            <Text>Room: Auto </Text>
            <Text>Ghế: {billData.chair.map(index=><Text style={{fontWeight:"bold"}} key={index}> {index}</Text>)} </Text>
            <Text>Tổng số ghế: {billData.chair.length} </Text>
            <Text>Giá mỗi ghế: 75.000</Text>
            <Text style={{fontWeight:'bold'}}>Tổng: {75000*(billData.chair.length)}</Text>
            </View>
        </View>

    )
}