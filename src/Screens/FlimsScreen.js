import { TextInput, Text, View, TouchableOpacity, Animated, ActivityIndicator, ScrollView, Image } from 'react-native';
import { React } from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../Css/pageCss';
import handleApp from '../Handle/setHandleApp.json';
import customDateTime from '../Handle/customDateTime';
import localhost from '../Route/configIP';
import { Ionicons } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list';
export default function FilmsView({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [filmsData, setFilmsData] = useState([]);
    const [language, setLanguage] = useState(handleApp.isLanguage);
    const [sort, setSort] = useState(1);
    const [selected, setSelected] = useState("");
    console.disableYellowBox = true;
    const data = [{key:0, value:handleApp.isLanguage==false?"Tất cả":"All"}]
    filmsData.filter(item => data.push({ key: item.filmID, value: handleApp.isLanguage == false ? item.filmName : item.filmName1 }))
    const getFilms = async () => {
        try {
            const response = await fetch(localhost() + "/films");
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
    const showFilmsContent = (data) => {
        handleApp.isLanguage == false ?
            navigation.navigate("Thông tin phim", data)
            :
            navigation.navigate("Film detail", data)
    }
    const sortFilm = (value, data) => {
        console.log(selected)
        return (
            <View>
                {
                    value == ""|| value=="All" || value=="Tất cả"?
                        data.map(item => {
                            if (item.status == 1) {
                                return <View key={item.filmID}>{getFilmsData(item)}</View>
                            }
                        })
                        :
                        data.map(item => {
                            if (item.filmName == value || item.filmName1 == value) {
                                return <View key={item.filmID}>{getFilmsData(item)}</View>
                            }
                        })

                }
            </View>
        )
    }
    const getFilmsData = (data) => {
        return (
            <TouchableOpacity style={styles.filmsCard} key={data.filmID} onPress={() => showFilmsContent(data)}>
                <Image style={styles.topFilmsCard} source={{
                    uri: (data.image.trim())
                }}>
                </Image>
                <View style={styles.bottomFilmsCard}>
                    <View style={styles.itemBottomCard}>
                        <View style={[styles.titleTextCard, { position: "relative", }]}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{handleApp.isLanguage ? data.filmName1 : data.filmName}</Text>
                        </View>
                        <Text style={styles.titleContentText}>
                            {handleApp.isLanguage ? "Realse date: " : "Ngày khởi chiếu: "}
                            <Text style={styles.contentTextCard}> {customDateTime(data.releaseDate).date}</Text>
                        </Text>
                        <Text style={styles.titleContentText}>
                            {handleApp.isLanguage ? "Status: " : "Trạng thái: "}
                            <Text style={styles.contentTextCard}>{handleApp.isLanguage ? data.status == 1 ? "Playing" : "Up coming" : data.status == 1 ? "Đang chiếu" : "Sắp chiếu"}</Text>
                        </Text>
                        <Text style={styles.titleContentText}>
                            {handleApp.isLanguage ? "Run time: " : "Thời lượng: "}
                            <Text style={styles.contentTextCard}> {data.runtime}</Text>
                        </Text>
                        <Text style={styles.titleContentText}>
                            {handleApp.isLanguage ? "Rate" : "Đánh giá"}
                            <Text style={styles.contentTextCard}> {handleApp.isLanguage ? data.rated ? data.rated + "/5" : "There are no reviews yet" : data.rated ? data.rated + "/5" : "Chưa có đánh giá"}</Text>
                        </Text>
                    </View>
                    <View style={styles.otherContent}>
                        <Text style={styles.otherContentText}>
                            {handleApp.isLanguage == false ? "Nhấn vào để xem chi tiết và đặt vé" : "Click to view details and booking"}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    return (
        <LinearGradient colors={['#333399', '#3333FF', '#0099FF', '#99FFFF', '#FFFFFF', '#99FFFF', '#0099FF', '#3333FF', '#333399']}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.7, y: 1 }} style={styles.linearBackground}>
            <ScrollView>
                <SelectList
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save="value"
                    inputStyles={{ color: 'white', fontWeight: 'bold' }}
                    dropdownStyles={{ backgroundColor: '#333366', borderColor: null, width: '94%', marginLeft: '3%', borderWidth: 0.5, borderColor: 'white' }}
                    dropdownTextStyles={{ color: 'white', fontWeight: 'bold' }}
                    boxStyles={{ backgroundColor: '#333366', marginTop: '5%', borderRadius: 15, borderColor: null, width: '94%', marginLeft: '3%' }}
                    searchicon={<Ionicons name={"search-outline"} size={20} color={"white"} />}
                    arrowicon={<Ionicons name={"chevron-down-circle-outline"} size={20} color={"white"} />}
                    closeicon={<Ionicons name={"close-circle-outline"} size={20} color={"white"} />}
                    defaultOption={{ key: null, value: handleApp.isLanguage == false ? "Tìm kiếm" : "Search" }}
                    searchPlaceholder={handleApp.isLanguage == false ? "Tìm kiếm" : "Search"}
                />
                {/* 
            <View style={{marginLeft:2,width: "100%", height:"100%", backgroundColor:'#333366', borderWidth:'1', borderTopLeftRadius:30, borderBottomLeftRadius:30, flexDirection:'row'}}>
                <TouchableOpacity style={{marginLeft:'5%',flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Ionicons name={"search-outline"} size={25} color={"white"} />grid-outline
                </TouchableOpacity>
                <View style={{flex:6, justifyContent:'center'}}>
                    <View style={{backgroundColor:'white', height:'70%', width:"90%",borderRadius:30}}>
                        <TextInput style={{width:'90%', height:'100%', marginLeft:'5%', marginRight:'5%'}}>

                        </TextInput>
                    </View>
                </View>
                <SelectList style={{flex:1, alignItems:'center', justifyContent:'center'}} data={data} save="value" setSelected={(val) => setSelected(val)}>
                    <Ionicons name={"grid-outline"} size={25} color={"white"} />
                </SelectList>
            </View>
        </View> */}
                <View style={styles.indexStyle}>
                    {isLoading ? 
                    <View style={{ alignItems: 'center', marginTop: '10%' }}>
                        <Image source={require('../images/iconLoading.gif')} style={{ maxWidth: '20%', maxHeight: '20%', display: 'block' }}></Image>
                        <Text style={{ marginTop: '5%', fontSize: 20, fontWeight: 'bold' }}> Loading...</Text>
                    </View> : (
                        sortFilm(selected, filmsData)
                    )}
                </View>
            </ScrollView>
        </LinearGradient>
    );
}
//
