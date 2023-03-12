import { userApi } from "../config/apiConfig";
import axiosClient from "../config/axiosClient";

const getUserInfo = async () => {
  try {
    const res = await axiosClient.get(userApi.userInfo);

    if (res?.status) {
      const user = res?.data;

      return {
        success: true,
        user,
        message: res?.message
      };
    }
    return {
      success: false,
      message: ""
    };
  } catch (e) {
    // console.error(e.message);
    return {
      success: false,
      message: e.message
    };
  }
};

export default {
  getUserInfo
};
