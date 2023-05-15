import axios from "axios";
import Cookies from "js-cookie";
import cookiesUtil from "../utils/cookiesUtil";
import { saveToken } from "../utils/tokenUtils";

// eslint-disable-next-line no-console
console.log("process.env.REACT_APP_BE_URL: ", process.env.REACT_APP_BE_URL);

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BE_URL,
  headers: {
    "content-type": "application/json"
  }
});

const getNewToken = async () => {
  // console.log("getNewToken");

  const refreshToken = Cookies.get(cookiesUtil.COOKIES.REFRESH_TOKEN);

  if (!refreshToken) return "";
  try {
    const response = await axios.post(`${process.env.REACT_APP_BE_URL}/auth/refresh-tokens`, {
      refresh_token: refreshToken
    });

    // console.log("response: ", response);
    const tokens = response.data?.data?.tokens;
    saveToken(tokens);

    return tokens?.access?.token;
  } catch (error) {
    // throw new Error("Failed to refresh token");
    return "";
  }
};

axiosClient.interceptors.request.use(async (config) => {
  const customHeaders = {};

  const accessToken = Cookies.get(cookiesUtil.COOKIES.ACCESS_TOKEN);

  if (accessToken) {
    customHeaders.Authorization = `Bearer ${accessToken}`;
  } else {
    const newAccessToken = await getNewToken();
    customHeaders.Authorization = `Bearer ${newAccessToken}`;
  }
  return {
    ...config,
    headers: {
      ...customHeaders,
      ...config.headers
    }
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // console.error(error);
    if (error && error.response && error.response.data) {
      return error.response.data;
    }
    return error;
  }
);

export default axiosClient;
