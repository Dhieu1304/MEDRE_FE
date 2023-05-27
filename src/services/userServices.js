import camelcaseKeys from "camelcase-keys";
import { userApi } from "../config/apiConfig";
import axiosClient from "../config/axiosClient";
import { cleanUndefinedAndEmptyStrValueObject } from "../utils/objectUtil";

const getUserInfo = async () => {
  try {
    const res = await axiosClient.get(userApi.userInfo);

    // console.log("res: ", res);
    if (res?.status) {
      const user = camelcaseKeys(res?.data, { deep: true });

      return {
        success: true,
        user,
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
    // console.log("e: ", e);
    // console.error(e.message);
    return {
      success: false,
      message: e.message
    };
  }
};

const editUserInfo = async ({ phoneNumber, email, name, address, gender, dob, healthInsurance, image }) => {
  const dataBody = cleanUndefinedAndEmptyStrValueObject({
    phone_number: phoneNumber,
    email,
    name,
    address,
    gender,
    dob,
    health_insurance: healthInsurance,
    image
  });

  try {
    const res = await axiosClient.post(userApi.editUser(), dataBody);

    // console.log("editUserInfo res: ", res);

    if (res?.status) {
      const user = camelcaseKeys(res?.data?.user, { deep: true });

      return {
        success: true,
        user,
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
        message: res?.message,
        isMustLoginAgain: res?.isMustLoginAgain,
        statusCode: res?.statusCode
      };
    }
    return {
      success: false,
      message: res?.message,
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

const uploadAvatar = async (file) => {
  // console.log("file: ", file);
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axiosClient.post("/upload/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    // console.log("res: ", res);

    if (res?.status) {
      const image = res?.data;
      return {
        image,
        success: true,
        message: res?.message,
        isMustLoginAgain: res?.isMustLoginAgain,
        statusCode: res?.statusCode
      };
    }
    return {
      success: false,
      message: res?.message,
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

const changeAvatar = async (file) => {
  const uploadAvatarResult = await uploadAvatar(file);

  // console.log("uploadAvatarResult: ", uploadAvatarResult);
  if (uploadAvatarResult?.success) {
    const image = uploadAvatarResult?.image;
    // console.log("image: ", image);
    const changeAvatarResult = await editUserInfo({ image });

    // console.log("changeAvatarResult: ", changeAvatarResult);
    return changeAvatarResult;
  }

  return uploadAvatarResult;
};

export default {
  getUserInfo,
  editUserInfo,
  changePassword,
  changeAvatar
};
