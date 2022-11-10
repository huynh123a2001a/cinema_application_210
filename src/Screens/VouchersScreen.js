import {Text, View,TouchableOpacity, Image, ScrollView, Clipboard, Alert} from 'react-native';
import {React} from 'react-native';
import styles from '../Css/pageCss';
import { LinearGradient } from 'expo-linear-gradient';
import Users from '../Handle/setLoginUser.json';
import handleApp from '../Handle/setHandleApp.json';
import { useState,useEffect } from 'react';
import localhost from '../Route/configIP';
export default function VouchersView({navigation})
{   
    const [isLoading, setLoading] = useState(true);
    const [vouchersData, setVouchersData] = useState([]);
    console.disableYellowBox = true;
    const getvouchers = async () => {
        try {
         const response = await fetch(localhost()+"/vouchers/"+Users.idUser+"");
         const json = await response.json();
         setVouchersData(json);
       } catch (error) {
         console.error(error);
       } finally {
         setLoading(false);
       }
     }
     useEffect(() => {
        getvouchers();
     }, []);
     const copyClipboard = (value) =>
     {
        Clipboard.setString(value)
         Alert.alert(
         "Thông báo",
         "Đã copy mã giảm giá."
         )
     }
    const getCardVouchers = (item) =>{
        return(
            <TouchableOpacity onPress={() => copyClipboard(item.voucherID) } key={item.voucherID}>
                    <LinearGradient colors={['#FF9900','#FFCC33','#FFCC66','#FFFF99','#FFFFCC','#FFFF99','#FFCC66','#FFCC33', '#FF9900']}
                    start={{ x: 0.1, y: 0 }}
                    end={{x: 0.8, y:0}} style={{height:150, borderRadius:20, marginTop:"5%", borderWidth:0.5}}>
                            <View style={{flex:1, width:'100%', justifyContent:'center',alignItems:'center', marginLeft:'5%', marginRight:'5%'}}>
                                <Text style={{fontSize:18,fontWeight:'bold', marginRight:"10%"}}>{handleApp.isLanguage==false?"Mã":"Code"}: <Text style={[styles.titleContentText,{color:'red',fontSize:18}]}>{item.voucherID}</Text></Text>
                            </View>
                            <View style={{height:'10%'}}>
                                <Text>------------------------------------------------------------------------------</Text>
                            </View>
                            <View style={{flex:1, marginLeft:'5%'}}>
                                <Text style={{fontWeight:'bold'}}>{handleApp.isLanguage==false?"Thông tin":"Information"}: <Text style={styles.contentTextCard}>{handleApp.isLanguage==false?item.voucherName:item.voucherName1}</Text></Text>
                            </View>
                            <View style={{flex:1, marginLeft:'5%'}}>
                                <Text style={{fontWeight:'bold'}}>{handleApp.isLanguage==false?"Giá trị giảm":"Discount"}: <Text style={styles.contentTextCard}>{item.discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text></Text>
                            </View>
                            <View style={{flex:2, marginLeft:'5%', marginRight:'5%', borderTopWidth:0.5}}>
                                <ScrollView>
                                    <Text style={{fontWeight:'bold', marginTop:'1%'}}>{handleApp.isLanguage==false?"Điều kiện áp dụng":"Conditions apply"}: <Text style={styles.contentTextCard}>{handleApp.isLanguage==false?item.voucherContent:item.voucherContent1}</Text></Text>
                                </ScrollView>
                            </View>
                    </LinearGradient>
            </TouchableOpacity>
        )
    }
    return(
        <LinearGradient colors={['#000066','#0000CC','#3300FF','#0099FF','#66FFFF', '#0099FF','#3300FF','#0000CC', '#000066']}
        start={{ x: 0.1, y: 0 }}
        end={{x: 0.7, y:1}} style={styles.linearBackground}>
            {isLoading ? <View style={{alignItems:'center',marginTop:'10%'}}>
            <Image source={require('../images/iconLoading.gif')} style={{ maxWidth:'20%',maxHeight:'20%', display:'block'}}></Image>
            <Text style={{marginTop:'5%', fontSize:20,fontWeight:'bold'}}> Loading...</Text>
            </View> :
            vouchersData.length>0?
            <ScrollView>
                {
                    vouchersData.map(item=>getCardVouchers(item))
                }
            </ScrollView>
            :
            <View style={{height:'100%',alignItems:'center',justifyContent:'center'}}>
                <Text style={styles.titleText}> Không có dữ liệu</Text>
            </View>}
        </LinearGradient>
    );
}