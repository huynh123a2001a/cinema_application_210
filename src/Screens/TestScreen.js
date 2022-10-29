import { ActivityIndicator, Text, View,TouchableOpacity, ScrollView} from 'react-native';
import {React} from 'react-native';
import styles from '../Css/pageCss';
import fetchlocal from '../Route/configIP'
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
export default function TestView()
{ 
  let count= useState(0);
  const items = ([{
    itemID:1,
    item1:1,
  },{
    itemID:2,
    item1:1,
  },{
    itemID:3,
    item1:1,
  },{
    itemID:4,
    item1:1,
  }])
  function changeitem1(itemID)
  {
    items.map((item)=>item.itemID == itemID?item.item1++:0)
    let a=3;
    items.map()
    console.log(a)
    
  }
  function changeitem2(itemID)
  {
    items.map((item)=>item.itemID == itemID?item.item1++:0)
    console.log(count)
  }
  function changeitem3(itemID)
  {
    items.map((item)=>item.itemID == itemID?item.item1++:0)
    console.log(count)
  }
  function changeitem4(itemID)
  {
    items.map((item)=>item.itemID == itemID?item.item1++:0)
    console.log(count)
  }
  return (
  <View>
      <TouchableOpacity style={{width:100, height:100, backgroundColor:'red', margin:20}} onPress={()=>changeitem3(1)}>

      </TouchableOpacity>
      <TouchableOpacity style={{width:100, height:100, backgroundColor:'red', margin:20}} onPress={()=>changeitem3(2)}>

      </TouchableOpacity>
      <TouchableOpacity style={{width:100, height:100, backgroundColor:'red', margin:20}} onPress={()=>changeitem3(3)}>

      </TouchableOpacity>
      <TouchableOpacity style={{width:100, height:100, backgroundColor:'red', margin:20}} onPress={()=>changeitem3(4)}>

      </TouchableOpacity>
      
  </View>    
  )
}