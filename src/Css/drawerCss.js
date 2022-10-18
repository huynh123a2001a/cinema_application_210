import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
export default styles = StyleSheet.create({
    drawerMain:{
        flex:1,
    },
    drawerContent: {
        flex:1,
    },
    userAvatar:{
        justifyContent:'center',
        alignItems:'center',
    },
    userInfo:{
        top:5,
    },
    title:{
        fontSize:16,
        marginTop:3,
        fontWeight:'blod',
    },
    row:{
        marginTop:'5%',
        flexDirection:'row',
        alignItems:'center',
    },
    section:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:15,
    },
    paragraph:{ 
        fontWeight:'bold',
        marginRight:3,
    },
    drawerSection:{
        marginTop: 10,

    },
    bottomDrawerSection:{
        marginBottom:15,
        borderTopColor:"f4f4f4",
        borderTopWidth:1,
    },
    preference:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:12,
        paddingHorizontal:16,
        alignItems:'center',
    },
    logoDrawer:{
        maxWidth:'100%',
        maxHeight:130,
        width:'100%',
        height:'100%',
    }
});