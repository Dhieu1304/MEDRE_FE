// import { userApi, doctorApi } from "../config/apiConfig";
// import axiosClient from "../config/axiosClient";
import camelcaseKeys from "camelcase-keys";
import doctorMockData from "../mockData/doctorMockData";

const getDoctorList = async () => {
  try {
    // const res = await axiosClient.get(doctorApi.doctorList());
    const res = camelcaseKeys(
      {
        status: true,
        message: "",
        data: {
          doctors: doctorMockData.list()
        }
      },
      { deep: true }
    );

    if (res?.status) {
      const doctors = res?.data?.doctors;

      return {
        success: true,
        doctors,
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
    //   const res = await axiosClient.get(doctorApi.doctorDetail(id));
    const res = camelcaseKeys(
      {
        status: true,
        message: "",
        data: {
          doctor: doctorMockData.detail(id)
        }
      },
      { deep: true }
    );

    if (res?.status) {
      const doctor = res?.data?.doctor;

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

export default {
  getDoctorList,
  getDoctorDetail
};
