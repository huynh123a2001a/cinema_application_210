import { Text, View, TouchableOpacity, Image, ScrollView, Modal, Pressable, Alert } from 'react-native';
import { React } from 'react-native';
import styles from '../Css/pageCss';
import { LinearGradient } from 'expo-linear-gradient';
import Users from '../Handle/setLoginUser.json';
import handleApp from '../Handle/setHandleApp.json';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import customDateTime from '../Handle/customDateTime';
import localhost from '../Route/configIP';
export default function BillHistoryView({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [isLoadingModal, setLoadingModal] = useState(handleApp.isLanguage==false?"Đang tải dữ liệu...":"Loading data...");
    const [billsData, setBillsData] = useState([]);
    const [foods, setFoods] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [room, setRoom] = useState([]);
    const [voucherBill, setVoucherBill] = useState("");
    const [totalBill, setTotalBill] = useState();
    const [schedule, setSchedule] = useState([]);
    const [changeExchangeRate, setChangeExchangeRate] = useState("VND")
    const [modalVisible, setModalVisible] = useState(false);
    const [exchangeRateUSD, setUSDExchangeRate] = useState();
    const [exchangeRate, setExchangeRate] = useState();
    console.disableYellowBox = true;
    function FoodsTotal() {
        if(foods.length==0)
            return 0;
        var total = 0;
        foods.filter(unit => total += (unit.price * unit.quantity))
        return total;
    }
    const getExchangeRate = async () => {
        try {
            const response = await fetch(localhost() + "/exchangerates");
            const json = await response.json();
            json.filter(item => {
                if (item.type == "USD");
                return setUSDExchangeRate(item.exchangeRate)
            })
            return setExchangeRate(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    function onExchangeRate() {
        return changeExchangeRate == "VND" ? setChangeExchangeRate("USD") : setChangeExchangeRate("VND");
    }
    const getBillDetails = async () => {
        try {
            const response = await fetch(localhost() + "/bills/" + Users.idUser + "");
            const json = await response.json();
            setBillsData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getBillDetails();
    }, []);
    useEffect(() => {
        getExchangeRate();
    }, []);
    const getFoodDetails = async (billID) => {
        try {
            fetch(localhost() + "/foods/billdetails/getfoods", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: billID,
                })
            }).then((response) => response.json())
                .then((responseData) => {
                    setFoods(responseData)
                })
                .then()
        }
        catch (e) {
            console.log(e)
        }
    }
    const getTicketDetails = async (billID) => {
        try {
            fetch(localhost() + "/tickets/billdetails/gettickets", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: billID,
                })
            }).then((response) => response.json())
                .then((responseData) => {
                    setTickets(responseData)
                    var scheduleID;
                    responseData.filter(data => scheduleID = data.showTimeID)
                    getScheduleDetails(scheduleID)
                    return getRoomDetails(scheduleID)
                })
                .then()
        }
        catch (e) {
            console.log(e)
        }
    }
    const loadingmodel = async ()=>
    {
        return setLoadingModal("done");
    }
    const getRoomDetails = async (scheduleID) => {
        try {
            fetch(localhost() + "/rooms/schedules/billdetails/getroom", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: scheduleID,
                })
            }).then((response) => response.json())
                .then((responseData) => {
                    return setRoom(responseData)
                })
                .then()
        }
        catch (e) {
            console.log(e)
        }
    }

    const getScheduleDetails = async (scheduleID) => {
        try {
            fetch(localhost() + "/showtimes/billdetails", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: scheduleID,
                })
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData)
                    setSchedule(responseData)
                })
                .then()
        }
        catch (e) {
            console.log(e)
        }
        finally{
            await loadingmodel()
        }
    }
    const getdetails = async (billID, voucher, total) => {
        try {
            handleApp.isLanguage==false?setLoadingModal("Đang tải dữ liệu..."):setLoadingModal("Loading data...");
            setModalVisible(true)
            setVoucherBill(voucher)
            setTotalBill(total)
            console.log(total)
            await getFoodDetails(billID)
            await getTicketDetails(billID)
        } catch (error) {
            console.error(error);
        } finally {

            setLoading(false);
        }
    }
    function popupBill() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <LinearGradient style={{ width: "90%", height: "95%", backgroundColor: 'yellow', borderRadius: 30, marginTop: "5%", borderWidth: 1 }} colors={['#FF9933', '#FFCC33', '#FFFF66', '#FFFF99', '#FFFF66', '#FFCC33', '#FF9933',]}
                        start={{ x: 0.7, y: 0 }}
                        end={{ x: 0.7, y: 1 }}>
                        {isLoadingModal == "Đang tải dữ liệu..." || isLoadingModal == "Loading data..." ?
                            <View style={{ width: '100%', height: "70%", marginTop: '20%', alignItems: 'center', }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 23 }}>{isLoadingModal}</Text>
                            </View>
                            :
                            <ScrollView>
                                <View style={{ width: '100%', height: 100, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={styles.titleText}>{handleApp.isLanguage == false ? "Chi tiết hoá đơn" : "Bill detail"}</Text>
                                </View>
                                <TouchableOpacity style={{ width: '20%', height: 40, backgroundColor: '#3300CC', justifyContent: 'center', alignItems: 'center', marginLeft: '2%', borderRadius: 10, flexDirection: 'row', borderWidth: 0.5, borderColor: 'white' }} onPress={() => onExchangeRate()}>
                                    <Ionicons name={"repeat-outline"} size={22} color={"white"} />
                                    <Ionicons name={"cash-outline"} size={22} color={"white"} />
                                </TouchableOpacity>
                                <View style={{ width: '100%', height: 30 }}>
                                    <Text>-----------------------------------------------------------------------</Text>
                                </View>
                                <View style={{ width: '90%', marginLeft: '5%', marginRight: '5%' }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={styles.titleContentText}>{handleApp.isLanguage == false ? "Ghế đặt" : "Chairs booking"}</Text>
                                    </View>
                                    <Text style={{ marginTop: '2%' }}>- {handleApp.isLanguage == false ? "Số ghế:" : "Chair number:"} {" " + tickets.map(item => " " + item.ticketName)}.</Text>
                                    <Text style={{ marginTop: '2%' }}>- {handleApp.isLanguage == false ? "Tổng số ghế:" : "Chair total:"} {" " + tickets.length}.</Text>
                                    <Text style={{ marginTop: '2%' }}>- Room: {" " + room.map(item => item.roomName)}.</Text>
                                    <Text style={{ marginTop: '2%' }}>- {handleApp.isLanguage == false ? "Thời gian:" : "Time:"} {" " + schedule.map(item => customDateTime(item.showTime).date+"|"+customDateTime(item.showTime).time)}.</Text>
                                    <Text style={{ marginTop: '2%' }}>- {handleApp.isLanguage == false ? "Đơn giá ghế" : "Unit price per seat:"} {" " + (changeExchangeRate=="VND"?schedule.map(item => item.priceTicket):(schedule.map(item => item.priceTicket)/exchangeRateUSD).toFixed(2)+"$")}.</Text>
                                    <Text style={{ marginTop: '2%', fontWeight: 'bold' }}>- {handleApp.isLanguage == false ? "Tổng giá đặt chỗ" : "Total price for seat reservation"}: {changeExchangeRate=="VND"?(schedule.map(item => item.priceTicket * tickets.length)):(((schedule.map(item => item.priceTicket * tickets.length))/exchangeRateUSD).toFixed(2))+"$"}</Text>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={styles.titleContentText}>{handleApp.isLanguage == false ? "Phụ phẩm kèm" : "By-products"}</Text>
                                    </View>
                                    {
                                        foods.length < 1 ?
                                            <Text style={{ marginTop: '2%' }}>- {handleApp.isLanguage == false ? "Không có mua thêm" : "No additional purchases"}</Text>
                                            :
                                            <View>
                                                <Text style={{ marginTop: '2%', fontWeight: 'bold' }}>* {handleApp.isLanguage == false ? "Phụ phẩm" : "By-products"}</Text>
                                                {foods.map(item => (handleApp.isLanguage == false ?
                                                    <View>
                                                        <Text>{"- Tên sản phẩm: " + item.foodName}</Text>
                                                        <Text>{"+ Đơn giá: " + (changeExchangeRate=="VND"?item.price:(item.price/exchangeRateUSD).toFixed(2)+"$") + ". " + "Số lượng: " + item.quantity + ". "}
                                                            <Text style={{ fontWeight: 'bold' }}>Tổng: {(changeExchangeRate=="VND"?(item.quantity * item.price):(((item.quantity * item.price)/exchangeRateUSD).toFixed(2)+"$"))}</Text>
                                                        </Text>
                                                    </View>
                                                    :
                                                    <View>
                                                        <Text>{"- Product's name: " + item.foodName1}</Text>
                                                        <Text>{"+ Unit price: " + (changeExchangeRate=="VND"?item.price:(item.price/exchangeRateUSD).toFixed(2)+"$") + ". " + "quantity: " + item.quantity + ". "}
                                                            <Text style={{ fontWeight: 'bold' }}>Total: {(changeExchangeRate=="VND"?(item.quantity * item.price):(((item.quantity * item.price)/exchangeRateUSD).toFixed(2)+"$"))}</Text>
                                                        </Text>
                                                        <Text style={{ fontWeight: 'bold' }}>{handleApp.isLanguage == false ? "Tổng phụ phẩm: " : "Product's total: "} {changeExchangeRate=="VND"?FoodsTotal():(FoodsTotal()/exchangeRateUSD).toFixed(2)+"$"}</Text>
                                                    </View>))
                                                    
                                                }
                                            </View>
                                    }
                                    {
                                        voucherBill ? <Text style={{ fontWeight: 'bold' }}>{handleApp.isLanguage == false ? "Mã giảm giá áp dụng: " : "Voucher used: "}{voucherBill}{handleApp.isLanguage==false?".\nGiá trị giảm: ":". \nDiscount: "}{changeExchangeRate=="VND"?((parseInt(schedule.map(item => item.priceTicket * tickets.length))+FoodsTotal())-totalBill):(((parseInt(schedule.map(item => item.priceTicket * tickets.length))+FoodsTotal())-totalBill)/exchangeRateUSD).toFixed(2)+"$"}</Text> : ""
                                    }
                                    <Text style={{ fontWeight: 'bold' }}>{handleApp.isLanguage == false ? "Tổng hoá đơn: " : "Bill total: "} {changeExchangeRate=="VND"?totalBill:(totalBill/exchangeRateUSD).toFixed(2)+"$"}</Text>
                                </View>
                            </ScrollView>
                        }
                        <View style={{ width: '100%', height: '10%', alignItems: 'center', borderTopWidth: 0.5 }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => { setModalVisible(!modalVisible); setVoucherBill(""); setTotalBill(0) }}
                            >
                                <Text style={styles.titleContentText}>{handleApp.isLanguage == false ? "Xác nhận" : "Confirm"}</Text>
                            </Pressable>
                        </View>
                        <View style={{ width: '100%', height: 30 }}>
                            <Text>-----------------------------------------------------------------------</Text>
                        </View>
                    </LinearGradient>
                </View>
            </Modal>
        );
    }
    const getCardVouchers = (item) => {
        return (
            <TouchableOpacity onPress={() => getdetails(item.billID, item.voucherID, item.billTotal)} key={item.billID}>
                <LinearGradient colors={['#FF9900', '#FFCC33', '#FFCC66', '#FFFF99', '#FFFFCC', '#FFFF99', '#FFCC66', '#FFCC33', '#FF9900']}
                    start={{ x: 0.1, y: 0 }}
                    end={{ x: 0.8, y: 0 }} style={{ height: 200, borderRadius: 5, marginTop: "5%", borderWidth: 0.5 }}>
                    <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', marginLeft: '5%', marginRight: '5%' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginRight: "10%" }}>{handleApp.isLanguage == false ? "Hoá đơn thanh toán" : "Bill payment"}</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: '5%', marginTop: '2%' }}>
                        <Text style={{ fontWeight: 'bold' }}>{handleApp.isLanguage == false ? "Mã hoá đơn" : "Bill Code"}: <Text style={styles.contentTextCard}>{item.billID}</Text></Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: '5%' }}>
                        <Text style={{ fontWeight: 'bold' }}>{handleApp.isLanguage == false ? "Tổng giá trị" : "Total"}: <Text style={styles.contentTextCard}>{item.billTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text></Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: '5%' }}>
                        <Text style={{ fontWeight: 'bold' }}>{handleApp.isLanguage == false ? "Ngày thanh toán" : "Payment date"}: <Text style={styles.contentTextCard}>{customDateTime(item.createDate).datetimeNormal}</Text></Text>
                    </View>
                    <View style={{ flex: 2, marginLeft: '5%', marginRight: '5%' }}>
                        <ScrollView>
                            <View style={{ marginTop: '5%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, marginTop: '1%' }}>{handleApp.isLanguage == false ? "Nhấn vào để xem chi tiết" : "Click to view details"}</Text>
                            </View>
                        </ScrollView>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
    return (
        <LinearGradient colors={['#000066', '#0000CC', '#3300FF', '#0099FF', '#66FFFF', '#0099FF', '#3300FF', '#0000CC', '#000066']}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.7, y: 1 }} style={styles.linearBackground}>
            {popupBill()}
            {isLoading ? <View style={{ alignItems: 'center', marginTop: '10%' }}>
                <Image source={require('../images/iconLoading.gif')} style={{ maxWidth: '20%', maxHeight: '20%', display: 'block' }}></Image>
                <Text style={{ marginTop: '5%', fontSize: 20, fontWeight: 'bold' }}> Loading...</Text>
            </View> :
                billsData.length > 0 ?
                    <ScrollView>
                        {
                            billsData.map(item => getCardVouchers(item))
                        }
                    </ScrollView>
                    :
                    <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.titleText}>{handleApp.isLanguage==false?"Không có dữ liệu.":"Don't have data."}</Text>
                    </View>}
        </LinearGradient>
    );
}