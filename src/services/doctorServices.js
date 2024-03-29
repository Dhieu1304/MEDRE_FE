import camelcaseKeys from "camelcase-keys";
import { doctorApi } from "../config/apiConfig";
import axiosClient from "../config/axiosClient";
import { cleanUndefinedAndEmptyStrValueObject } from "../utils/objectUtil";
// import doctorMockData from "../mockData/doctorMockData";

const getDoctorList = async ({ page, limit, name, expertise, type, from, to }) => {
  // console.log({ page, limit, expertise, type, from, to });
  try {
    const params = cleanUndefinedAndEmptyStrValueObject({
      page,
      limit,
      name,
      expertise,
      type,
      from,
      to,
      role: "Doctor"
    });

    const res = await axiosClient.get(doctorApi.doctorList(), { params });

    if (res?.status) {
      const doctors = camelcaseKeys(res?.data?.results, { deep: true });
      const count = res?.data?.totalResults;

      return {
        success: true,
        doctors,
        count,

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

const getDoctorDetail = async (id) => {
  try {
    const res = await axiosClient.get(doctorApi.doctorDetail(id));

    if (res?.status) {
      const doctor = camelcaseKeys(res?.data, { deep: true });

      return {
        success: true,
        doctor,
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

const getDoctorExpertises = async () => {
  try {
    const res = await axiosClient.get(doctorApi.expertiseList());

    // let res = camelcaseKeys(
    //   {
    //     status: true,
    //     message: "",
    //     data: {
    //       doctors: doctorMockData.list()
    //     }
    //   },
    //   { deep: true }
    // );

    if (res?.status) {
      const expertises = camelcaseKeys(res?.data, { deep: true });

      return {
        success: true,
        expertises,
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
  getDoctorList,
  getDoctorDetail,
  getDoctorExpertises
};
