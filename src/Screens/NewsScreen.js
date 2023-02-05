import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView, Image, Alert, Modal, Pressable } from 'react-native';
import { React } from 'react-native';
import styles from '../Css/pageCss';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import localhost from '../Route/configIP';
import handleApp from '../Handle/setHandleApp.json';
export default function NewsView() {
    const [isLoading, setLoading] = useState(true);
    const [newsData, setNewsData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalItem, setModalItem] = useState(0)
    const getNews = async () => {
        try {
            const response = await fetch(localhost() + "/news");
            const json = await response.json();
            setNewsData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getNews();
    }, []);
    function popupNews(id) {
        const dataShow = newsData.filter(item => item.newID == id)
        console.log(id);
        if (dataShow.length == 0) {
            return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }} >
                    <View style={[styles.popupTrailerCard]}>
                        <View style={[styles.modelPopupTrailer, { paddingBottom: 70 }]}>
                            <View style={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
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
        return (
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
                        <ImageBackground style={[styles.modelPopupTrailer, { paddingBottom: 70, maxWidth: '100%', maxHeight: '100%' }]} source={require('../images/christmasFlower.png')}>
                            <View style={{ width: "100%" }}>
                                <Image style={[styles.mainCard, { borderRadius: 10 }]} source={{
                                    uri: "" + dataShow.map(item => item.image) + ""
                                }}>
                                </Image>
                            </View>
                            <View style={{ alignItems: "center", justifyContent: 'center', marginTop: "5%" }}>
                                <Text style={styles.titleText}>{handleApp.isLanguage == false ? dataShow.map(item => item.newTitle) : dataShow.map(item => item.newTitle1)}</Text>
                            </View>
                            <Text style={{ marginTop: "5%", marginLeft: '5%', marginRight: '5%', fontWeight: 'bold' }}>{handleApp.isLanguage == false ? dataShow.map(item => item.newName) : dataShow.map(item => item.newName1)}</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.titleContentText}>Đóng</Text>
                            </Pressable>
                        </ImageBackground>
                    </View>
                </ScrollView>
            </Modal>
        );
    }
    function getCardNew(item) {
        return (
            <TouchableOpacity style={{ marginTop: '5%' }} onPress={() => { setModalVisible(true), setModalItem(item.newID) }} key={item.newID}>
                <View style={styles.mainCard}>
                    <View style={styles.imageNews}>
                        <Image style={styles.imageNews} source={{
                            uri: item.image
                        }}>
                        </Image>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <LinearGradient colors={['#FF6600', '#FF9900', '#FFCC66', '#FFFFCC', '#FFFFFF', '#FFFFCC', '#FFCC66', '#FF9900', '#FF6600']}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.7, y: 1 }} style={styles.linearBackground}>
            {isLoading ?
                <View style={{ alignItems: 'center', marginTop: '10%' }}>
                    <Image source={require('../images/iconLoading.gif')} style={{ maxWidth: '20%', maxHeight: '20%', display: 'block' }}></Image>
                    <Text style={{ marginTop: '5%', fontSize: 20, fontWeight: 'bold' }}> Loading...</Text>
                </View>
                :
                <View style={styles.indexStyle}>
                    <ScrollView>
                        {popupNews(modalItem)}
                        {newsData.map(item => getCardNew(item))}
                    </ScrollView>
                </View>}
        </LinearGradient>
    );
}