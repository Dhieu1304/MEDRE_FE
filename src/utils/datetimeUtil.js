// import formatDate from "date-and-time";
import en from "date-and-time/locale/en";
import vi from "date-and-time/locale/vi";

const getNext7DaysFrom = (date = new Date()) => {
  const curDate = new Date(date);
  curDate.setHours(0);
  curDate.setMinutes(0);
  curDate.setSeconds(0);

  const arr = [];
  for (let i = 0; i <= 6; i++) {
    const nextDate = new Date(curDate);
    nextDate.setDate(curDate.getDate() + i);
    arr.push(nextDate);
  }

  return arr;
};

const formatDateLocale = { en, vi };

export { getNext7DaysFrom, formatDateLocale };
