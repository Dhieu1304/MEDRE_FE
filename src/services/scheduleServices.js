import camelcaseKeys from "camelcase-keys";
import { scheduleApi } from "../config/apiConfig";
import axiosClient from "../config/axiosClient";

const getScheduleListByDoctorId = async (doctorId, from, to) => {
  const params = {
    id_doctor: doctorId,
    from,
    to
  };

  // console.log("params: ", params);
  try {
    const res = await axiosClient.get(scheduleApi.scheduleList(), {
      params
    });
    // const res = camelcaseKeys(scheduleMockData.list(), { deep: true });

    // console.log("res: ", res);

    if (res?.status) {
      const schedules = camelcaseKeys(res?.data, { deep: true });

      return {
        success: true,
        schedules,
        message: res?.message
      };
    }
    return {
      success: false,
      message: res?.message || `Status is ${res.status}`
    };
  } catch (e) {
    // console.error(e.message);
    return {
      success: false,
      message: e.message
    };
  }
};

const getTimeList = async () => {
  try {
    const res = await axiosClient.get(scheduleApi.timeList());

    if (res?.status) {
      const times = camelcaseKeys(res?.data, { deep: true });

      return {
        success: true,
        times,
        message: res?.message
      };
    }
    return {
      success: false,
      message: res?.message || `Status is ${res.status}`
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
  getScheduleListByDoctorId,
  getTimeList
};
