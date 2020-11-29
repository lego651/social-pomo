// convertDateToSeq: count how many days between two dates; 
// console.log(convertDateToSeq(2020, 1, 29)); // 29 + 31 = 60
exports.convertDateToSeq = (y, m, d) => {
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
exports.convertDateToSeq2 = (y, m, d) => {
    const days2020 = new Date(2020, 1 - 1, 1);
    let days = new Date(y, m - 1, d);
    let res = 0;
    res = (days - days2020) / (24 * 60 * 60 * 1000);
    return res;
}

exports.serializeDate = (date) => {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
}