import { StyleSheet,Modal, Text, View, TouchableOpacity, Animated, Button, ScrollView, Image,Pressable } from 'react-native';
import {React, DrawerActions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../Css/pageCss';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import YoutubeIframe from "react-native-youtube-iframe";
import { WebView } from 'react-native-webview';
const Tab = createBottomTabNavigator();
export default function IndexView({navigation})
{   
    const dataIndex =[{
        id:1,
        image:"https://cdn.galaxycine.vn/media/2022/9/21/glx-vani-1200x1800_1663745251301.jpg",
        title:"Scan QR nhận ngay ưu đãi 40 cành trên giá vé",
        content:"Khi khách hàng đặt vé tại rạp và sử dụng Scan QR để thanh toán sẽ nhận được ưu đãi lên đến 40.000 giảm trên giá vé tại Cinema210, ưu đãi đến hết ngày 31/12/2022, nhanh tay scan ngay, xem phim thả ga cùng CINEMA210."
    },
    {
        id:2,
        image:"https://cdn.galaxycine.vn/media/2022/9/30/glx-1200x1800_1664522674465.jpg",
        title:"Bạn mới bạn cũ bạn nào cũng giảm",
        content:"Ưu đãi ngay cho khách hàng khi thanh toán qua ZaloPay, giảm 9.000/1 vé cho khách hàng thanh toán lần đầu trên ZaloPay và giảm 25.000/1 vé cho khách hàng đã từng thanh toán trên ZaloPay ( Mỗi ưu đãi chỉ áp dụng một lần duy nhất cho mỗi tài khoản, khách hàng)."
    }   
    ]
    const [ID,setID]= useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    function popupTrailer(id)
    {
        const dataShow = dataIndex.filter(item => item.id == id)
        if(dataShow.length==0)
        {
            return(
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }} >
                <View style={styles.popupTrailerCard}>
                    <View style={[styles.modelPopupTrailer,{paddingBottom:70}]}>
                        <View style={{alignItems:"center",justifyContent:"center",width:"100%",height:"100%"}}>
                            <Text style={styles.titleText}>Không có dữ liệu</Text>
                        </View>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.titleContentText}>Đóng</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            );
        }
        return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
            <ScrollView>
                <View style={styles.popupTrailerCard}>
                    <View style={[styles.modelPopupTrailer,{paddingBottom:70}]}>
                        <View style={{width:"100%"}}>
                        <Image style={[styles.mainCard,{borderRadius:10}]} source={{
                            uri:""+dataShow.map(item => item.image)+""}}>
                        </Image>
                        </View>
                        <View style={{alignItems:"center",justifyContent:'center', marginTop:"5%"}}>
                            <Text style={styles.titleText}>{dataShow.map(item => item.title)}</Text>
                        </View>
                        <Text style={{marginTop:"5%"}}>{dataShow.map(item => item.content)}</Text>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.titleContentText}>Đóng</Text>
                        </Pressable>
                    </View>
                </View>
                </ScrollView>
            </Modal>
        );
    }
    /*-------------------------------*/
    /*-------------------------------*/
    return (
        <LinearGradient colors={['#663399','#CC33FF','#CC66FF','#FFCCFF','#FFFFFF', '#FFCCFF','#CC66FF','#CC33FF', '#663399']}
        start={{ x: 0.1, y: 0 }}
        end={{x: 0.7, y:1}} style={styles.linearBackground}>
            {popupTrailer(ID)}
            <ScrollView>
                <View style={styles.indexStyle}>
                    <TouchableOpacity onPress={() => {setModalVisible(true), setID(1)}} >
                    <Image style={styles.mainCard} source={{
                            uri: "https://cdn.galaxycine.vn/media/2022/9/21/glx-vani-1200x1800_1663745251301.jpg"}}>
                    </Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setModalVisible(true), setID(2)}} >
                    <Image style={styles.mainCard} source={{
                            uri: "https://cdn.galaxycine.vn/media/2022/9/30/glx-1200x1800_1664522674465.jpg"}}>
                    </Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setModalVisible(true), setID(3)}} >
                    <Image style={styles.mainCard} source={{
                            uri: "https://cdn.galaxycine.vn/media/2022/9/29/shopee-2909-1200x1800_1664439479347.jpg"}}>
                    </Image>
                    </TouchableOpacity>
                    <Image style={styles.mainCard} source={{
                            uri: "https://cdn.galaxycine.vn/media/2022/9/21/nta-t10-2022-digital-300x450_1663733622961.jpg"}}>
                    </Image>
                    <Image style={styles.mainCard} source={{
                            uri: "https://cdn.galaxycine.vn/media/2022/3/22/300x450-1_1647919893827.jpg"}}>
                    </Image>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}