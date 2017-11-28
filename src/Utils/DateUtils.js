export function convertTimeStampToDate(unixTimeStamp){
  let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var d = new Date(unixTimeStamp);
  return d.getDate() + '-' + (monthNames[d.getMonth()]) + '-' + d.getFullYear();
}

export function formatDateHyphen(date){
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  return [year, month, day].join('-');
}
