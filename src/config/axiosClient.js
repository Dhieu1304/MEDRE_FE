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
  }
  // else {
  //   const newAccessToken = await getNewToken();
  //   customHeaders.Authorization = `Bearer ${newAccessToken}`;
  // }
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
      let isMustLoginAgain = false;
      return { ...response.data, statusCode: response.status, isMustLoginAgain };
    }
    return response;
  },
  async (error) => {
    if (error && error.response && error.response.data) {
      // console.log("Có response error ");
      let isMustLoginAgain = false;
      if (error.response.status === 401) {
        // console.log("error.response.status: ", error.response.status);
        const originalRequest = error.config;

        const newAccessToken = await getNewToken();
        if (newAccessToken) {
          // console.log("Có access token mới ");
          // Nếu lấy được access token mới gửi lại request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosClient(originalRequest);
        } else {
          // console.log("KO Có access token mới => yêu cầu login lại");
          // Ngược lại isMustLoginAgain = false; để yêu cầu đăng nhập lại
          isMustLoginAgain = true;
        }
      }
      // console.log("return về lối");

      return { ...error.response.data, statusCode: error.response.status, isMustLoginAgain };
    }
    return error;
  }
);

export default axiosClient;
