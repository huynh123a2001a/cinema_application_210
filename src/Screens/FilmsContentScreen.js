import { StyleSheet, Modal, Alert, Text, View,TouchableOpacity, Pressable,ScrollView, ImageBackground} from 'react-native';
import {React} from 'react-native';
import { useState } from 'react';
import styles from '../Css/pageCss';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import YoutubeIframe from "react-native-youtube-iframe";
import { WebView } from 'react-native-webview';
export default function FilmsContentView({navigation, route})
{   
    const filmData=route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const videoID="oeRG9A6bDdY";
    function getData()
    {
        return console.log(route.params);
    }
    const bookTickets = (filmData) =>{
        console.log("ID Film: "+filmData.id)
        return navigation.navigate('Chọn khu vực',filmData);
    }
    /*oeRG9A6bDdY */
    function popupTrailer()
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
    return(
        <LinearGradient style={styles.filmContentIndex} colors={['#000066','#3300FF','#0099FF','#0099FF','#33CCFF', '#0099FF','#0099FF','#3300FF', '#000066']}
        start={{ x: 0.1, y: 0 }}
        end={{x: 0.7, y:1}}>
            {popupTrailer()}
            <ImageBackground style={styles.filmContentImage} source={{uri: (route.params.image)}}>        
                <TouchableOpacity style={styles.filmContentImagePlay} onPress={() => setModalVisible(true)}>    
                    <Ionicons name={"play-circle-outline"} size={100} color={"white"} />
                </TouchableOpacity>
            </ImageBackground>
            <View style={styles.filmContentTitle}>
                <ScrollView>
                    <Text style={styles.textContentTitle}>{route.params.nameFilm} </Text>
                </ScrollView>
            </View>
            <View style={styles.filmContent}>
                <ScrollView>
                    <Text style={styles.titleContentText}>Ngày khởi chiếu:<Text style={styles.contentTextCard}>{route.params.content}</Text></Text>
                    <Text style={styles.titleContentText}>Tình trạng:<Text style={styles.contentTextCard}>{route.params.content}</Text></Text>
                    <Text style={styles.titleContentText}>Thể loại:<Text style={styles.contentTextCard}>{route.params.content}</Text></Text>
                    <Text style={styles.titleContentText}>Thời lượng:<Text style={styles.contentTextCard}>{route.params.content}</Text></Text>
                    <Text style={styles.titleContentText}>Sản xuất:<Text style={styles.contentTextCard}>{route.params.content}</Text></Text>
                    <Text style={styles.titleContentText}>Nội dung phim:<Text style={styles.contentTextCard}>{route.params.content}abshjdbjhabdhjsabjdbsajhbdjhasbjdbasabshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahabshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahjdbajsabshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahjdbajsabshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahjdbajsabshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahjdbajsabshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahjdbajsabsabshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahjdbajsabshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahjdbajsabshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahjdbajsabshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahjdbajsabshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahjdbajsabshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahjdbajsabshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahjdbajsabshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahjdbajsabshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahjdbajsabshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahjdbajsabshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahjdbajsabshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahjdbajshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahjdbajsjdbajsabshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahjdbajsabshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahjdbajsabshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahjdbajsabshjdbjhabdhjsabjdbsajhbdjhasbjdbasjhbdsahjdbajsjhbdsahjdbajs</Text></Text>
                </ScrollView>
            <View style={styles.alignBookTickets}>
                <TouchableOpacity onPress={() => bookTickets(filmData)}>
                    <View style={styles.bookTickets}>
                        <Text style={styles.textButton}> Đặt vé ngay</Text>
                    </View>
                </TouchableOpacity>
            </View>
            </View>
           
        </LinearGradient>
    );
}
