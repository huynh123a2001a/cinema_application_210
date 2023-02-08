import styles from '../Css/pageCss';
import { ScrollView, Text, View, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
export default function TestView() {
  const _setItem = (value, item) =>{
    return(
    value==2?
    <View style={{height:130, flexDirection:"row", marginTop:'5%'}}>
      <View style={{flex:12, backgroundColor:"#FF11F1", alignItems:'center', justifyContent:'center', borderBottomRightRadius:40,borderTopRightRadius:40}}>
        <Text>{item}</Text>
      </View>
      <View style={{flex:5}}>

      </View>
    </View>
      :
      <View style={{height:130, flexDirection:"row", marginTop:'5%'}}>
        <View style={{flex:5}}>

        </View>
        <View style={{flex:12, backgroundColor:"#FF11F1", alignItems:'center', justifyContent:'center', borderBottomLeftRadius:40,borderTopLeftRadius:40}}>
          <Text>{item}</Text>
        </View>
      </View>
        )
  }
  return (
    <View style={styles.container}>
      <View style={{width:'100%', height:'100%', backgroundColor:'#FF11FF'}}>
        <View style={{flex:1, backgroundColor:"#11FF11"}}>
          <View style={{flex:1, backgroundColor:'#111111', flexDirection:'row'}}>
            <View style={{flex:1, backgroundColor:'#1F3F22', alignItems:'center', justifyContent:'center'}}>
              <Text>Logo</Text>
            </View>
            <View style={{flex:3, backgroundColor:'#F333F2', alignItems:'center', justifyContent:'center'}}>
              <Text>Tool</Text>
            </View>
          </View>
          <View style={{flex:2,backgroundColor:'#FF2222', alignItems:'center', justifyContent:'center', borderRadius:40}}>
            <Text>background</Text>
            <View style={{width:'70%', height:'60%', backgroundColor:'#F22FFF',borderRadius:20,  alignItems:'center', justifyContent:'center'}}>
              <Text style={styles.textButton}>Banner</Text>
            </View>
          </View>
        </View>
        <View style={{flex:2, backgroundColor:"#11FFFF"}}>
          <ScrollView>
            {_setItem(1,"item 1")}
            {_setItem(2,"item 2")}
            {_setItem(1,"item 3")}
            {_setItem(2,"item 4")}
            {_setItem(1,"item 5")}
            {_setItem(2,"item 6")}
            {_setItem(1,"item 7")}
          </ScrollView>
        </View>
      </View>
    </View>
  )
}