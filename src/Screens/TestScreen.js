import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import localhost from '../Route/configIP'
import PaypalView from './Paypal';
export default function TestView() {

  const [items, setItems] = useState([{
    name: "ticket 2B",
    sku: "none",
    price: 150000,
    currency: "USD",
    "quantity": 1
  },
  {
    name: "ticket 2A",
    sku: "none",
    price: 150000,
    currency: "USD",
    "quantity": 1
  }
]);
  const [total, setTotal] = useState(300000);
  console.log(total)
  console.log(items)
  const messageArlert = (value) =>
  {
      Alert.alert(
      "Thông báo",
      value
      )
  }
  const payment = () => 
  {
    try{
    fetch(localhost()+"/users/login", {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          items: items,
          total: total,
      })
      }).then((response) => response.json())
      .then((responseData) => {
         
        messageArlert("Success Payment")
          
      })
      .then()
  }
  catch (error) {
      console.log(error)
  }
  finally {
      console.log("done")
  }
  }
  return (
    <View>
        {/* <TouchableOpacity style={{width:'70%', borderWidth:0.3, borderRadius:30, height:'80%', backgroundColor:'#EEEEEE',alignItems:'center', justifyContent:'center', opacity:0.8}} onPress={payment}>
                    <Text style={styles.titleContentText}>Chọn phương thức thanh toán</Text>
        </TouchableOpacity> */}
        <View style={{borderWidth:1,maxWidth:"70%", maxHeight:"10%", backgroundColor:"#3366FF", width:'100%', height:'100%',borderRadius:30 }}>
            <PaypalView/>
        </View>
    </View>
  );
}