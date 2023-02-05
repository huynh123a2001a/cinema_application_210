import { StyleSheet, Text, View, TouchableOpacity, Animated, ActivityIndicator, ScrollView, Image } from 'react-native';
import {React} from 'react-native';
import { useState,useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../Css/pageCss';
import localhost from '../Route/configIP';
import NumericInput from 'react-native-numeric-input';
import handleApp from '../Handle/setHandleApp.json';
export default function FoodsView({navigation,route})
{
    const routeData = route.params;
    const [isLoading, setLoading] = useState(true);
    const [foodData, setFoodData] = useState([]);
    const [comboData, setComboData] = useState([]);
    const itemsFood = ([]);
    const getFoods = async () => {
        try {
         const responsefood = await fetch(localhost()+"/foods");
         const jsonfood = await responsefood.json();
         setFoodData(jsonfood);
         const responsecombo = await fetch(localhost()+"/combos");
         const jsoncombo = await responsecombo.json();
         setComboData(jsoncombo);
       } catch (error) {
         console.error(error);
       } finally {
         setLoading(false);
       }
     }
     useEffect(() => {
        getFoods();
     }, []);
    const onChangeCombo = (itemID, itemName, itemquantity, itemPrice) =>
    {
        try {
            itemsFood.map(item => {if(item.comboID==itemID){item.quantity=itemquantity,item.comboName=itemName}})
        }
        catch(err){
            console.log(err)
        }
    }
    const onChangeFood = (itemID, itemName, itemquantity, itemPrice) =>
    {
        try {
            itemsFood.map(item => {if(item.foodID==itemID){item.quantity=itemquantity;item.foodName=itemName}})
         }
         catch(err){
             console.log(err)
         }
    }
    function onBill(itemsFood)
    {
        const data = itemsFood.filter(function(item)
        {
            return item.quantity>0
        })
        routeData.foods = data;
        handleApp.isLanguage==false?
            navigation.navigate("Thanh toán", routeData)
            :
            navigation.navigate("Payment", routeData)
    }
    const getCardFoods = (item) =>
    {
        try {
        itemsFood.push(item.foodID?{foodID:item.foodID,foodName:item.foodName, foodPrice:item.foodPrice, quantity:0}:{comboID:item.comboID,comboName:item.comboName, comboPrice:item.comboPrice, quantity:0})
        return(
            <View style={{flex:1, maxWidth:'44%', height:280, marginLeft:"3%", marginRight:'3%', borderRadius:15,backgroundColor:'orange', opacity:0.87, borderWidth:1}}>
                    <View style={{flex:2.5, borderBottomWidth:0.5}}>
                        <Image style={{maxWidth:'100%', maxHeight:'100%', width:'100%', height:'100%', borderTopRightRadius:15,borderTopLeftRadius:15}} source={{
                            uri: (item.imageFood?item.imageFood:item.imageCombo)}}>
                        </Image>
                    </View>
                    <View style={{flex:2, borderBottomRightRadius:15,borderBottomLeftRadius:15}}>
                        <View style={{flex:1.5,alignItems:'center', marginTop:'5%', marginLeft:'2%', marginRight:'2%'}}>
                            <Text style={styles.contentText}>{item.foodName?item.foodName:item.comboName}</Text>
                        </View>
                        <View style={{flex:0.5,backroundColor:'red', alignItems:'center'}}>
                            <Text style={styles.titleContentText}>{handleApp==false?"Giá:":"Price:"} {item.foodPrice?item.foodPrice:item.comboPrice} </Text>
                        </View>
                        <View style={{flex:1,backroundColor:'red', alignItems:'center', marginTop:'2%'}}>
                        <NumericInput onChange={value => item.foodID?onChangeFood(item.foodID,item.foodName,value,item.foodPrice):onChangeCombo(item.comboID,item.comboName,value,item.comboPrice)}
                        totalWidth={80} 
                        totalHeight={30}
                        minValue={0}
                        maxValue={49}
                        borderColor={"orange"}
                        leftButtonBackgroundColor={"#EE7C6B"}
                        rightButtonBackgroundColor={"#33FFFF"}/>
                        </View>
                    </View>
            </View>
        )
        }
        catch(err)
        {console.log(err)}
    }
    function getViewFoods()
    {
        try {
        const getTable = [];
        var getColumns =[];
        let keycolumn=0;
        const foodsData=[];
        comboData.map(item => foodsData.push(item))
        foodData.map(item => foodsData.push(item))
        if(handleApp.isLanguage==false){
            for (let i =0; i<foodsData.length;i++)
            {
                if(i!=0 && i%2==0)
                {
                    getTable.push(getColumns);
                    getColumns=[];
                }
                foodsData[i].comboID?
                    getColumns.push({comboID:foodsData[i].comboID,comboName:foodsData[i].comboName,comboPrice:foodsData[i].comboPrice, imageCombo:foodsData[i].imageCombo, status:foodsData[i].status })
                    :
                    getColumns.push({foodID:foodsData[i].foodID, foodName:foodsData[i].foodName, foodPrice:foodsData[i].foodprice,imageFood:foodsData[i].imageFood,status:foodsData[i].status})
                if(i==foodsData.length-1 && getColumns.length > 0)
                {
                    getTable.push(getColumns);
                }
            }
        }
        else {
            for (let i =0; i<foodsData.length;i++)
            {
                if(i!=0 && i%2==0)
                {
                    getTable.push(getColumns);
                    getColumns=[];
                }
                foodsData[i].comboID?
                    getColumns.push({comboID:foodsData[i].comboID,comboName:foodsData[i].comboName1,comboPrice:foodsData[i].comboPrice, imageCombo:foodsData[i].imageCombo, status:foodsData[i].status })
                    :
                    getColumns.push({foodID:foodsData[i].foodID, foodName:foodsData[i].foodName1, foodPrice:foodsData[i].foodprice,imageFood:foodsData[i].imageFood,status:foodsData[i].status})
                if(i==foodsData.length-1 && getColumns.length > 0)
                {
                    getTable.push(getColumns);
                }
            }
        }
        return(
            getTable.map((index) =>
                <View style={{maxWidth:'100%', height:'auto', flexDirection:'row', marginTop:'5%'}}>
                    {
                    index.map((item) =>
                        {
                            if(item.status==1)
                                return getCardFoods(item)
                        }
                    )
                    }
                </View>
            )
        );
        }
        catch (e){
            console.log(e)
        }
    }
    return(
        <LinearGradient colors={['#000077','#000088','#0000AA','#0000DD','#00ABBB', '#0000DD','#0000AA','#000088', '#000077']}
        start={{ x: 0.1, y: 0 }}
        end={{x: 0.7, y:1}} style={styles.linearBackground}>
            <ScrollView>
            {getViewFoods()}
            </ScrollView>
            <View style={{width:'100%', height:'10%', backgroundColor:"blue", alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity style={{width:120, height:40, backgroundColor:"yellow",alignItems:'center', justifyContent:'center', borderRadius:15}} onPress={() => onBill(itemsFood)}>
                    {handleApp.isLanguage==false?
                        <Text style={styles.titleText}>Thanh toán</Text>
                    :
                        <Text style={styles.titleText}>Payment</Text>}
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}