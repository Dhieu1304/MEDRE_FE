import camelcaseKeys from "camelcase-keys";
import { settingApi } from "../config/apiConfig";
import axiosClient from "../config/axiosClient";

const getSettingList = async () => {
  // console.log("params: ", params);
  try {
    const res = await axiosClient.get(settingApi.settingList());

    // console.log("res: ", res);
    if (res?.status) {
      const settings = camelcaseKeys(res?.data, { deep: true });

      return {
        success: true,
        settings,
        message: res?.message,
        isMustLoginAgain: res?.isMustLoginAgain,
        statusCode: res?.statusCode
      };
    }
    return {
      success: false,
      message: res?.message || `Status is ${res.status}`,
      isMustLoginAgain: res?.isMustLoginAgain,
      statusCode: res?.statusCode
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
  getSettingList
};
