import { ActivityIndicator, Modal, Alert, Text, View,TouchableOpacity, Pressable,ScrollView, ImageBackground} from 'react-native';
import {React} from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../Css/pageCss';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import YoutubeIframe from "react-native-youtube-iframe";
import localhost from '../Route/configIP';
import { WebView } from 'react-native-webview';
export default function FilmsContentView({navigation, route})
{   
    const filmData=route.params;
    const [isLoading, setLoading] = useState(true);
    const [filmContentData, setFilmContentData] = useState([]);
    const [directorFilm, setDirectorFilm] = useState([]);
    const getFilmContent = async () => {
        try {
         console.log(filmData.filmID);
         const responseContent = await fetch(localhost()+"/films/"+filmData.filmID);
         const jsonContent = await responseContent.json();
         setFilmContentData(jsonContent);
         const responseDirector = await fetch(localhost()+"/directors/"+filmData.filmID);
         const jsonDirector = await responseDirector.json();
         setDirectorFilm(jsonDirector);
       } catch (error) {
         console.error(error);
       } finally {
         setLoading(false);
       }
     }
     useEffect(() => {
        getFilmContent();
     }, []);

    const [modalVisible, setModalVisible] = useState(false);
    let videoID="";
    try{
        videoID=route.params.urlTrailer.trim();
    }
    catch(err)
    {
        console.log(err)
    }
    const bookTickets = (filmData) =>{
        console.log("ID Film: "+filmData.filmID)
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
                        <ScrollView>
                        <View style={{justifyContent:'center', alignItems:'center', top:'5%'}}>
                        <Text style={styles.titleText}>Trailer{route.params.filmName}</Text>
                        </View>
                        <View style={[styles.videoTrailer,{top:'10%'}]}>
                        <WebView
                            source={{html: '<iframe width="100%" height="60%" style="border:4px solid black;" src="https://www.youtube.com/embed/'+videoID+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'}}                            
                        />
                        </View>
                        <View style={{width:"100%",height:"auto", alignItems:'center'}}>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.titleContentText}>Đóng</Text>
                        </Pressable>
                        </View>
                        </ScrollView>
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
            <ImageBackground style={styles.filmContentImage} source={{uri: (route.params.image.trim())}}>        
                <TouchableOpacity style={styles.filmContentImagePlay} onPress={() => setModalVisible(true)}>    
                    <Ionicons name={"play-circle-outline"} size={100} color={"white"} />
                </TouchableOpacity>
            </ImageBackground>
            {isLoading? '' : (
            <View style={styles.filmContentTitle}>
                <ScrollView>
                    <Text style={styles.textContentTitle}>{route.params.filmName} </Text>
                </ScrollView>
            </View>
            )}
            <View style={styles.filmContent}>
            {isLoading ? <ActivityIndicator style={{top:"10%"}}/> : (
                <ScrollView>
                    
                    <Text style={styles.titleContentText}>Ngày khởi chiếu:<Text style={styles.contentTextCard}>
                        {" "+route.params.releaseDate.substring(0,10)}
                    </Text></Text>
                    <Text style={styles.titleContentText}>Tình trạng:<Text style={styles.contentTextCard}>
                        {route.params.status==1? " Đang chiếu": route.params.status==2?" Sắp chiếu":" Ngưng chiếu"}
                    </Text></Text>
                    <Text style={styles.titleContentText}>Thể loại:<Text style={styles.contentTextCard}>
                    {filmContentData.map((index)=> " "+index.genreName.trim()+".")}
                    </Text></Text>
                    <Text style={styles.titleContentText}>Thời lượng:<Text style={styles.contentTextCard}>
                        {" "+route.params.runtime}
                    </Text></Text>
                    <Text style={styles.titleContentText}>Sản xuất: <Text style={styles.contentTextCard}>
                        {directorFilm.map((index)=> index.directorName.trim())}
                    </Text></Text>
                    <Text style={styles.titleContentText}>Nội dung phim:<Text style={styles.contentTextCard}>
                        {route.params.filmDescription}
                    </Text></Text>
                </ScrollView>
                )}
            {isLoading ? <View style={{top:'15%',alignItems:"center"}}><Text style={{fontSize:20,fontWeight:'bold'}}>Loading...</Text></View> : (
            <View style={styles.alignBookTickets}>
                <TouchableOpacity onPress={() => bookTickets(filmData)}>
                    <View style={styles.bookTickets}>
                        <Text style={styles.textButton}> Đặt vé ngay</Text>
                    </View>
                </TouchableOpacity>
            </View>
            )}
            </View>
        </LinearGradient>
    );
}
