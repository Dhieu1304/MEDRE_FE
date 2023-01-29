const LOCAL_STORAGE = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
  RECENT_GROUPS: "RECENT_GROUPS",
  RECENT_PRESENTATIONS: "RECENT_PRESENTATIONS",
  UUID: "UUID"
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

export { LOCAL_STORAGE, setItem, getItem, removeItem };
