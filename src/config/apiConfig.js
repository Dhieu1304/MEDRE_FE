const authApi = {
  loginByPhoneNumber: "/auth/login-by-phone-number",
  register: "/auth/register"
};

const userApi = {
  userInfo: "/user/my-profile"
};

const doctorApi = {
  doctorList: () => "/staff/all",
  doctorDetail: (id) => `/staff/detail/${id}`,
  expertiseList: () => "/expertise/list"
};

const scheduleApi = {
  schedule: () => "/schedule"
};

export { authApi, userApi, doctorApi, scheduleApi };
