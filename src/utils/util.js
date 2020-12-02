export const parseTime = (time) => {
  if( time > 60 * 60) { // has hour
    let hr = time / 3600;
    let rest = time % 3600;
    let min = Math.floor(rest / 60);
    let sec = Math.round(rest % 60);
    return hr + " : " + formatSeconds(min) + " : " + formatSeconds(sec);
  } else { // no hour, just min and sec
    let min = Math.floor(time / 60);
    let sec = Math.round(time % 60);
    return formatSeconds(min) + " : " + formatSeconds(sec);
  }
}

const formatSeconds = (sec) => {
  return sec > 9 ? "" + sec : "0" + sec;
}

export const formatToHourMinute = (minutes) => {
  let hr = Math.floor(minutes / 60);
  let min = minutes % 60;
  return (hr > 0 ? (hr + "h") : "") + (min + "m");
}

// convertDateToSeq: count how many days between two dates; 
// console.log(convertDateToSeq(2020, 1, 29)); // 29 + 31 = 60
export const convertDateToSeq = (y, m, d) => {
  const startYear = 2020;
  const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let res = 0;
  let year = startYear;
  let month = 0;
  while (year < y) {
    res += year % 4 === 0 ? 366 : 365;
    year++;
  }
  while (month < m - 1) {
    if (y % 4 === 0 && month === 1) {
      res += months[month] + 1;
    } else {
      res += months[month];
    }
    month++;
  }
  return res + d;
}

// alternative function of convertDateToSeq
export const convertDateToSeq2 = (y, m, d) => {
  const days2020 = new Date(2020, 1 - 1, 1);
  let days = new Date(y, m - 1, d);
  let res = 0;
  res = (days - days2020) / (24 * 60 * 60 * 1000);
  return res;
}

export const serializeDate = (date) => {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
}