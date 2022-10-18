import { StyleSheet, Modal, Alert, Text, View,TouchableOpacity, Pressable,ScrollView, ImageBackground} from 'react-native';
import {React} from 'react-native';
import { useState } from 'react';
import styles from '../Css/pageCss';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import YoutubeIframe from "react-native-youtube-iframe";
import { WebView } from 'react-native-webview';
export default function popupTrailer(videoID)
{
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
            <View style={styles.popupTrailerCard}>
                <View style={styles.modelPopupTrailer}>
                    
                    <View style={styles.videoTrailer}>
                    <WebView
                        source={{html: '<iframe width="100%" height="60%" style="border:4px solid black;" src="https://www.youtube.com/embed/'+videoID+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'}}                            
                    />
                    </View>
                    <Text style={styles.titleText}>{route.params.nameFilm}  Trailer</Text>
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