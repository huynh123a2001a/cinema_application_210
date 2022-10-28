export default function getDataChairs (arrayString,arrayNumber,chairsData)
{

const getChairString = [];
const getChairNumber = [];
const getTableChairs = async () =>
 {
  try{
    chairsData.map(
    data =>
    {
      getChairString.push(data.chairName.slice(data.chairName.trim().length-1,data.chairName.trim().length));
      getChairNumber.push(data.chairName.slice(0,data.chairName.trim().length-1));
    }
  )
  getChairString.map(item => mergeString(item,arrayString))
  getChairNumber.map(item => mergeString(parseInt(item),arrayNumber))
  arrayString.sort()
  arrayNumber.sort(function(a, b) {
    return a - b;
  })
  }
  catch(err)
  {
    console.log(err.toString())
  }
 }
 function mergeString(value, arr)
     {
        for (let j=0;j<arr.length;j++)
            {
                if(value==arr[j])
                    return;
            }
        return arr.push(value);
    }
    getTableChairs();
    return (arrayString,arrayNumber)
}