const authApi = {
  loginByPhoneNumber: () => "/auth/login-by-phone-number",
  loginByEmail: () => "/auth/login-by-email",
  register: () => "/auth/register",
  registerVerifyOtp: () => "",

  sendVerificationToEmail: () => "/auth/verify/resend-mail",
  sendResetPasswordToEmail: () => "/auth/reset-password/send-mail",
  sendVerificationOtpToPhone: () => "",
  sendResetPasswordOtpToPhone: () => "",

  verifyOtpToVerfifyPhoneNumber: () => "/auth/verify/otp",
  verifyOtpToResetPasswordPhoneNumber: () => ""
};

const userApi = {
  userInfo: "/user/my-profile",
  editUser: () => `/user/my-profile/edit`,
  changePassword: () => "/user/my-profile/change-password",
  uploadAvatar: () => "/upload/avatar"
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
  bookingDetail: (id) => `/booking/detail/${id}`,
  getCountBookingSchedule: () => "/booking/schedule-booking-count"
};

const patientApi = {
  patientList: () => "/patient/list",
  createPatient: () => "/patient/create"
};

const paymentApi = {
  createPayment: () => "/payment/create"
};

const notificationApi = {
  notificationList: () => "/notification/list",
  notificationDetail: (id) => `/notification/detail/${id}`,
  markRead: () => "/notification/mark-read",
  countUnread: () => "/notification/count-unread",
  subscribeTopic: () => "/notification/subscribe-topic",
  unSubscribeTopic: () => "/notification/un-subscribe-topic"
};

const settingApi = {
  settingList: () => "/setting/list"
};

const ticketApi = {
  ticketList: () => "/ticket/list",
  ticketDetail: (id) => `/ticket/detail/${id}`,
  responseTicket: () => "/ticket/response",
  createTicket: () => "/ticket/create"
};

export {
  authApi,
  userApi,
  doctorApi,
  scheduleApi,
  timeOffApi,
  bookingApi,
  patientApi,
  paymentApi,
  notificationApi,
  settingApi,
  ticketApi
};
