export default function(time)
{
    var DateTime =({})
    try{
        DateTime.datetime = time.substring(8,10)+"/"+time.substring(5,7)+"/"+time.substring(0,4)+" "+(parseInt(time.slice(11,13))+7)+time.substring(13,16);
        DateTime.time = (parseInt(time.slice(11,13))+7)+time.substring(13,16);
        DateTime.date = time.substring(8,10)+"/"+time.substring(5,7)+"/"+time.substring(0,4);
        DateTime.onlyTime = (parseInt(time.slice(0,2))+7)+time.slice(2,5);
        DateTime.datetimeNormal = time.substring(8,10)+"/"+time.substring(5,7)+"/"+time.substring(0,4)+" "+(parseInt(time.slice(11,13))+7>=24?((parseInt(time.slice(11,13))+7)-24)<10?"0"+((parseInt(time.slice(11,13))+7)-24):(parseInt(time.slice(11,13))+7)-24:parseInt(time.slice(11,13))+7)+time.substring(13,16);
        return DateTime;
    }
    catch
    {
        return console.log("Not custom Datetime")
    }
    
}