import { StyleSheet, Text, View,TouchableOpacity, ScrollView} from 'react-native';
import {React} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../Css/pageCss';
export default function BillView({navigation,route}){
    const billData = route.params;
    console.log(billData);
    const infoBill = () =>
    {
    return(
    <View style={{width:"100%", height:"100%"}}>
        <View style={{flex:2, alignItems:"center",justifyContent:"center"}}>
            <Text style={{fontSize:30, fontWeight:'bold'}}>{billData.cinemaName}</Text>
                <Text style={{maxHeight:'15%'}}>-----------------------------------------------------------------------</Text>
        </View>
        <View style={{flex:1, alignItems:'center'}}>
            <Text style={[styles.titleContentText]}> 
            Film
            </Text>
            <Text style={{fontWeight:'bold'}}>
                {billData.filmName.trim()}
            </Text>
        </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:'5%'}}>
                <Text style={[styles.titleContentText]}> 
                    Room
                    <Text style={{ fontSize:14, fontWeight:'normal'}}>
                         : {billData.roomName}
                    </Text>
                </Text>
            </View>
            <View style={{flex:1, justifyContent:'center', marginLeft:'5%'}}>
                <Text style={[styles.titleContentText]}> 
                    Time
                    <Text style={{ fontSize:14, fontWeight:'normal'}}>
                        : {billData.showDate}|{billData.showTime}
                    </Text>
                </Text>
            </View>
            <View style={{flex:1, justifyContent:'center', marginLeft:'5%'}}>
                <Text style={[styles.titleContentText]}> 
                    Chairs
                    <Text style={{ fontSize:14, fontWeight:'normal'}}>
                        : {" "+billData.chairs}.
                    </Text>
                </Text>
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:'5%'}}>
                <Text style={[styles.titleContentText]}> 
                    Other
                    <Text style={{ fontSize:14, fontWeight:'normal'}}>
                        : Chưa thêm dữ liệu
                    </Text>
                </Text>
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:'5%', alignItems:'center'}}>
            <Text style={[styles.titleContentText]}> 
            Total
            </Text>
        </View>
    </View>
    )
    }
    const infoBillView = () =>{
    return(
    <View style={{flex:6, marginTop:"10%", marginLeft:"5%", marginRight:'5%'}}>
        {infoBill()}
    </View>
    )
    }
    const addressTicket = () =>{
    return(
    <View style={{flex:2, marginLeft:"5%", marginRight:'5%', alignItems:'center'}}>
        <Text style={{maxHeight:'15%'}}>-----------------------------------------------------------------------</Text>
        <View style={{marginLeft:"5%", marginRight:'5%', marginBottom:'10%', alignItems:'center', justifyContent:'center',marginTop:'5%'}}>
        <Text style={{fontSize:16}}> {billData.addressName}

        </Text>
        </View>
    </View>
    )
    }
    const ticketCard = () =>
    {
    return (
    <LinearGradient style={{maxWidth:"70%", maxHeight:"80%", width:10000, height:10000, backgroundColor:'yellow', borderRadius:30, marginTop:"5%", borderWidth:1}} colors={['#FF9933', '#FFCC33','#FFFF66', '#FFFF99','#FFFF66','#FFCC33', '#FF9933',]}
        start={{ x: 0.7, y: 0 }}
        end={{x: 0.7, y:1}}>    
        {infoBillView()}
        {addressTicket()}
    </LinearGradient>
    //  </View>
    )
    }
    const buttonSend = () =>
    {
    return(
    <View style={{maxWidth:"70%", maxHeight:"10%", backgroundColor:"darkgreen", width:10000, height:10000, marginTop:"3%",borderRadius:30, justifyContent:"center",alignItems:"center"}}>
        <Text style={{ fontSize:20, fontWeight:'bold'}}> Thanh toán </Text>
    </View>
    )
    }
    const ViewBill = () =>{
    return(
    <LinearGradient style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}} colors={['#333399', '#0099FF','#33CCFF', '#99FFFF','#33CCFF','#0099FF', '#333399',]}
        start={{ x: 0.2, y: 0 }}
        end={{x: 1, y:1}}>
        {ticketCard()}
        {buttonSend()}
    </LinearGradient>
    )
    }
    return (
        <ViewBill/>
    )
}