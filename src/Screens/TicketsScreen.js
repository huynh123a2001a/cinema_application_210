import { StyleSheet, Text, View,TouchableOpacity, TouchableHighlight, Image,ScrollView} from 'react-native';
import {React} from 'react-native';
import styles from '../Css/pageCss';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import localhost from '../Route/configIP'
import getChairTable from '../Handle/getChairs'
export default function TicketsView({navigation, route})
{   
  /*=================================================*/
  const getChairs = async () => {
    try {
        fetch(localhost()+"/chairs", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                 roomID: ticketsData.roomID,
            })
            }).then((response) => response.json())
            .then((responseData) => {
              setChairsData(responseData);
            })
            .then()
   } catch (error) {
     console.error(error);
   } finally {
    setLoading(false);
   }
  }
  useEffect(() => {
    getChairs();
  }, []);
 /*=================================================*/
 function getHidden(data)
 {
  chairsData.map(hiddenValue =>
    {
      if(hiddenValue.status==0)
        return data.push(hiddenValue.chairName.trim());
    }
  )
 } 
 /*=================================================*/
  const arrayString = ([""]);
  const arrayNumber = ([]);
  const hidden =[];
  const [isLoading, setLoading] = useState(true);
  const [chairsData, setChairsData] = useState([]);
  var chairs =([]);
  let xstatus = useState([]);
  const [statusC,setStatusC] = useState(0);
  const ticketsData = route.params;
  getChairTable(arrayString,arrayNumber,chairsData);
  getHidden(hidden);
  /*=================================================*/
  function arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value;
    });
  }
  /*=================================================*/
  function arrayFind(arr, value)
  {
    return arr.find(function(findvalue){
      if (value == findvalue)
      {
        return true;
      }
    })
  }
  /*=================================================*/
  const onFoodCombos = (chairs) =>{
    ticketsData.chairs=chairs;
    navigation.navigate("Phụ phẩm",ticketsData);
  }
  /*=================================================*/
  const setChair = (value) =>
    {
      xstatus=0;
      chairs.filter((values) => {
        if(values==value)
          {
            chairs = arrayRemove(chairs, value);
            xstatus=1;
          }
      })
      if(xstatus==0){
        chairs.push(value);
      }
      console.log(chairs)
    }
    /*=================================================*/
  function createArrayChair(number, numberz)
  {
    
    if(number === "")
    {
      return(
      <View key={"ArrayStart"+number} style={{backgroundColor:"white", width:"90%",height:"80%",alignItems:'center', justifyContent:'center', borderWidth:1 }}>
        <Text style={styles.titleText}>{numberz}</Text>
      </View>);
    }
    if(arrayFind(hidden,(numberz+number))!=null)
    {
      return(
      <View style={styles.hiddenChair}>
        <Text></Text>
      </View>
      )
    }
    return(
      <TouchableOpacity style={[styles.buttonChooseChair,{backgroundColor: "orange"}]}  onPress={()=> setChair((numberz+number))} key={numberz+number}>
        <Text style={styles.contentText}>
          {numberz+number}</Text>
      </TouchableOpacity>
    );
  }
  /*=================================================*/
    return(
        <LinearGradient colors={['#000077','#000088','#0000DD','#0000AA','#0000BB', '#0000AA','#0000DD','#000088', '#000077']}
        start={{ x: 0.1, y: 0 }}
        end={{x: 0.7, y:1}} style={styles.linearBackground}>
        <View style={{width:'100%',height:100, alignItems:'center', justifyContent:'center',borderBottomWidth:2}}>
          <Image source={require('../images/ScreenShow.png')} style={{maxWidth:'100%', maxHeight:120}} />
        </View>
        <ScrollView>
        <View style={{width:'auto',height:35, backgroundColor:'white', flexDirection:'row'}}>
    
          {
            arrayString.map((stringArray)=>
              <View key={"ArrayStart"+stringArray} style={{ alignItems:'center', justifyContent:'center',flex:1 ,borderWidth:1}}>
                <Text style={styles.titleText}>{stringArray}</Text>
              </View>
            )
          }
        </View>
        <View style={{flex:1,flexDirection:'row', width:'100%', height:35*arrayNumber.length, }}>
            {
              arrayString.map((number)=>
                <View style={{ flex:1,}} key ={number}>
                    {arrayNumber.map((numberz)=>
                      <View style={{flex:1, width:'100%', alignItems:'center', justifyContent:'center',}} key={numberz+number} >
                          {createArrayChair(number,numberz)}
                      </View>
                      )}
                    
                </View>
              )
            }
        </View>
        </ScrollView>
        <View style={{width:"100%", height:55, backgroundColor:"orange", borderWidth:1, alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity style={{width:"30%",height:"70%", backgroundColor:"white",borderWidth:1, alignItems:'center',justifyContent:'center'}} onPress={()=>onFoodCombos(chairs)}>
            <Text>
              Tiếp tục
            </Text>
          </TouchableOpacity>
        </View>
    </LinearGradient>
    );
}
