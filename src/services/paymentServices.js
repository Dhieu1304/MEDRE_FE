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

export default {
  createPayment
};
