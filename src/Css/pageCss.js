import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
export default styles = StyleSheet.create({
    container:
    {
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
    },
    header:{
        marginBottom:'auto',
        width:'100%',
        height:'15%',
        borderWidth:1,
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'row',
    },
    drawerbar:{
        width:'100%',
        height:'10%',
        borderWidth:1,
    },
    drawer:{
        flex:1,
        height:'50%',
        marginLeft: 'auto',
        display:'block',
        borderWidth:1,
    },
    logo:{
        flex:3,
        width:'auto',
        height:'100%',
        borderWidth:1,
    },
    pagename:{
        flex:4,
        height:'100%',
        borderWidth:1,
    },
    footer:{
        marginTop:'auto',
        borderWidth:2,
        height:'10%',
        width:'100%',
    },
    card: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        width: '80%',
        marginTop: '5%',
        borderRadius: 20,
        maxHeight: 380,
        paddingBottom: '30%',
        opacity: 0.92,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '40%',
        marginTop: '15%',
        marginBottom: '30%',
        color:'black',
        fontStyle:'italic',
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: '5%',
    },
    inputs: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10%',
    },  
    input: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingTop: 10,
        fontSize: 16, 
        minHeight: 40,
    },
    button: {
        width: '80%',
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonAlt: {
        width: '80%',
        height: 40,
        borderRadius: 50,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonAltText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
    logoLogin:{
        display:'block',
        maxWidth:220,
        maxHeight:300,
        marginTop:'5%',
        width:220,
        height:160,
    },
    linearBackground:{
        width:'100%',
        height:'100%',
        position:'absolute',
    },
    indexStyle:{
        width:'100%',
        height:'100%',
    },
    filmsCard:{
        width:'98%',
        height:400,
        marginTop:'5%',
        borderRadius:50,
        alignItems:'center',
        backgroundColor:'rgba(255,255,255,0.4)',
        marginLeft:'1%',
        borderWidth:0.5,
    },
    topFilmsCard:{
        flex:3,
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        width:1800,
        height:1800,
        maxWidth:'100%',
        maxHeight:'100%',
    },
    bottomFilmsCard:{
        flex:2,
        maxWidth:'100%',
        maxHeight:'100%',
        alignItems:'center',
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50,
        width:1000,
        height:1000,
    },
    itemBottomCard:{
        maxWidth:'85%',
        maxHeight:'85%',
        width:1000,
        height:1000,
        alignItems:'left',
    },
    otherContent:{
        marginTop:'2%',
        maxWidth:'65%',
        maxHeight:'14%',
    },
    otherContentText:{
        fontSize:10,
    },
    titleTextCard:{
        width:'100%',
        height:'30%',
        fontWeight:'bold',
        alignItems:'center',

    },
    titleText:{
        fontWeight:'bold',
        fontSize:20,
    },
    titleContentText:{
        marginTop:'2%',
        fontWeight:'bold',
        fontSize:14,
    },
    contentTextCard:{
        fontSize:14,
        fontWeight:'normal',
    },
    mainCard:{
        display:'block',
        borderWidth:0.3,
        marginTop:'5%',
        borderRadius:50,
        maxWidth:'100%',
        width:'auto',
        height:500,
        backgroundColor:'rgba(254,254,254,0.4)',
        shadowColor: "#000",
        shadowOffset: {
        width: 100,
        height: 12
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5
    },
    imageNews:{
        flex:5,
        backgroundColor:'#999999',
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
    },
    titleNews:{
        flex:1,
        maxWidth:'100%',
        marginLeft:'5%',
        marginRight:'5%',
    }, 
    contentNews:{
        flex:2,
        marginLeft:'5%',
        marginRight:'5%',
        marginBottom:'3%',
    },
    filmContentIndex:{
        width:'100%',
        height:'100%',
    },
    filmContentImage:{
        flex:2.5,
        borderRadius:30,
        opacity:0.8,
    },
    filmContentImagePlay:{
        width:'100%',
        height:'100%',
        position:'relative',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#444444',
        opacity:0.6,
    },
    filmContentTitle:{
        flex:1,
        alignItems:'center',
        borderBottomWidth:0.5,
        height:'auto'
    },
    textContentTitle:{
        fontSize:30,
        fontWeight:'bold',
    },
    filmContent:{
        flex:4,
        marginTop:'3%',
    },
    alignBookTickets:{
        justifyContent:'center',
        alignItems:'center',
        borderTopWidth:1,
    },
    bookTickets:{
        width:150,
        height:50,
        backgroundColor:'orange',
        marginTop:'2%',
        marginBottom:'2%',
        borderRadius:20,
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
    },
    textButton:{
        fontSize:19,
        fontWeight:'bold',
    },
    showTimesCard:{
        width:'96%',
        height:280,
        borderWidth:0.5,
        marginTop:'5%',
        marginLeft:'2%',
        borderRadius:20,
        backgroundColor:'rgba(255,236,139,0.7)',
    },
    showTimesCinema:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#D2691E',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        borderBottomWidth:1,
    },
    textShowTimesCinema:{
        color:'#fff',
        fontSize:20,
        fontWeight:'bold',
        marginLeft:'3%'
    },
    showTimes:{
        flex:4,
    },
    showTimesTitle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#D2691E',
        borderTopWidth:1,
    },
    textShowTimesTitle:{
        color:'white',
        fontSize:18,
        fontWeight:'bold',
    },
    showTimesContent:{
        flex:4,
        maxWidth:'95%',
        flexDirection:'row',
        flexDirection:'column',
    },
    showTimesContentRow:{
        flexDirection:'row',
    },
    buttonShowTimes:{
        width:80,
        height:40,
        backgroundColor:'green',
        marginTop:'10%',
        marginLeft:'10%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        borderWidth:0.3,
    },
    textContentShowTimes:{
        fontSize:16,
        fontWeight:'bold',
        
    },
    boxContent:{
        flex:1, 
        flexDirection:'row',
        marginLeft:'3%',
    },
    popupTrailerCard:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modelPopupTrailer:{
    margin: 20,
    width:'100%',
    height:'100%',
    maxWidth:'100%',
    maxHeight:'100%',
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    },
    buttonClose: {
        width:120,
        backgroundColor: "#2196F3",
        marginTop:'5%',
    },
    videoTrailer:{
        maxWidth:'100%',
        maxHeight:'100%',
        width:1300,
        height:400,
        top:'20%',
    },
    buttonChooseChair:{
        width:'95%',
        height:'90%',
        alignItems:'center', 
        justifyContent:'center',
        borderRadius: 30,
        borderWidth:1,
    },
    hiddenChair:{
        width:'90%',
        height:'90%',
        alignItems:'center', 
        justifyContent:'center',
        borderRadius: 40,
    },
    branchName:{
        width:'100%',
        height:'100%',
        alignItems:'flex-start',
        justifyContent:'center',
        borderRadius:20,
    },
    textBranchName:{
        paddingLeft:'5%',
        paddingRight:'5%',
        paddingTop:'5%',
        paddingBottom:'5%',
        marginLeft:"5%",
        color:'#EEEE00',
        fontWeight:'bold',
        fontSize:24,
        textShadowColor:'#000000',
        textShadowOffset:{width: 4, height: 3},
        textShadowRadius:8,
    },
});