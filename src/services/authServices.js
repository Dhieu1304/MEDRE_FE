// import Cookies from "js-cookie";
import { authApi } from "../config/apiConfig";
import axiosClient from "../config/axiosClient";
// import localStorageUtil from "../utils/localStorageUtil";
import { cleanUndefinedAndEmptyStrValueObject } from "../utils/objectUtil";
import { clearToken, saveToken } from "../utils/tokenUtils";

const loginByPhoneNumber = async (phoneNumber, password) => {
  // console.log({ phoneNumber, password });
  try {
    const res = await axiosClient.post(authApi.loginByPhoneNumber(), { phone_number: phoneNumber, password });

    // console.log("loginByPhoneNumber res: ", res);

    if (res?.status) {
      const user = res?.data?.user;
      const tokens = res?.data?.tokens;

      // localStorageUtil.setItem(localStorageUtil.LOCAL_STORAGE.ACCESS_TOKEN, tokens?.access?.token);
      // localStorageUtil.setItem(localStorageUtil.LOCAL_STORAGE.ACCESS_TOKEN_EXP, tokens?.access?.expires);
      // localStorageUtil.setItem(localStorageUtil.LOCAL_STORAGE.REFRESH_TOKEN, tokens?.refresh?.token);
      // localStorageUtil.setItem(localStorageUtil.LOCAL_STORAGE.REFRESH_TOKEN_EXP, tokens?.refresh?.expires);

      // Cookies.set(localStorageUtil.LOCAL_STORAGE.ACCESS_TOKEN, tokens?.access?.token, {
      //   expires: new Date(tokens?.access?.expires)
      // });
      // Cookies.set("ACCESS_TOKEN2", tokens?.access?.token);
      // Cookies.set(localStorageUtil.LOCAL_STORAGE.REFRESH_TOKEN, tokens?.refresh?.token, {
      //   expires: new Date(tokens?.refresh?.expires)
      // });

      saveToken(tokens);

      // console.log("loginByPhoneNumber res return: ", {
      //   success: true,
      //   user,
      //   message: res?.message,
      //  ...res
      // });

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

const loginByEmail = async (email, password) => {
  try {
    const res = await axiosClient.post(authApi.loginByEmail(), { email, password });

    // console.log("loginByEmail res: ", res);

    if (res?.status) {
      const user = res?.data?.user;
      const tokens = res?.data?.tokens;

      // localStorageUtil.setItem(localStorageUtil.LOCAL_STORAGEz.ACCESS_TOKEN, tokens?.access?.token);
      // localStorageUtil.setItem(localStorageUtil.LOCAL_STORAGE.ACCESS_TOKEN_EXP, tokens?.access?.expires);
      // localStorageUtil.setItem(localStorageUtil.LOCAL_STORAGE.REFRESH_TOKEN, tokens?.refresh?.token);
      // localStorageUtil.setItem(localStorageUtil.LOCAL_STORAGE.REFRESH_TOKEN_EXP, tokens?.refresh?.expires);

      // Cookies.set(localStorageUtil.LOCAL_STORAGE.ACCESS_TOKEN, tokens?.access?.token, { expires: tokens?.access?.expires });
      // Cookies.set(localStorageUtil.LOCAL_STORAGE.REFRESH_TOKEN, tokens?.refresh?.token, {
      //   expires: tokens?.refresh?.expires
      // });

      saveToken(tokens);

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

const logout = async () => {
  // localStorageUtil.removeItem(localStorageUtil.LOCAL_STORAGE.ACCESS_TOKEN);
  // localStorageUtil.removeItem(localStorageUtil.LOCAL_STORAGE.REFRESH_TOKEN);
  // localStorageUtil.removeItem(localStorageUtil.LOCAL_STORAGE.ACCESS_TOKEN_EXP);
  // localStorageUtil.removeItem(localStorageUtil.LOCAL_STORAGE.REFRESH_TOKEN_EXP);

  // Cookies.remove(localStorageUtil.LOCAL_STORAGE.ACCESS_TOKEN);
  // Cookies.remove(localStorageUtil.LOCAL_STORAGE.REFRESH_TOKEN);

  clearToken();

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
  //       message: res?.message,
  //       ...res
  //     };
  //   }
  //   return {
  //     success: false,
  //     message: res?.message,
  //       ...res
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

const sendResetPasswordToEmail = async (email) => {
  const dataBody = cleanUndefinedAndEmptyStrValueObject({
    email,
    type: 1
  });

  // console.log("dataBody: ", dataBody);

  try {
    const res = await axiosClient.post(authApi.sendResetPasswordToEmail(), dataBody);

    // console.log("res: ", res);

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
  //       message: res?.message,
  //       ...res
  //     };
  //   }
  //   return {
  //     success: false,
  //     message: res?.message,
  //       ...res
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

const sendResetPasswordOtpToPhone = async (phoneNumber) => {
  // const dataBody = cleanUndefinedAndEmptyStrValueObject({
  //   phone_number: phoneNumber
  // });
  // console.log("dataBody: ", dataBody);
  // try {
  //   const res = await axiosClient.post(authApi.sendResetPasswordOtpToPhone(), dataBody);
  //   console.log("res: ", res);
  //   if (res?.status) {
  //     return {
  //       success: true,
  //       message: res?.message,
  //       ...res
  //     };
  //   }
  //   return {
  //     success: false,
  //     message: res?.message,
  //       ...res
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
  //       message: res?.message,
  //       ...res
  //     };
  //   }
  //   return {
  //     success: false,
  //     message: res?.message,
  //       ...res
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

const verifyOtpToResetPasswordPhoneNumber = async (otp) => {
  // const dataBody = cleanUndefinedAndEmptyStrValueObject({
  //   otp
  // });
  // console.log("dataBody: ", dataBody);
  // try {
  //   const res = await axiosClient.post(authApi.verifyOtpToResetPasswordPhoneNumber(), dataBody);
  //   console.log("res: ", res);
  //   if (res?.status) {
  //     return {
  //       success: true,
  //       message: res?.message,
  //       ...res
  //     };
  //   }
  //   return {
  //     success: false,
  //     message: res?.message,
  //       ...res
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
  verifyOtpToVerfifyPhoneNumber,
  sendResetPasswordToEmail,
  sendResetPasswordOtpToPhone,
  verifyOtpToResetPasswordPhoneNumber
};
