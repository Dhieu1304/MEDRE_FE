const authApi = {
  loginByPhoneNumber: "/auth/login-by-phone-number",
  register: "/auth/register"
};

const userApi = {
  userInfo: "/user/info"
};

const doctorApi = {
  doctorList: () => "/staff/all",
  doctorDetail: (id) => `/staff/detail/${id}`
};

const scheduleApi = {
  schedule: () => "/schedule"
};

export { authApi, userApi, doctorApi, scheduleApi };
