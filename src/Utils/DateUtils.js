export function convertDateMillsecondsToHyphenatedMonthName(milliseconds){
  let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var d = new Date(milliseconds);
  return d.getUTCDate() + '-' + (monthNames[d.getUTCMonth()]) + '-' + d.getUTCFullYear();
}

export function convertDateMillsecondsToHyphenated(milliseconds){
  let d = new Date(milliseconds),
    month = '' + (d.getUTCMonth() + 1),
    day = '' + d.getUTCDate(),
    year = d.getUTCFullYear();
  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  return [year, month, day].join('-');
}

export function convertDateHyphenatedToMilliseconds(hyphenatedDate){
  return new Date(hyphenatedDate).getTime();
}
