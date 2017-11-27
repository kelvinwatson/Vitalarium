export function convertTimeStampToDate(unixTimeStamp){
  let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var d = new Date(unixTimeStamp);
  return d.getDate() + '-' + (monthNames[d.getMonth()]) + '-' + d.getFullYear();
}
