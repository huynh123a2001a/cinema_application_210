import { StyleSheet, Text, View,TouchableOpacity, TouchableHighlight, Image,ScrollView} from 'react-native';
import {React} from 'react-native';
import styles from '../Css/pageCss';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

export default function TicketsView({navigation, route})
{   
  var chairData= [];
  const [chairStatus, setChairStatus] = useState([{
    id,
    name:null,
  }]);
  const arrayString = ["","A","B","C","D","E"];
  const arrayNumber = [1,2,3,4,5,6,7,9];
  const hidden =["1A","1C","3E","1E","1G","2B","2D","2F","2H","3A","3C","3G","4B","4D","4F","4H"];
  let xstatus = useState([]);
  const [statusC,setStatusC] = useState(0);
  const ticketsData = route.params;
  function arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value;
    });
  }
  function arrayFind(arr, value)
  {
    return arr.find(function(findvalue){
      if (value == findvalue)
      {
        return true;
      }
    })
  }
  const onBill = (chairData) =>{
    ticketsData.chair=chairData;
    navigation.navigate("Thanh toán",ticketsData);
  }
  const setChair = (value) =>
    {
      xstatus=0;
      chairData.filter((values) => {
        if(values==value)
          {
            chairData = arrayRemove(chairData, value);
            xstatus=1;
          }
      })
      if(xstatus==0){
      chairData.push(value);
      }
      console.log();
    }
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
          <TouchableOpacity style={{width:250,height:30, backgroundColor:"white",borderWidth:1, alignItems:'center',justifyContent:'center'}} onPress={()=>onBill(chairData)}>
            <Text>
              Thông tin thanh toán: {statusC}
            </Text>
          </TouchableOpacity>
        </View>
    </LinearGradient>
    );
}
