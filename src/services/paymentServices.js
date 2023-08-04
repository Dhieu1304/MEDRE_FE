import { paymentApi } from "../config/apiConfig";
import axiosClient from "../config/axiosClient";
import { cleanUndefinedAndEmptyStrValueObject } from "../utils/objectUtil";

const createPayment = async ({ bookingId, language, bankCode }) => {
  const dataBody = cleanUndefinedAndEmptyStrValueObject({
    id_booking: bookingId,
    language,
    bankCode
  });

  // console.log("dataBody: ", dataBody);

  try {
    const res = await axiosClient.post(paymentApi.createPayment(), dataBody);

    // console.log("createPayment res: ", res);

    if (res?.status) {
      const data = res?.data;
      return {
        data,
        success: true,
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
  createPayment
};
