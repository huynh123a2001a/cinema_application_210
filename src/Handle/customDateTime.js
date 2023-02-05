export default function(time)
{
    var DateTime =({})
    try{
        DateTime.datetime = time.substring(8,10)+"/"+time.substring(5,7)+"/"+time.substring(0,4)+" "+time.substring(11,16);
        DateTime.time = time.substring(11,16);
        DateTime.date = time.substring(8,10)+"/"+time.substring(5,7)+"/"+time.substring(0,4);
        return DateTime;
    }
    catch
    {
        return console.log("Not custom Datetime")
    }
    
}