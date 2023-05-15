const ACCESS_TOKEN = "ACCESS_TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";
const UUID = "UUID";
const ACCESS_TOKEN_EXP = "ACCESS_TOKEN_EXP";
const REFRESH_TOKEN_EXP = "REFRESH_TOKEN_EXP";

const LOCAL_STORAGE = {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  UUID,
  ACCESS_TOKEN_EXP,
  REFRESH_TOKEN_EXP
};

const setItem = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};

const getItem = (name) => {
  return JSON.parse(localStorage.getItem(name));
};

const removeItem = (name) => {
  localStorage.removeItem(name);
};

export default { LOCAL_STORAGE, setItem, getItem, removeItem };
