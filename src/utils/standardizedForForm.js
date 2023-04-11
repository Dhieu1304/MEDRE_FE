import formatDate from "date-and-time";

export const normalizeStrToStr = (str) => {
  // check null or undefined (==)
  if (str == null) {
    return "";
  }
  if (typeof str === "number") {
    return str.toString();
  }
  return str.toString().trim();
};

export const normalizeStrToArray = (arr) => {
  // check null or undefined (==)
  if (arr == null) {
    return [];
  }
  if (Array.isArray(arr)) {
    return arr;
  }
  return [arr];
};

export const normalizeStrToInt = (str, defaultNumber = 0) => {
  const num = parseInt(str, 10);
  return Number.isNaN(num) ? defaultNumber : num;
};

export const normalizeStrToDateStr = (dateStr) => {
  const date = Date.parse(dateStr);
  if (Number.isNaN(date)) {
    return formatDate.format(new Date(), "YYYY-MM-DD");
  }
  return formatDate.format(new Date(date), "YYYY-MM-DD");
};
