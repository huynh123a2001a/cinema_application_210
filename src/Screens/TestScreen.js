import { StyleSheet, Text, View,TouchableHighlight, Button} from 'react-native';
import styles from '../Css/pageCss';
import React, { useState, useEffect, useRef } from 'react';  
export default function TestView()
{   
    var [ isPress, setIsPress ] = useState(false);
    const [data,setData] = useState([
        {
            id: 1,
            boolValue: false,
            stringText: ''
        },
        {
            id: 2,
            boolValue: false,
            stringText: ''
        },
        {
            id: 3,
            boolValue: false,
            stringText: ''
        },
        {
            id: 4,
            boolValue: false,
            stringText: ''
        },
        {
            id: 5,
            boolValue: false,
            stringText: ''
        },
        {
            id: 6,
            boolValue: false,
            stringText: ''
        }
    ])
    
    const changeValue = (item) =>
    {
        try{
            
        data.filter(value => value.id == item.id?value.boolValue=!value.boolValue:'')
        console.log(data)
        }
        catch(e)
        {
            console.log(e)
        }
    }
    function createButton (item)
    {
        var touchProps = {
            activeOpacity: 1,
            underlayColor: 'blue',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
            style: item.boolValue ? stylesz.btnPress : stylesz.btnNormal, // <-- but you can still apply other style changes
            onHideUnderlay: () => setIsPress(false),
            onShowUnderlay: () => setIsPress(true),
            onPress: () => console.log('HELLO'),                 // <-- "onPress" is apparently required
          }
        return(
            <View style={{width:140, height:50, borderWidth:1, marginTop:'5%'}} key={item.id}>
                <TouchableHighlight {...touchProps}  onPress={() => changeValue(item)}>
                    <Text>{item.id}</Text>
                </TouchableHighlight>
            </View>
        )
    }
    return(
        <View style={styles.container}>
            {data.map(item=>createButton(item))}
        </View>
    );
}
var stylesz = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnNormal: {
      width:'100%',
      height:'100%',
      backgroundColor:'yellow'
    },
    btnPress: {
        width:'100%',
        height:'100%',
        backgroundColor:'blue'
    }
  });