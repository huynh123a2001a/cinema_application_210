import { StyleSheet, Text, View,TouchableOpacity, TouchableHighlight, Alert, Image,ScrollView} from 'react-native';
import {React} from 'react-native';
import styles from '../Css/pageCss';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import localhost from '../Route/configIP'
import getChairTable from '../Handle/getChairs';
import handleApp from '../Handle/setHandleApp.json';
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
  const messageArlert = (value) =>
    {
        handleApp.isLanguage==false?
        Alert.alert(
        "Thông báo",
        value
        )
        :
        Alert.alert(
          "Notify",
          value
          )
    }
  useEffect(() => {
    getChairs();
  }, []);
  const countChairs = (value) =>{
    if(count >= 8)
      return messageArlert("Có thể chọn tối đa 8 ghế");
    item.status=3
    setCount(count + 1)
  }
 /*=================================================*/
  const setChair = (value) =>
    {
      chairsData.filter(item => item.chairName == value?item.status==1?count>=8?messageArlert("Có thể chọn tối đa 8 ghế"):(item.status=3,setCount(count + 1)):(item.status=1,setCount(count - 1)):'')
    }
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
  console.disableYellowBox = true;
  const arrayString = ([""]);
  const arrayNumber = ([]);
  const hidden =[];
  const [isLoading, setLoading] = useState(true);
  const [chairsData, setChairsData] = useState([]);
  var chairs =([]);
  const [count, setCount] = useState(0);
  var [ isPress, setIsPress ] = useState(false);
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
  function statusFind(listUseState, value)
  {
    return listUseState.find(function(findvalue){
      if (value == findvalue.chairName)
      {
        return findvalue;
      }
    })
  }
  /*=================================================*/
  const onFoodCombos = () =>{
    try{
    ticketsData.chairs=[];
    chairsData.filter(item => item.status==3?ticketsData.chairs.push(item.chairName):'')
    if(ticketsData.chairs.length<1)
      return messageArlert(handleApp.isLanguage==false?"Vui lòng chọn ít nhất một ghế.":"Please choose at least one chair.")
    handleApp.isLanguage==false?
    navigation.navigate("Phụ phẩm",ticketsData)
    :
    navigation.navigate("By-products",ticketsData);
    }
    catch(e)
    {console.log(e)}

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
    if(statusFind(chairsData,(numberz+number)).status==2)
    {
      return(
        <View style={[stylesz.choosed]}>
          <Text style={styles.contentText}>
            {numberz+number}
          </Text>
      </View>
      )
    }
    var touchProps = {
      activeOpacity: 1,
      underlayColor: 'orange',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
      style: statusFind(chairsData,(numberz+number)).status==1? stylesz.btnNormal : stylesz.btnPress, // <-- but you can still apply other style changes
      onHideUnderlay: () => setIsPress(false),
      onShowUnderlay: () => setIsPress(true),
      onPress: () => console.log('HELLO'),                 // <-- "onPress" is apparently required
    }
    return(
      <TouchableHighlight style={[styles.buttonChooseChair]} {...touchProps} onPress={()=> setChair((numberz+number))} key={numberz+number}>
          <Text style={styles.contentText}>
            {numberz+number}
          </Text>
      </TouchableHighlight>
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
        <View style={{width:"100%", height:55, backgroundColor:"orange", borderWidth:1, flexDirection:'row'}}>
          {/* <TouchableOpacity style={{ borderRadius:10,width:"30%",height:"70%", backgroundColor:"white",borderWidth:1, alignItems:'center',justifyContent:'center'}} onPress={()=>onFoodCombos()}>
            <Text>
              {handleApp.isLanguage==false?"Tiếp tục":"Continue"}
            </Text>
          </TouchableOpacity> */}
          <View style={{ flex:3, left:'5%', alignItems:'center',justifyContent:'center'}}>
            <Text style={styles.titleContentText}>{handleApp.isLanguage==false?"Số ghế đã chọn: "+count:"Chairs choose: "+count}</Text>
          </View>
          <View style={{flex:6,left:'40%',justifyContent:'center'}}>
            <TouchableOpacity style={{ borderRadius:10,width:"40%",height:"70%", backgroundColor:"white",borderWidth:1, alignItems:'center',justifyContent:'center'}} onPress={()=>onFoodCombos()}>
              <Text>
                {handleApp.isLanguage==false?"Tiếp tục":"Continue"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    </LinearGradient>
    );
}
var stylesz = StyleSheet.create({
  btnNormal: {
    borderWidth:0.5,
    borderRadius:30,
    width: "90%",
    height:'90%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'orange'
  },
  btnPress: {
    borderWidth:0.5,
    borderRadius:30,
    width: "90%",
    height:'90%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'green'
  },
  choosed: {
    borderWidth:0.5,
    borderRadius:30,
    width: "90%",
    height:'90%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'red'
  }
});