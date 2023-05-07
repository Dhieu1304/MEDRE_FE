const authApi = {
  loginByPhoneNumber: () => "/auth/login-by-phone-number",
  loginByEmail: () => "/auth/login-by-email",
  register: () => "/auth/register",
  registerVerifyOtp: () => "",

  sendVerificationToEmail: () => "/auth/verify/resend-mail",
  sendResetPasswordToEmail: () => "/auth/reset-password/send-mail",
  sendVerificationOtpToPhone: () => "",
  sendResetPasswordOtpToPhone: () => "",

  verifyOtpToVerfifyPhoneNumber: () => ""
};

const userApi = {
  userInfo: "/user/my-profile",
  editUser: () => `/user/my-profile/edit`
};

const doctorApi = {
  doctorList: () => "/staff/all",
  doctorDetail: (id) => `/staff/detail/${id}`,
  expertiseList: () => "/expertise/list"
};

const scheduleApi = {
  scheduleList: () => "/schedule/list-all",
  timeList: () => "/time-schedule/time"
};

const timeOffApi = {
  timeOffList: () => "/doctor-time-off/time-off"
};

const bookingApi = {
  bookingList: () => "/booking/list",
  book: () => "/booking/new-booking",
  cancelBooking: () => "/booking/cancel",
  bookingDetail: (id) => `/booking/detail/${id}`
};

const patientApi = {
  patientList: () => "/patient/list",
  createPatient: () => "/patient/create"
};

export { authApi, userApi, doctorApi, scheduleApi, timeOffApi, bookingApi, patientApi };
