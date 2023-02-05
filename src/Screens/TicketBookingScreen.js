import { Text, View, TouchableOpacity, Image, ScrollView, Modal, Pressable, TextInput, Alert, Animated, ImageBackground } from 'react-native';
import { React } from 'react-native';
import styles from '../Css/pageCss';
import { LinearGradient } from 'expo-linear-gradient';
import Users from '../Handle/setLoginUser.json';
import handleApp from '../Handle/setHandleApp.json';
import userLogin from '../Handle/setLoginUser.json';
import { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import customDateTime from '../Handle/customDateTime';
import localhost from '../Route/configIP';
export default function TicketBookedView({ navigation }) {
    const [bookedTickets, setBookedTicket] = useState([])
    const [isLoading, setLoading] = useState([])
    const [flagCheckUser, setFlagCheckUser] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [messageModal, setMessageModal] = useState("");
    const [itemModel, setItemModel] = useState();
    const [newUser, setNewUser] = useState("");
    const [messageCheck, setMessageCheck] = useState(handleApp.isLanguage == false ? "Kiểm tra tài khoản" : "Check account");
    const spinValue = useRef(new Animated.Value(0)).current;
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    })
    const getBookedTickets = async () => {
        try {
            const response = await fetch(localhost() + "/tickets/" + userLogin.idUser);
            const json = await response.json();
            setBookedTicket(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        setTimeout(() => {
            Animated.loop(
                Animated.timing(spinValue, {
                    toValue: 1,
                    duration: 6000,
                    useNativeDriver: false
                })).start()
        }, 1000);
        getBookedTickets();
    }, []);
    const OptionsAlert = (item) =>
        Alert.alert(
            handleApp.isLanguage == false ? "Tuỳ chọn" : "Options",
            "",
            [
                {
                    text: handleApp.isLanguage == false ? "Thay đổi vị trí" : "Change location chair",
                    onPress: () => onChangeTicketView(item)
                },
                {
                    text: handleApp.isLanguage == false ? "Chuyển vé sang tài khoản khác" : "Transfer tickets to another account",
                    onPress: () => {
                        setItemModel(item);
                        setModalVisible(true);
                    }

                },
                { text: handleApp.isLanguage == false ? "Quay lại" : "Close", onPress: () => { } }
            ]

        )
    const AlertConfirm = (item) =>
        Alert.alert(
            handleApp.isLanguage == false ? "Thông báo" : "Notify",
            handleApp.isLanguage == false ?"Xác nhận chuyển vé sang tài khoản khác sẽ không thể phục hồi, xác nhận chuyển?":"Confirmation of ticket transfer to another account will not be recoverable, transfer confirmation?",
            [
                {
                    text: handleApp.isLanguage == false ? "Xác nhận" : "Confirm",
                    onPress: () => onChangeTicketUser(item)
                },
                { text: handleApp.isLanguage == false ? "Quay lại" : "Close", onPress: () => { } }
            ]

        )
    const onChangeTicketView = (item) => {
        handleApp.isLanguage == false ?
            navigation.push("Thay đổi vị trí ghế", item)
            :
            navigation.push("Change location chair", item)
    }

    function findUserName() {
        try {
            if (newUser == "" || newUser.trim() == "")
            {
                setMessageCheck(handleApp.isLanguage == false ? "Kiểm tra tài khoản" : "Check account");
                return (alert(handleApp.isLanguage == false ? "Vui lòng không để trống." : "Please do not leave it blank."))
            }
            fetch(localhost() + "/users/username", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: newUser,
                })
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData)
                    if (responseData == false) {
                        setMessageCheck(handleApp.isLanguage == false ? "Kiểm tra tài khoản" : "Check account");
                        return alert(handleApp.isLanguage == false ? "Không tìm thấy username" : "Username not found");
                    }
                    var userIDres = "";
                    if (responseData.length > 0) {
                        responseData.filter(index => userIDres = index.userID)
                        if (Users.idUser == userIDres)
                        {
                            setMessageCheck(handleApp.isLanguage == false ? "Kiểm tra tài khoản" : "Check account");
                            return alert(handleApp.isLanguage == false ? "Không chuyển cho bản thân" : "Do not transfer to yourself");
                        
                        }
                    }
                    setFlagCheckUser(true)
                    setMessageCheck(handleApp.isLanguage==false?"Kiểm tra thành công":"Test success")
                    return setMessageModal(responseData)
                })
                .then()
        } catch (error) {
            alert("ERROR: " + error)
        }
    }
    const onChangeTicketUser = (item) => {
        try {
            fetch(localhost() + "/tickets/changeticket/user", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ticketID: item.ticketID,
                    userID: item.userID,
                    newUser: newUser,
                })
            }).then((response) => response.json())
                .then((responseData) => {
                    if (responseData == "CANTFINDUSER") {

                        return alert(handleApp.isLanguage == false ? "ERROR: Không tìm thấy username" : "ERROR: Username not found");
                    }
                    if (responseData == "SUCCESS") {
                        setModalVisible(false);
                        alert(handleApp.isLanguage == false ? "Chuyển vé sang tài khoản khác thành công" : "Transfer tickets to another account success")
                        return navigation.push("DrawerTab")
                    }
                })
                .then()
        } catch (error) {
            alert("ERROR: " + error)
        }
    }
    function getCardTickets(item) {
        return (
            <TouchableOpacity style={{ width: "96%", height: 220, marginLeft: '2%', backgroundColor: '#3399FF', marginTop: '5%', borderRadius: 20, borderWidth: 0.5, borderColor: "black" }} onPress={() => OptionsAlert(item)}>
                <LinearGradient colors={['#66CCFF', '#66CCFF', '#66CCFF', '#66CCFF', '#66CCFF', '#66CCFF', '#66CCFF']}
                    start={{ x: 0.1, y: 0 }}
                    end={{ x: 0.9, y: 0 }}
                    style={{ borderRadius: 20, borderWidth: 0.5, borderColor: 'orange' }}>
                    <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../images/christmasFlower.png')}>
                        <View style={{ flex: 6, flexDirection: 'row', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                            <View style={{ flex: 11, borderTopLeftRadius: 30, justifyContent: 'center', borderBottomWidth: 0.7 }}>
                                <Text style={{ left: '10%', fontSize: 23, fontWeight: 'bold' }}> {handleApp.isLanguage == false ? "Vé xem phim" : "Ticket"}</Text>
                            </View>
                            <Animated.Image
                                style={{
                                    flex: 2,
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    transform: [{ rotate: spin }]
                                }}
                                source={require('../images/HoaTuyet.png')}
                            />
                            <View style={{ flex: 1, borderTopRightRadius: 30 }}>

                            </View>
                        </View>
                        <View style={{ flex: 2, marginTop: '2%', marginLeft: '5%', marginRight: '2%' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {handleApp.isLanguage == false ? "Phim" : "Film"}:
                                <Text style={{ fontWeight: 'normal' }}> {handleApp.isLanguage == false ?
                                    item.filmName.length > 25 ?
                                        (item.filmName.trim().substring(0, 25) + "...")
                                        :
                                        (item.filmName.trim())
                                    :
                                    item.filmName1.length > 25 ?
                                        (item.filmName1.trim().substring(0, 25) + "...")
                                        :
                                        (item.filmName1.trim())
                                }</Text>
                            </Text>
                        </View>
                        <View style={{ flex: 2, marginTop: '2%', marginLeft: '5%', marginRight: '2%' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {handleApp.isLanguage == false ? "Mã vé:" : "Ticket code:"}
                                <Text style={{ fontWeight: 'normal' }}> {item.ticketID}</Text>
                            </Text>
                        </View>
                        <View style={{ flex: 2, marginTop: '2%', marginLeft: '5%', marginRight: '2%' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {handleApp.isLanguage == false ? "Thời gian:" : "Time:"}
                                <Text style={{ fontWeight: 'normal' }}> {customDateTime(item.showTime).datetime}</Text>
                            </Text>
                        </View>
                        <View style={{ flex: 2, marginTop: '2%', marginLeft: '5%', marginRight: '2%' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                Room:
                                <Text style={{ fontWeight: 'normal' }}> {item.roomName}</Text>
                            </Text>
                        </View>
                        <View style={{ flex: 2, marginTop: '2%', marginLeft: '5%', marginRight: '2%' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {handleApp.isLanguage == false ? "Địa điểm:" : "Branch:"}
                                <Text style={{ fontWeight: 'normal' }}> {handleApp.isLanguage == false ? item.cinemaName : item.cinemaName1}</Text>
                            </Text>
                        </View>
                        <View style={{ flex: 2, marginTop: '2%', marginLeft: '5%', marginRight: '2%', marginBottom: '3%' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {handleApp.isLanguage == false ? "Số ghế:" : "Chair number:"}
                                <Text style={{ fontWeight: 'normal', color: 'red', fontWeight: 'bold' }}> {item.ticketName}</Text>
                            </Text>
                        </View>

                    </ImageBackground>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
    function popupChangeUser(item) {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={[styles.popupTrailerCard, { marginTop: "40%", maxHeight: "50%" }]}>
                    <ImageBackground style={styles.modelPopupTrailer} source={require('../images/christmasFlower.png')}>
                        <View style={{ height: '70%', width: "100%" }}>
                            <View style={{ height: "30%", marginTop: '10%' }}>
                                {flagCheckUser == false ?
                                    <View style={{ height: "70%", width: "90%", borderWidth: 1, marginLeft: "5%", backgroundColor: "white" }}>
                                        <View style={{ height: '100%', marginLeft: '3%', justifyContent: 'center' }}>
                                            <TextInput placeholder={handleApp.isLanguage == false ? "Nhập tên tài khoản nhận vé." : "Enter the account name to receive the ticket."} onChangeText={setNewUser}>
                                            </TextInput>
                                        </View>
                                    </View> :
                                    <TouchableOpacity style={{ height: "70%", width: "90%", borderWidth: 1, marginLeft: "5%", backgroundColor: "#DDDDDD" }} onPress={() => { setFlagCheckUser(false); setMessageModal(""), setNewUser(""), setMessageCheck(handleApp.isLanguage == false ? "Kiểm tra tài khoản" : "Check account") }}>
                                        <View style={{ height: '100%', marginLeft: '3%', justifyContent: 'center' }}>
                                            <Text placeholder={handleApp.isLanguage == false ? "Nhập tên tài khoản nhận vé." : "Enter the account name to receive the ticket."}>
                                                {newUser + "          "}<Text style={{ fontSize: 10, color: "red" }}>Click to clean</Text>
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </View>
                            <View style={{ alignItems: 'center', width: '100%', height: '100%' }}>
                                {
                                    messageCheck == "Kiểm tra tài khoản" || messageCheck == "Check account" ?
                                        <Pressable

                                            onPress={() => {setMessageCheck(handleApp.isLanguage==false?"Đang kiểm tra":"Checking"),findUserName(item)}}
                                            style={{ width: "45%", height: '25%', backgroundColor: 'yellow', borderWidth: 1, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <Text style={styles.titleContentText}>{messageCheck}</Text>
                                        </Pressable> 
                                        :
                                        <View

                                            style={{ width: "45%", height: '25%', backgroundColor: 'red', borderWidth: 1, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <Text style={styles.titleContentText}>{messageCheck}</Text>
                                        </View>


                                }
                                {messageModal.length == 0 ? "" : messageModal.map(item =>
                                    <View>
                                        <Text style={{ fontWeight: 'bold', marginTop: '2%' }}>{handleApp.isLanguage == false ? "Mã khách hàng: " : "Customer code: "}
                                            <Text style={{ fontWeight: 'normal' }}>{item.userID.substring(0, 13)}</Text>
                                        </Text>
                                        <Text style={{ fontWeight: 'bold', marginTop: '2%' }}>{handleApp.isLanguage == false ? "Họ tên: " : "Full name: "}
                                            <Text style={{ fontWeight: 'normal' }}>{item.fullName}</Text>
                                        </Text>
                                        <Text style={{ fontWeight: 'bold', marginTop: '2%' }}>{handleApp.isLanguage == false ? "Số điện thoại: " : "Phone: "}
                                            <Text style={{ fontWeight: 'normal' }}>{item.phone}</Text>
                                        </Text>

                                    </View>

                                )
                                }
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            {flagCheckUser ?
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => AlertConfirm(itemModel)}
                                >
                                    <Text style={styles.titleContentText}>{handleApp.isLanguage == false ? "Chuyển" : "Tranfer"}</Text>
                                </Pressable>
                                :
                                <Pressable
                                    style={[styles.button, styles.buttonClose, { backgroundColor: 'red' }]}
                                    onPress={() => alert(handleApp.isLanguage == false ? "Vui lòng kiểm tra tài khoản trước" : "Please check username before")}
                                >
                                    <Text style={styles.titleContentText}>{handleApp.isLanguage == false ? "Chuyển" : "Tranfer"}</Text>
                                </Pressable>
                            }
                            <Pressable
                                style={[styles.button, styles.buttonClose, { marginLeft: '3%' }]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.titleContentText}>{handleApp.isLanguage == false ? "Đóng" : "Close"}</Text>
                            </Pressable>
                        </View>
                    </ImageBackground>

                </View>
            </Modal>
        );
    }
    return (
        <LinearGradient colors={['#66FFFF', '#66FFFF', '#CCFFFF', '#CCFFFF', '#CCFFFF', '#CCFFFF', '#CCFFFF', '#66FFFF', '#66FFFF']}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.7, y: 1 }} style={styles.linearBackground}>
            {popupChangeUser(itemModel)}
            {
                isLoading ?
                    <View style={{ alignItems: 'center', marginTop: '10%' }}>
                        <Image source={require('../images/iconLoading.gif')} style={{ maxWidth: '20%', maxHeight: '20%', display: 'block' }}></Image>
                        <Text style={{ marginTop: '5%', fontSize: 20, fontWeight: 'bold' }}> Loading...</Text>
                    </View>
                    :
                    <View>
                        <ScrollView>
                            {
                                bookedTickets.length < 1 ?
                                    <View style={{ alignItems: 'center', marginTop: '20%' }}>
                                        <Text style={{ fontSize: 30, fontWeight: 'bold', fontFamily: 'Chalkduster' }}>{handleApp.isLanguage == false ? "Bạn chưa đặt vé" : "You don't have ticket"}</Text>
                                    </View>
                                    :
                                    bookedTickets.map(ticket => getCardTickets(ticket))
                            }
                        </ScrollView>
                    </View>
            }
        </LinearGradient>
    );
}