import { Modal, Alert, Text, View,TouchableOpacity, ScrollView,Pressable} from 'react-native';
import {React} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../Css/pageCss';
import handleApp from '../Handle/setHandleApp.json';
import {useState} from 'react';
import PaypalView from './Paypal.js'
export default function BillView({navigation,route}){
    try {
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
                                <Text style={{marginTop:'2%'}}>- {handleApp.isLanguage==false?"Đơn giá ghế":"Unit price per seat:"} {billData.priceTicket}</Text>
                                <Text style={{marginTop:'2%', fontWeight:'bold'}}>- {handleApp.isLanguage==false?"Tổng giá đặt chỗ":"Total price for seat reservation"}: {billData.chairs.length*billData.priceTicket}</Text>
                                <View style={{alignItems:'center'}}>
                                    <Text style={styles.titleContentText}>{handleApp.isLanguage==false?"Phụ phẩm kèm":"By-products"}</Text>
                                </View>
                                <Text style={{marginTop:'2%', fontWeight:'bold'}}>* {handleApp.isLanguage==false?"Phụ phẩm":"By-products"}</Text>
                                {billData.foods.map(index => index.foodID?
                                    <View style={{width:'100%'}}>
                                        <Text style={{ marginTop:'3%'}}>- {index.foodName}</Text>
                                        <Text>+ {handleApp.isLanguage==false?"Số lượng:":"Quantity"} {index.quantity}, {handleApp.isLanguage==false?"Đơn giá":"Unit price"}: {index.foodPrice}, <Text style={{fontWeight:'bold'}}> {handleApp.isLanguage==false?"Tổng":"Total"}</Text></Text>
                                    </View>:
                                    <View style={{width:'100%'}}>
                                        <Text style={{ marginTop:'3%'}}>- {index.comboName}</Text>
                                        <Text>+ {handleApp.isLanguage==false?"Số lượng":"Quantity"}: {index.quantity}, {handleApp.isLanguage==false?"Đơn giá":"Unit price"}: {index.comboPrice}, <Text style={{fontWeight:'bold'}}> {handleApp.isLanguage==false?"Tổng":"Total"}:{index.comboPrice*index.quantity}</Text></Text>
                                    </View>
                                )}
                                <Text style={{marginTop:'2%', fontWeight:'bold'}}>- {handleApp.isLanguage==false?"Tổng phụ phẩm:":"By-products total:"} {billFoods()}</Text>
                                <View style={{alignItems:'center', marginTop:'3%',}}>
                                    <Text style={[styles.titleContentText,{fontSize:20}]}>{handleApp.isLanguage==false?"Tổng hoá đơn":"Bill total"}: {total()}</Text>
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
                        : {billData.showDate}|{billData.showTime}
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
                        {billData.foods.length>0?" "+billFoods():handleApp.isLanguage==false?"Không có mua thêm":"No additional purchases"}.
                    </Text>
                </Text>
            </View>
            <View style={{marginTop:"5%" ,justifyContent:'center', marginLeft:'5%', alignItems:'center'}}>
                <Text style={[styles.titleContentText]}> 
                {handleApp.isLanguage==false?"Tổng":"Total:"} {total()}
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
            <PaypalView/>
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