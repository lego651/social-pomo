
export const parseTime = (time) => {
  let min = Math.floor(time / 60);
  let sec = Math.round(time % 60);
  return min + " : " + sec;
}
