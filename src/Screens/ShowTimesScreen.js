import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Table, ActivityIndicator } from 'react-native';
import { React } from 'react-native';
import styles from '../Css/pageCss';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import localhost from '../Route/configIP';
import handleApp from '../Handle/setHandleApp.json';
import customDateTime from '../Handle/customDateTime';
export default function ShowTimesView({ navigation, route }) {
    const routeData = route.params;
    const [isLoading, setLoading] = useState(true);
    const [showTimesData, setShowTimesData] = useState([]);
    const getTimes = ([]);
   
    const getShowTimes = async () => {
        try {
            fetch(localhost() + "/showtimes", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cinemaID: routeData.cinemaID,
                    filmID: routeData.filmID,
                })
            }).then((response) => response.json())
                .then((responseData) => {
                    setShowTimesData(responseData);
                })
                .then()
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getShowTimes();
    }, []);
    console.log(showTimesData)
    function setTime(value) {
        for (let j = 0; j < getTimes.length; j++) {
            if (value.slice(0, value.indexOf("T")) == getTimes[j])
                return;
        }
        return getTimes.push(value.slice(0, value.indexOf("T")));
    }
    const getTime = (showTimesData) => {
        showTimesData.map(data => setTime(data.showTime))
    }

    const getCardFilm = (value) => {
        return (

            <View style={{ width: "100%", height: "100%", }}>
                {value.map(item =>
                    <View style={styles.showTimesCard} key={item}>
                        <LinearGradient style={styles.showTimesCinema} colors={['#8B6914', '#B8860B', '#CD950C', '#DAA520', '#CDAD00', '#FFFF00']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}>
                            <Text style={styles.textShowTimesCinema}>{routeData.cinemaName}</Text>
                        </LinearGradient>
                        <View style={styles.showTimes}>
                            <View style={styles.showTimesTitle}>
                                <Text style={styles.textShowTimesTitle}> {(customDateTime(item).date)}</Text>
                            </View>
                            <View style={styles.showTimesContent}>
                                <ScrollView>
                                    {getTableShowTimes(item)}
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        )
    }

    const getChair = (id, number, roomID, roomName, priceTicket) => {
        routeData.scheduleID = id;
        routeData.showTime = number.slice(number.indexOf("T") + 1, number.indexOf("Z") - 7);
        routeData.showDate = number.slice(0, number.indexOf("T"))
        routeData.roomID = roomID;
        routeData.roomName = roomName;
        routeData.priceTicket = priceTicket;
        console.log("ShowtimeID: " + routeData.scheduleID);
        handleApp.isLanguage == false ?
            navigation.navigate("Đặt vé", routeData)
            :
            navigation.navigate("Tickets", routeData)
    }
    const getColumnShowTimes = (number, id, roomID, roomName, priceTicket) => {
        return (
            <TouchableOpacity key={id} onPress={() => getChair(id, number, roomID, roomName, priceTicket)} >
                <View style={styles.buttonShowTimes} key={id}>
                    <Text style={styles.textContentShowTimes}>
                        {customDateTime(number).time}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
    const getTableShowTimes = (day) => {
        const tableShowData = ([])
        showTimesData.map(value => { if (value.showTime.slice(0, value.showTime.indexOf("T")) == day) return tableShowData.push(value) }
        )
        const getTable = [];
        var getColumns = [];
        let keycolumn = 0;

        for (let i = 0; i < tableShowData.length; i++) {
            if (i != 0 && i % 3 == 0) {
                getTable.push(getColumns);
                getColumns = [];
            }
            getColumns.push({ showTime: tableShowData[i].showTime, showTimeID: tableShowData[i].scheduleID, roomID: tableShowData[i].roomID, roomName: tableShowData[i].roomName, priceTicket: tableShowData[i].priceTicket })
            if (i == tableShowData.length - 1 && getColumns.length > 0) {
                getTable.push(getColumns);
            }
        }

        return (
            getTable.map((index) =>
                <View style={styles.boxContent} key={keycolumn++}>
                    {
                        index.map((item) =>
                            <Text key={item.scheduleID}>{getColumnShowTimes(item.showTime, item.showTimeID, item.roomID, item.roomName, item.priceTicket)}</Text>
                        )
                    }
                </View>
            )
        );
    }
    return (
        <LinearGradient style={styles.filmContentIndex} colors={['#000066', '#3300FF', '#0099FF', '#0099FF', '#33CCFF', '#0099FF', '#0099FF', '#3300FF', '#000066']}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.7, y: 1 }}>
            {getTime(showTimesData)}
            {isLoading ?
                <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
                :
                <ScrollView>
                    {getCardFilm(getTimes)}
                </ScrollView>
            }
        </LinearGradient>
    );
}