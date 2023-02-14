import { authApi } from "../config/apiConfig";
import axiosClient from "../config/axiosClient";
import localStorageUtil from "../utils/localStorageUtil";

const loginByPhoneNumber = async (phoneNumber, password) => {
  try {
    const res = await axiosClient.post(authApi.loginByPhoneNumber, { phoneNumber, password });

    if (res?.status) {
      const user = res?.data?.user;
      const tokens = res?.data?.tokens;

      localStorageUtil.setItem(localStorageUtil.LOCAL_STORAGE.ACCESS_TOKEN, tokens?.access?.token);
      localStorageUtil.setItem(localStorageUtil.LOCAL_STORAGE.REFRESH_TOKEN, tokens?.refresh?.token);

      return {
        success: true,
        user,
        message: res?.message
      };
    }
    return {
      success: false,
      message: `Status is ${res.status}`
    };
  } catch (e) {
    // console.error(e.message);
    return {
      success: false,
      message: e.message
    };
  }
};

const logout = async () => {
  localStorageUtil.removeItem(localStorageUtil.LOCAL_STORAGE.ACCESS_TOKEN);
  localStorageUtil.removeItem(localStorageUtil.LOCAL_STORAGE.REFRESH_TOKEN);

  return {
    success: true,
    message: "Logout successfully"
  };
};

export default {
  loginByPhoneNumber,
  logout
};
