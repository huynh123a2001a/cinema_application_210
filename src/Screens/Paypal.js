import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import localhost from '../Route/configIP';
import { WebView } from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';
import handleApp from '../Handle/setHandleApp.json';
import setLoginUser from '../Handle/setLoginUser.json'
function PaypalView(total, list_item, navigation) {
  const [showGateway, setShowGateway] = useState(false);
  const [prog, setProg] = useState(false);
  const [progClr, setProgClr] = useState('#000');
  function onMessage(e) {
    let data = e.nativeEvent.data;
    if (data === 'SUCCESS') {
      setBillTickets();
    }
    else {
      alert('PAYMENT FAILED. PLEASE TRY AGAIN.');
    }
  }
  console.log(total)
  function setBillTickets() {
    list_item == null ?
      alert('Có lỗi xảy ra, chúng tôi sẽ kiểm tra ngay lập tức, vui lòng đợi trong giây lát')
      :
      insertDatabase()
  }
  function insertDatabase() {
    try {
      fetch(localhost() + "/bills", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          listItem: list_item,
          total: total,
          userID: setLoginUser.idUser
        })
      }).then((response) => response.json())
        .then((responseData) => {
          console.log(JSON.stringify(responseData))
          if (JSON.stringify(responseData) != "false") {
            console.log(JSON.stringify(responseData));
            return billdetail(JSON.stringify(responseData));
          }
          return console.log(JSON.stringify(responseData));
        })
        .then()
    }
    catch (e) {

      console.log(e);
    }
  }
  function billdetail(billID) {
    try {
      fetch(localhost() + "/bills/create", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          listItem: list_item,
          userID: setLoginUser.idUser,
          billID: billID
        })
      }).then((response) => response.json())
        .then((responseData) => {
          console.log(JSON.stringify(responseData))
          if (JSON.stringify(responseData)=='"SUCCESS"') {
            alert(handleApp == false ? "Thanh toán thành công" : "Payment success");
            setShowGateway(false);
            return navigation.push("DrawerTab");
          }
          else {
            return alert(handleApp == false ? "Có lỗi xảy ra" : "Have an error");
          }
        })
        .then()
    }
    catch (e) {

      console.log(e);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity style={{ width: '100%', height: '100%', borderRadius: 30, alignItems: 'center', justifyContent: 'center' }} onPress={() => setShowGateway(true)}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}> {handleApp.isLanguage == false ? "Thanh toán Paypal" : "Payment Paypal"} </Text>
      </TouchableOpacity>
      {showGateway ? (
        <Modal
          visible={showGateway}
          onDismiss={() => setShowGateway(false)}
          onRequestClose={() => setShowGateway(false)}
          animationType={'fade'}
          transparent>
          <View style={styles.webViewCon}>
            <View style={styles.wbHead}>
              <TouchableOpacity
                style={{ padding: 13 }}
                onPress={() => setShowGateway(false)}>
                <Feather name={'x'} size={24} />
              </TouchableOpacity>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#00457C',
                }}>
                PayPal GateWay
              </Text>
              <View style={{ padding: 13, opacity: prog ? 1 : 0 }}>
                <ActivityIndicator size={24} color={progClr} />
              </View>
            </View>
            <WebView
              source={{ uri: localhost() + "/paypal/" + total }}
              style={{ flex: 1 }}
              onLoadStart={() => {
                setProg(true);
                setProgClr('#000');
              }}
              onLoadProgress={() => {
                setProg(true);
                setProgClr('#00457C');
              }}
              onLoadEnd={() => {
                setProg(false);
              }}
              onLoad={() => {
                setProg(false);
              }}
              onMessage={onMessage}
            />
          </View>
        </Modal>
      ) : null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  btnCon: {
    height: 45,
    width: '70%',
    elevation: 1,
    backgroundColor: '#00457C',
    borderRadius: 3,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontSize: 18,
  },
  webViewCon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wbHead: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    zIndex: 25,
    elevation: 2,
  },
});
export default PaypalView;
