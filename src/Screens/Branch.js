import { StyleSheet, Text, View,TouchableOpacity, ScrollView} from 'react-native';
import {React} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../Css/pageCss';
export default function BranchView({navigation, route})
{
    const branchData = route.params;
    const  branchs = [
        {
            id:1,
            brachName:"Bình thạnh",
        },
        {
            id:2,
            brachName:"Sóc trăng",
        },
        {
            id:3,
            brachName:"Đà nẵng",
        },
        {
            id:4,
            brachName:"Quảng Nam",
        },
        {
            id:5,
            brachName:"Hà Nội",
        },
        {
            id:6,
            brachName:"Hoàng Sa",
        },
        {
            id:7,
            brachName:"Trường Sa",
        },
    ]
    function onShowTimeScreen(id,name)
    {
        branchData.branchId=id;
        branchData.branchName=name;
        console.log("ID Branch: "+branchData.branchId);
        return navigation.navigate("Lịch chiếu",branchData);
    }
    function showBranch()
    {
        return(
        branchs.map((datashow)=>
            <TouchableOpacity key={datashow.id} style={[styles.showTimesCard,{height: 100}]} onPress={() => onShowTimeScreen(datashow.id,datashow.brachName)}>
               <View style={styles.branchName}>
                    <Text style={styles.textBranchName}>Cinema: {datashow.brachName}</Text>
               </View>
            </TouchableOpacity>
        )
        )
    }
    return(
        <LinearGradient style={styles.filmContentIndex} colors={['#000066','#3300FF','#0099FF','#0099FF','#33CCFF', '#0099FF','#0099FF','#3300FF', '#000066']}
        start={{ x: 0.1, y: 0 }}
        end={{x: 0.7, y:1}}>
            <ScrollView>
                {showBranch(branchs)}
            </ScrollView>
        </LinearGradient>
    );
}