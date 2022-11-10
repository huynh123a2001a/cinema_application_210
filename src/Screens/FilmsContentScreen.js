import { ActivityIndicator, Modal, Alert, Text, View,TouchableOpacity, Pressable,ScrollView, ImageBackground} from 'react-native';
import {React} from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../Css/pageCss';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import YoutubeIframe from "react-native-youtube-iframe";
import handleApp from '../Handle/setHandleApp.json';
import localhost from '../Route/configIP';
import { WebView } from 'react-native-webview';
export default function FilmsContentView({navigation, route})
{   
    
    const filmData=route.params;
    const [isLoading, setLoading] = useState(true);
    const [filmContentData, setFilmContentData] = useState([]);
    const [directorFilm, setDirectorFilm] = useState([]);
    console.disableYellowBox = true;
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
        handleApp.isLanguage==false?
            navigation.navigate('Chọn khu vực',filmData)
            :
            navigation.navigate('Choose branch',filmData)
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
                    <Text style={styles.textContentTitle}>{handleApp.isLanguage==false?route.params.filmName:route.params.filmName1} </Text>
                </ScrollView>
            </View>
            )}
            <View style={styles.filmContent}>
            {isLoading ? <ActivityIndicator style={{top:"10%"}}/> : (
                <ScrollView>
                    
                    <Text style={styles.titleContentText}>{handleApp.isLanguage==false?"Ngày khởi chiếu:":"Release Date:"}<Text style={styles.contentTextCard}>
                        {" "+route.params.releaseDate.substring(0,10)}
                    </Text></Text>
                    <Text style={styles.titleContentText}>{handleApp.isLanguage==false?"Tình trạng:":"Status:"}<Text style={styles.contentTextCard}>
                        {handleApp.isLanguage==false?route.params.status==1? " Đang chiếu": route.params.status==2?" Sắp chiếu":" Ngưng chiếu":route.params.status==1? " Paying": route.params.status==2?" Up comming":" End"}
                    </Text></Text>
                    <Text style={styles.titleContentText}>{handleApp.isLanguage==false?"Thể loại:":"Genre"}<Text style={styles.contentTextCard}>
                    {filmContentData.map((index)=> handleApp.isLanguage==false?" "+index.genreName.trim()+".":" "+index.genreName1.trim()+".")}
                    </Text></Text>
                    <Text style={styles.titleContentText}>{handleApp.isLanguage==false?"Thời lượng:":"Run time:"}<Text style={styles.contentTextCard}>
                        {" "+route.params.runtime}
                    </Text></Text>
                    <Text style={styles.titleContentText}>{handleApp.isLanguage==false?"Sản xuất:":"Director:"} <Text style={styles.contentTextCard}>
                        {directorFilm.map((index)=> index.directorName.trim())}
                    </Text></Text>
                    <Text style={styles.titleContentText}>{handleApp.isLanguage==false?"Nội dung phim:":"Film Description:"}<Text style={styles.contentTextCard}>
                        {handleApp.isLanguage==false?route.params.filmDescription:route.params.filmDescription1}
                    </Text></Text>
                </ScrollView>
                )}
            {isLoading ? <View style={{top:'15%',alignItems:"center"}}><Text style={{fontSize:20,fontWeight:'bold'}}>Loading...</Text></View> : (
            <View style={styles.alignBookTickets}>
                <TouchableOpacity onPress={() => bookTickets(filmData)}>
                    <View style={styles.bookTickets}>
                        <Text style={styles.textButton}>{handleApp.isLanguage==false?"Đặt vé ngay":"Booking now"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            )}
            </View>
        </LinearGradient>
    );
}
