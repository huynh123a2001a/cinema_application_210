import { ActivityIndicator, Text, View,TouchableOpacity, RefreshControl} from 'react-native';
import {React} from 'react-native';
import styles from '../Css/pageCss';
import fetchlocal from '../Route/configIP'
import handleApp from '../Handle/setHandleApp.json'
import { useState, useEffect, useCallback } from 'react';
export default function TestView({navigator})
{ 
  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);
  function refreshControl()
  {
    try{
      onRefresh(onRefresh)
      setRefreshing(!refreshing)
    }
    catch (e)
    {
      console.log(e)
    }
  }
  return(
    <View style={styles.container}>
      <TouchableOpacity style={{width:200, height:100, backgroundColor:'red', borderRadius:15,borderWidth:1, alignItems:'center',justifyContent:'center'}}
      onPress={() => refreshControl()}
      >
        <Text style={{color:'white', fontWeight:'bold'}}>onClick Call function: {refreshing.toString()}</Text>
      </TouchableOpacity>
    </View>
  )
}