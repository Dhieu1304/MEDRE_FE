import camelcaseKeys from "camelcase-keys";
import { doctorApi } from "../config/apiConfig";
import axiosClient from "../config/axiosClient";
// import doctorMockData from "../mockData/doctorMockData";

const getDoctorList = async ({ page, limit, expertise, type, from, to }) => {
  try {
    const res = await axiosClient.get(doctorApi.doctorList(), { params: { page, limit, expertise, type, from, to } });

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
      const doctors = camelcaseKeys(res?.data?.results, { deep: true });
      const count = res?.data?.totalResults;

      return {
        success: true,
        doctors,
        count,

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

const getDoctorDetail = async (id) => {
  try {
    const res = await axiosClient.get(doctorApi.doctorDetail(id));

    // console.log("res: ", res);
    // const res = camelcaseKeys(
    //   {
    //     status: true,
    //     message: "",
    //     data: {
    //       doctor: doctorMockData.detail(id)
    //     }
    //   },
    //   { deep: true }
    // );

    if (res?.status) {
      const doctor = camelcaseKeys(res?.data, { deep: true });

      return {
        success: true,
        doctor,
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
  getDoctorList,
  getDoctorDetail,
  getDoctorExpertises
};
