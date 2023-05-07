import { authApi } from "../config/apiConfig";
import axiosClient from "../config/axiosClient";
import localStorageUtil from "../utils/localStorageUtil";
import { cleanUndefinedAndEmptyStrValueObject } from "../utils/objectUtil";

const loginByPhoneNumber = async (phoneNumber, password) => {
  try {
    const res = await axiosClient.post(authApi.loginByPhoneNumber(), { phone_number: phoneNumber, password });

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

const loginByEmail = async (email, password) => {
  try {
    const res = await axiosClient.post(authApi.loginByEmail(), { email, password });

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

const logout = async () => {
  localStorageUtil.removeItem(localStorageUtil.LOCAL_STORAGE.ACCESS_TOKEN);
  localStorageUtil.removeItem(localStorageUtil.LOCAL_STORAGE.REFRESH_TOKEN);

  return {
    success: true,
    message: "Logout successfully"
  };
};

const register = async ({ phoneNumber, email, password }) => {
  const dataBody = cleanUndefinedAndEmptyStrValueObject({
    phone_number: phoneNumber,
    password,
    email
  });

  // console.log("dataBody: ", dataBody);

  try {
    const res = await axiosClient.post(authApi.register(), dataBody);

    // console.log("res: ", res)

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

const registerVerifyOtp = async ({ otp }) => {
  // const dataBody = cleanUndefinedAndEmptyStrValueObject({
  //   otp
  // });

  // console.log("dataBody: ", dataBody);

  // try {
  //   const res = await axiosClient.post(authApi.registerVerifyOtp(), dataBody);

  //   // console.log("res: ", res);

  //   if (res?.status) {
  //     return {
  //       success: true,
  //       message: res?.message
  //     };
  //   }
  //   return {
  //     success: false,
  //     message: res?.message
  //   };
  // } catch (e) {
  //   // console.error(e.message);
  //   return {
  //     success: false,
  //     message: e.message
  //   };
  // }

  return {
    success: true,
    message: otp
  };
};

const sendVerificationToEmail = async (email) => {
  const dataBody = cleanUndefinedAndEmptyStrValueObject({
    email,
    type: 1
  });

  // console.log("dataBody: ", dataBody);

  try {
    const res = await axiosClient.post(authApi.sendVerificationToEmail(), dataBody);

    // console.log("res: ", res);

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

const sendVerificationOtpToPhone = async (phoneNumber) => {
  // const dataBody = cleanUndefinedAndEmptyStrValueObject({
  //   phone_number: phoneNumber
  // });
  // console.log("dataBody: ", dataBody);
  // try {
  //   const res = await axiosClient.post(authApi.sendVerificationOtpToPhone(), dataBody);
  //   console.log("res: ", res);
  //   if (res?.status) {
  //     return {
  //       success: true,
  //       message: res?.message
  //     };
  //   }
  //   return {
  //     success: false,
  //     message: res?.message
  //   };
  // } catch (e) {
  //   // console.error(e.message);
  //   return {
  //     success: false,
  //     message: e.message
  //   };
  // }

  return {
    success: true,
    message: phoneNumber
  };
};

const verifyOtpToVerfifyPhoneNumber = async (otp) => {
  // const dataBody = cleanUndefinedAndEmptyStrValueObject({
  //   otp
  // });
  // console.log("dataBody: ", dataBody);
  // try {
  //   const res = await axiosClient.post(authApi.verifyOtpToVerfifyPhoneNumber(), dataBody);
  //   console.log("res: ", res);
  //   if (res?.status) {
  //     return {
  //       success: true,
  //       message: res?.message
  //     };
  //   }
  //   return {
  //     success: false,
  //     message: res?.message
  //   };
  // } catch (e) {
  //   // console.error(e.message);
  //   return {
  //     success: false,
  //     message: e.message
  //   };
  // }

  return {
    success: true,
    message: otp
  };
};

export default {
  loginByPhoneNumber,
  loginByEmail,
  logout,
  register,
  registerVerifyOtp,
  sendVerificationToEmail,
  sendVerificationOtpToPhone,
  verifyOtpToVerfifyPhoneNumber
};
