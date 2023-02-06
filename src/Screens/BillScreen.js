import {TextInput ,Modal, Alert, Text, View,TouchableOpacity, ScrollView,Pressable} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../Css/pageCss';
import handleApp from '../Handle/setHandleApp.json';
import user from '../Handle/setLoginUser.json';
import React,{ useState,useEffect } from 'react';
import PaypalView from './Paypal.js';
import { Ionicons } from '@expo/vector-icons';
import localhost from '../Route/configIP';
import moment from 'moment';
import customDateTime from '../Handle/customDateTime';
export default function BillView({navigation,route}){
    try {
    const [exchangeRate, setExchangeRate] = useState();
    const [exchangeRateUSD, setUSDExchangeRate] = useState();
    const [isLoading, setLoading] = useState(true);
    const [voucher, setVoucher] = useState(" ");
    const [discountVoucher, setDiscountVoucher] = useState(0);
    const getExchangeRate = async () => {
        try {
        const response = await fetch(localhost()+"/exchangerates");
        const json = await response.json();
        json.filter(item=> {if(item.type=="USD");
        return setUSDExchangeRate(item.exchangeRate)})
        setExchangeRate(json);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
     }
    useEffect(() => {
        getExchangeRate();
    }, []);
    const billData = route.params;
    const [payment, setPayment] = useState(null);
    const PaymentAlert = () =>
        Alert.alert(
        handleApp.isLanguage==false?"Chọn phương thức thanh toán":"Choose a Payment Method",
        "",
        [
            {
              text: "Paypal",
              onPress: () => setPayment("Paypal")
            },
            {
              text: "Momo (Đang cập nhật)",
              onPress: () => setPayment("Momo")
              
            },
            { text: handleApp.isLanguage==false?"Quay lại":"Close", onPress: () =>setPayment(payment), style: "cancel" }
          ]
        
        )
    function total()
    {
        let total=billData.priceTicket*billData.chairs.length;
        billData.foods.map(item=>item.foodPrice?total+=item.foodPrice*item.quantity:total+=item.comboPrice*item.quantity)
        return total;
    }
    function billFoods()
    {
        let total=0
        billData.foods.map(item=>item.foodPrice?total+=item.foodPrice*item.quantity:total+=item.comboPrice*item.quantity)
        return total;
    }
    const messageArlert = (value) =>
    {
        Alert.alert(
        "Thông báo",
        value
        )
    }
    function closeVoucher()
    {
        setDiscountVoucher(0);
        setVoucher("");
        billData.voucher="";
        billData.discountVoucher =0;
    }
    function getVoucher()
    {
        try{
            try{
                if(voucher.trim()=="")
                {
                    setVoucher("");
                    return handleApp.isLanguage==false?messageArlert("Vui lòng không để trống."):messageArlert("Please do not leave it blank.");
                }
            }
            catch{
                setVoucher("");
                return handleApp.isLanguage==false?messageArlert("Vui lòng không để trống."):messageArlert("Please do not leave it blank.");
            }
            fetch(localhost()+"/vouchers", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code:voucher.toUpperCase(),
                    userID: user.idUser
                })
                }).then((response) => response.json())
                .then((responseData) => {
                    if(JSON.stringify(responseData)=='NOT FOUND USER')
                    {
                        setVoucher("");
                        return messageArlert(handleApp.isLanguage==false?"Phiên đăng nhập đã hết hạn":"Login session has expired");
                    }
                    if(responseData=="EXPIRYDATE")
                    {
                        return messageArlert(handleApp.isLanguage==false?"Mã giảm giá đã hết hạn":"Expired discount code");
                    }
                    if(responseData=="AMOUNTZERO")
                    {
                        return messageArlert(handleApp.isLanguage==false?"Mã giảm giá đã lượt sử dụng":"Discount code has been used");
                    }
                    if(JSON.stringify(responseData)=='false')
                    {
                        setVoucher("");
                        return messageArlert(handleApp.isLanguage==false?"Mã giảm giá này không tồn tại hoặc không đủ điều kiện sử dụng":"This discount code does not exist or is not eligible for use");
                    }
                    responseData.filter(voucher =>  billData.discountVoucher=voucher.discount)
                    setDiscountVoucher(billData.discountVoucher);
                    setVoucher(voucher.trim());
                    billData.voucher=voucher.toUpperCase();
                })
                .then()
        }
        catch(e)
        {
            console.log(e)
        }
    }
    const [modalVisible, setModalVisible] = useState(false);
    console.disableYellowBox = true;
    function popupBill()
        {
            return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <LinearGradient style={{width:"90%", height:"95%", backgroundColor:'yellow', borderRadius:30, marginTop:"5%", borderWidth:1}} colors={['#FF9933', '#FFCC33','#FFFF66', '#FFFF99','#FFFF66','#FFCC33', '#FF9933',]}
                    start={{ x: 0.7, y: 0 }}
                    end={{x: 0.7, y:1}}>
                        <ScrollView>
                            <View style={{width:'100%', height:100, alignItems:'center', justifyContent:'center'}}>
                                <Text style={styles.titleText}>{handleApp.isLanguage==false?"Chi tiết hoá đơn":"Bill detail"}</Text>
                            </View>
                            <View style={{width:'100%',height:30}}>
                                <Text>-----------------------------------------------------------------------</Text>
                            </View>
                            <View style={{width:'90%', marginLeft:'5%', marginRight:'5%'}}>
                                <View style={{alignItems:'center'}}>
                                    <Text style={styles.titleContentText}>{handleApp.isLanguage==false?"Ghế đặt":"Chairs booking"}</Text>
                                </View>
                                <Text style={{marginTop:'2%'}}>- {handleApp.isLanguage==false?"Số ghế:":"Chair number:"} {" "+billData.chairs}.</Text>
                                <Text style={{marginTop:'2%'}}>- {handleApp.isLanguage==false?"Tổng số ghế:":"Chairs total"} {billData.chairs.length}</Text>
                                <Text style={{marginTop:'2%'}}>- {handleApp.isLanguage==false?"Đơn giá ghế":"Unit price per seat:"} {payment=="Paypal"?(billData.priceTicket/exchangeRateUSD).toFixed(2)+"$":billData.priceTicket}</Text>
                                <Text style={{marginTop:'2%', fontWeight:'bold'}}>- {handleApp.isLanguage==false?"Tổng giá đặt chỗ":"Total price for seat reservation"}: {payment=="Paypal"?(((billData.chairs.length*billData.priceTicket)/exchangeRateUSD).toFixed(2))+"$":billData.chairs.length*billData.priceTicket}</Text>
                                <View style={{alignItems:'center'}}>
                                    <Text style={styles.titleContentText}>{handleApp.isLanguage==false?"Phụ phẩm kèm":"By-products"}</Text>
                                </View>
                                <Text style={{marginTop:'2%', fontWeight:'bold'}}>* {handleApp.isLanguage==false?"Phụ phẩm":"By-products"}</Text>
                                {billData.foods.map(index => index.foodID?
                                    <View style={{width:'100%'}} key ={index.foodID}>
                                        <Text style={{ marginTop:'3%'}}>- {index.foodName}</Text>
                                        <Text>+ {handleApp.isLanguage==false?"Số lượng:":"Quantity"} {index.quantity}, {handleApp.isLanguage==false?"Đơn giá":"Unit price"}: {payment=="Paypal"?(index.foodPrice/exchangeRateUSD).toFixed(2)+"$":index.foodPrice}, <Text style={{fontWeight:'bold'}}> {handleApp.isLanguage==false?"Tổng":"Total"}:{payment=="Paypal"?((index.foodPrice*index.quantity)/exchangeRateUSD).toFixed(2)+"$":index.foodPrice*index.quantity}</Text></Text>
                                    </View>:
                                    <View style={{width:'100%'}} key={index.comboID}>
                                        <Text style={{ marginTop:'3%'}}>- {index.comboName}</Text>
                                        <Text>+ {handleApp.isLanguage==false?"Số lượng":"Quantity"}: {index.quantity}, {handleApp.isLanguage==false?"Đơn giá":"Unit price"}: {payment=="Paypal"?(index.comboPrice/exchangeRateUSD).toFixed(2)+"$":index.comboPrice}, <Text style={{fontWeight:'bold'}}> {handleApp.isLanguage==false?"Tổng":"Total"}:{payment=="Paypal"?((index.comboPrice*index.quantity)/exchangeRateUSD).toFixed(2)+"$":index.comboPrice*index.quantity}</Text></Text>
                                    </View>
                                )}
                                <Text style={{marginTop:'2%', fontWeight:'bold'}}>- {handleApp.isLanguage==false?"Tổng phụ phẩm:":"By-products total:"} {payment=="Paypal"?(billFoods()/exchangeRateUSD).toFixed(2)+"$":billFoods()}</Text>
                                {discountVoucher!=0?<Text style={{marginTop:'2%', fontWeight:'bold'}}>- {handleApp.isLanguage==false?"Mã giảm giá:":"Voucher:"} {payment=="Paypal"?(discountVoucher/exchangeRateUSD).toFixed(2)+"$":discountVoucher}</Text>:""}
                                <View style={{height:30,marginTop:'3%', flexDirection:'row',}}>
                                    <View style={{height:'100%',alignItems:'center'}}>
                                        <Text style={[styles.titleContentText,{fontSize:20}]}>{handleApp.isLanguage==false?"Mã giảm giá":"Voucher"} </Text>
                                    </View>
                                    { discountVoucher == 0?
                                    <View style={{width:'50%', height:'100%', backgroundColor:'white', borderWidth:1, opacity:0.8, justifyContent:'center'}}>
                                            <TextInput style={{marginLeft:'3%', color:'red', fontSize:18, fontWeight:'bold'}} onChangeText={setVoucher}>{voucher.toUpperCase()}</TextInput>
                                    </View>
                                    :
                                    <View style={{width:'50%', height:'100%', opacity:0.8, justifyContent:'center'}}>
                                            <Text style={{marginLeft:'3%', color:'red', fontSize:18, fontWeight:'bold'}} onChangeText={setVoucher}>{voucher.toUpperCase()}</Text>
                                    </View>
                                    }
                                    {
                                    discountVoucher==0?
                                    <TouchableOpacity style={{height:'100%',alignItems:'center'}} onPress={()=>getVoucher()}>
                                        <Ionicons name={"checkbox-outline"} size={32} color={"black"} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={{height:'100%', borderLeftWidth:0.5,alignItems:'center'}} onPress={()=>closeVoucher()}>
                                        <Ionicons name={"close-circle-outline"} size={32} color={"black"} />
                                    </TouchableOpacity>
                                    }
                                </View>
                                <View style={{alignItems:'center', marginTop:'3%',}}>
                                    <Text style={[styles.titleContentText,{fontSize:20}]}>{handleApp.isLanguage==false?"Tổng hoá đơn":"Bill total"}: {payment=="Paypal"?((total()/exchangeRateUSD).toFixed(2)-((discountVoucher/exchangeRateUSD).toFixed(2))).toFixed(2)+"$":(total()-discountVoucher)}</Text>
                                </View>
                            </View>
                        </ScrollView>
                        <View style={{width:'100%', height:'10%', alignItems:'center', borderTopWidth:0.5}}>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.titleContentText}>{handleApp.isLanguage==false?"Xác nhận":"Confirm"}</Text>
                        </Pressable>
                        </View>
                        <View style={{width:'100%',height:30}}>
                                <Text>-----------------------------------------------------------------------</Text>
                        </View>
                    </LinearGradient>
                </View>
            </Modal>
        );}
    const infoBill = () =>
    {
    return(
    <View style={{width:"100%", height:"100%"}}>
        <View style={{alignItems:"center",justifyContent:"center"}}>
            <Text style={{fontSize:30, fontWeight:'bold'}}>{billData.cinemaName}</Text>
                <Text style={{maxHeight:'15%'}}>-----------------------------------------------------------------------</Text>
        </View>
        <View style={{marginTop:"5%" ,alignItems:'center'}}>
            <Text style={[styles.titleContentText]}> 
            {handleApp.isLanguage==false?"Phim":"Film"}
            </Text>
            <Text style={{fontWeight:'bold'}}>
                {handleApp.isLanguage==false?billData.filmName.trim():billData.filmName1.trim()}
            </Text>
        </View>
            <View style={{marginTop:"5%" ,justifyContent:'center', marginLeft:'5%'}}>
                <Text style={[styles.titleContentText]}> 
                    Room
                    <Text style={{ fontSize:14, fontWeight:'normal'}}>
                         : {billData.roomName}
                    </Text>
                </Text>
            </View>
            <View style={{marginTop:"5%" , justifyContent:'center', marginLeft:'5%'}}>
                <Text style={[styles.titleContentText]}> 
                    {handleApp.isLanguage==false?"Thời gian":"Time"}
                    <Text style={{ fontSize:14, fontWeight:'normal'}}>
                        : {customDateTime(billData.showDate).date}|{customDateTime(billData.showTime).onlyTime}
                    </Text>
                </Text>
            </View>
            <View style={{marginTop:"5%" , justifyContent:'center', marginLeft:'5%'}}>
                <Text style={[styles.titleContentText]}> 
                     {handleApp.isLanguage==false?"Số ghế đặt":"Number of seats book"}
                    <Text style={{ fontSize:14, fontWeight:'normal'}}>
                        : {" "+billData.chairs}.
                    </Text>
                </Text>
            </View>
            <View style={{marginTop:"5%" ,justifyContent:'center', marginLeft:'5%'}}>
                <Text style={[styles.titleContentText]}> 
                {handleApp.isLanguage==false?"Tổng phụ phẩm:":"By-products total:"}
                    <Text style={{ fontSize:14, fontWeight:'normal'}}>
                        {billData.foods.length>0?payment=="Paypal"?" "+(billFoods()/exchangeRateUSD).toFixed(2)+"$":" "+billFoods():handleApp.isLanguage==false?"Không có mua thêm":"No additional purchases"}.
                    </Text>
                </Text>
            </View>
            <View style={{marginTop:"5%" ,justifyContent:'center', marginLeft:'5%', alignItems:'center'}}>
                <Text style={[styles.titleContentText]}> 
                {handleApp.isLanguage==false?"Tổng:":"Total:"} {payment=="Paypal"?((total()/exchangeRateUSD)-((discountVoucher/exchangeRateUSD))).toFixed(2)+"$":(total()-discountVoucher)}
                </Text>
        </View>
    </View>
    
    )
    }
    const infoBillView = () =>{
    return(
    <View style={{flex:1, marginTop:"10%", marginLeft:"5%", marginRight:'5%'}}>
        {infoBill()}
    </View>
    )
    }
    const addressTicket = () =>{
    return(
    <View style={{flex: 2, marginLeft:"5%", marginRight:'5%', alignItems:'center'}}>
        <Text style={{maxHeight:'15%'}}>-----------------------------------------------------------------------</Text>
        <View style={{marginLeft:"5%", marginRight:'5%', marginBottom:'10%', alignItems:'center', justifyContent:'center',marginTop:'5%'}}>
            <Text style={{fontSize:16}}> 
                {billData.addressName}
            </Text>
            <View style={{marginTop:"5%"}}>
                <Text style={{fontSize:10}}>{handleApp.isLanguage==false?"Nhấn vào để xem chi tiết":"Click to view details"}</Text>
            </View>
        </View>
    </View>
    )
    }
    const ticketCard = () =>
    {
    return (
    <LinearGradient style={{maxWidth:"70%", maxHeight:"80%", width:"100%", height:'100%', backgroundColor:'yellow', borderRadius:30, marginTop:"5%", borderWidth:1}} colors={['#FF9933', '#FFCC33','#FFFF66', '#FFFF99','#FFFF66','#FFCC33', '#FF9933',]}
        start={{ x: 0.7, y: 0 }}
        end={{x: 0.7, y:1}}>   
        <TouchableOpacity style={{width:"100%", height:"100%"}} onPress={() => setModalVisible(true)}>
            {infoBillView()}
            {addressTicket()}
        </TouchableOpacity>
    </LinearGradient>
    )
    }
    const buttonSend = () =>
    {
    return(
    payment=="Paypal"?
        <View style={{borderWidth:1,maxWidth:"70%", maxHeight:"10%", backgroundColor:"#3366FF", width:'100%', height:'100%',borderRadius:30 }}>
            {PaypalView(total()-discountVoucher,billData,navigation)}
        </View>
    :
        payment == "Momo"?
        <View style={{alignItems:'center',justifyContent:'center',borderWidth:1,maxWidth:"70%", maxHeight:"10%", backgroundColor:"#FF33CC", width:'100%', height:'100%',borderRadius:30 }}>
            <Text style={{ fontSize:20, fontWeight:'bold'}}>{handleApp.isLanguage==false?"Thanh toán Momo":"Payment Momo"}</Text>
        </View>
        :
        <View style={{alignItems:'center',justifyContent:'center',maxWidth:"70%", maxHeight:"10%",width:'100%', height:'100%',borderRadius:30 }}>
            <Text> </Text>
        </View>
    )
    }
    const ViewBill = () =>{
    return(
    <LinearGradient style={{width:'100%', height:'100%'}} colors={['#333399', '#0099FF','#33CCFF', '#99FFFF','#33CCFF','#0099FF', '#333399',]}
        start={{ x: 0.2, y: 0 }}
        end={{x: 1, y:1}}>
        <ScrollView>
            <View style={{alignItems:'center'}}>
            {ticketCard()}
            <View style={{width:'100%', height:50, alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity style={{width:'70%', borderWidth:0.3, borderRadius:30, height:'80%', backgroundColor:'#EEEEEE',alignItems:'center', justifyContent:'center', opacity:0.8}} onPress={PaymentAlert}>
                    <Text style={styles.titleContentText}>{handleApp.isLanguage==false?"Chọn phương thức thanh toán":"Choose a Payment Method"}</Text>
                </TouchableOpacity>
            </View>
            {buttonSend()}
            </View>
        </ScrollView>
    </LinearGradient>
    )
    }
    return (
        <View>
            {popupBill()}
            <ViewBill/>
        </View>
    )}
    catch(e){
        console.log(e);
    }
}