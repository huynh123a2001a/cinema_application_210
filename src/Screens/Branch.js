import {Image, Text, View,TouchableOpacity, ScrollView} from 'react-native';
import {React} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../Css/pageCss';
import { useState,useEffect } from 'react';
import localhost from '../Route/configIP';
import handleApp from '../Handle/setHandleApp.json';
export default function BranchView({navigation, route})
{
    const routeData = route.params;
    const [isLoading, setLoading] = useState(true);
    const [branchsData, setBranchsData] = useState([]);
    const getBranchs = async () => {
        try {
         const response = await fetch(localhost()+"/branchs/"+routeData.filmID+"");
         const json = await response.json();
         setBranchsData(json);
       } catch (error) {
         console.error(error);
       } finally {
         setLoading(false);
       }
     }
     useEffect(() => {
        getBranchs();
     }, []);
    
    function onShowTimeScreen(id,name,addressID, addressName)
    {   
        routeData.cinemaID=id;
        routeData.cinemaName=name;
        routeData.addressID=addressID;
        routeData.addressName=addressName;
        handleApp.isLanguage==false?
            navigation.navigate("Lịch chiếu", routeData)
            :
            navigation.navigate("Schedules", routeData)
    }
    function showBranch(branchsData)
    {
        return(
        branchsData.map((datashow)=>
            <TouchableOpacity key={datashow.cinemaID} style={[styles.showTimesCard,{height: 100}]} onPress={() => handleApp.isLanguage==false?onShowTimeScreen(datashow.cinemaID,datashow.cinemaName,datashow.addressID,datashow.addressName):onShowTimeScreen(datashow.cinemaID,datashow.cinemaName1,datashow.addressID,datashow.addressName1)}>
               <View style={styles.branchName}>
                    <Text style={styles.textBranchName}>{handleApp.isLanguage==false?datashow.cinemaName:datashow.cinemaName1}</Text>
               </View>
            </TouchableOpacity>
        )
        )
    }
    return(
        <LinearGradient style={styles.filmContentIndex} colors={['#000066','#3300FF','#0099FF','#0099FF','#33CCFF', '#0099FF','#0099FF','#3300FF', '#000066']}
        start={{ x: 0.1, y: 0 }}
        end={{x: 0.7, y:1}}>
            <ScrollView>
                {isLoading? 
                <View style={{alignItems:'center',marginTop:'10%'}}>
                <Image source={require('../images/iconLoading.gif')} style={{ maxWidth:'20%',maxHeight:'20%', display:'block'}}></Image>
                <Text style={{marginTop:'5%', fontSize:20,fontWeight:'bold'}}> Loading...</Text>
                </View>
                : showBranch(branchsData)}
            </ScrollView>
        </LinearGradient>
    );
}