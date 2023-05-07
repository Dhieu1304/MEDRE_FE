import camelcaseKeys from "camelcase-keys";
import { userApi } from "../config/apiConfig";
import axiosClient from "../config/axiosClient";
import { cleanUndefinedAndEmptyStrValueObject } from "../utils/objectUtil";

const getUserInfo = async () => {
  try {
    const res = await axiosClient.get(userApi.userInfo);

    if (res?.status) {
      const user = camelcaseKeys(res?.data, { deep: true });

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

const editUserInfo = async ({ phoneNumber, email, name, address, gender, dob, healthInsurance }) => {
  const dataBody = cleanUndefinedAndEmptyStrValueObject({
    phone_number: phoneNumber,
    email,
    name,
    address,
    gender,
    dob,
    health_insurance: healthInsurance
  });

  try {
    const res = await axiosClient.post(userApi.editUser(), dataBody);

    // console.log("editUserInfo res: ", res);

    if (res?.status) {
      const user = camelcaseKeys(res?.data?.user, { deep: true });

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

const changePassword = async ({ oldPassword, newPassword, confirmPassword }) => {
  const dataBody = cleanUndefinedAndEmptyStrValueObject({
    old_password: oldPassword,
    new_password: newPassword,
    confirm_password: confirmPassword
  });

  // console.log("dataBody: ", dataBody);

  try {
    const res = await axiosClient.post(userApi.changePassword(), dataBody);

    // console.log("changePassword res: ", res);

    if (res?.status) {
      return {
        success: true,
        message: res?.message
      };
    }
    return {
      success: false,
      message: res?.message
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
  getUserInfo,
  editUserInfo,
  changePassword
};
