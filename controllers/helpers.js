const formatDate = (date) => {
  if (typeof date === 'string') return date;
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
  date = `${date.getUTCFullYear()}-${month}-${day}`
  return date;
}
module.exports = formatDate;