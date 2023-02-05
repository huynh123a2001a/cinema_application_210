import styles from '../Css/pageCss';
import { ScrollView, Text, View, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PaypalView from './Paypal';
import { useState, useEffect } from 'react';
import cart from '../Handle/cartPayment.json';
import localhost from '../Route/configIP';
import ctDatetime from '../Handle/customDateTime'
export default function TestView() {
  const data ={data1:[{id:1, user:2},{id:2, user:3}], data2:[{id:1, user:2},{id:2, user:3}]}
  return (
    <View style={styles.container}>
      <Text>{data.data2.map(item => item.id)}</Text>
    </View>
  )
}