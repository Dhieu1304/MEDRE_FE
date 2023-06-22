import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Box,
  Button,
  useTheme
} from "@mui/material";
import PropTypes from "prop-types";

import formatDate from "date-and-time";
import { useEffect, useMemo, useState } from "react";
// import { useTranslation } from "react-i18next";
import { ArrowLeft as ArrowLeftIcon, ArrowRight as ArrowRightIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { useCustomModal } from "../../../components/CustomModal";
import scheduleServices from "../../../services/scheduleServices";
import { formatDateLocale, getNext7DaysFrom, isEqualDateWithoutTime, subtractDate } from "../../../utils/datetimeUtil";

import WithTimesLoaderWrapper from "../../time/hocs/WithTimesLoaderWrapper";

import {
  findBookingsUserId,
  groupBookingSchedulesByScheduleAndDateAndTime,
  groupBookingsByScheduleAndDateAndTime,
  groupSchedulesDayOfWeekAndSession,
  isTimeOffAtThisScheduleTime
} from "./utils";
import { useAppConfigStore } from "../../../store/AppConfigStore";
import { useFetchingStore } from "../../../store/FetchingApiStore";
import timeOffServices from "../../../services/timeOffServices";
import { scheduleSessions } from "../../../entities/Schedule";
import { useAuthStore } from "../../../store/AuthStore/hooks";
import { bookingMethods, bookingStatuses } from "../../../entities/Booking";
import BookingModal from "../../booking/component/BookingModal";
import paymentServices from "../../../services/paymentServices";
import { settingNames } from "../../../entities/Setting/constant";
import { checkUserInfoIsCompleted } from "../../../utils/userUtil";
import routeConfig from "../../../config/routeConfig";
import bookingServices from "../../../services/bookingServices";

function DoctorScheduleTable({ timesList, doctorId }) {
  const [schedules, setSchedules] = useState([]);
  const [bookingSchedules, setBookingSchedules] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timeOffs, setTimeOffs] = useState([]);

  const bookingModal = useCustomModal();

  const theme = useTheme();

  const { t } = useTranslation("doctorFeature", {
    keyPrefix: "DoctorDetail.DoctorScheduleTable"
  });
  const { t: tScheduleConstants } = useTranslation("scheduleEntity", {
    keyPrefix: "constants.types"
  });
  const { fetchApi } = useFetchingStore();
  const { locale, settingConfig } = useAppConfigStore();
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const heads = useMemo(() => getNext7DaysFrom(currentDate), [currentDate]);

  const scheduleTypes = useMemo(() => {
    return {
      ONLINE: {
        label: tScheduleConstants("online"),
        color: "green"
      },
      OFFLINE: {
        label: tScheduleConstants("offline"),
        color: "red"
      }
    };
  }, [locale]);

  // const loadData = async () => {
  //   await fetchApi(
  //     async () => {
  //       const res = await scheduleServices.getScheduleListByDoctorId(
  //         doctorId,
  //         formatDate.format(heads[0], "YYYY-MM-DD"),
  //         formatDate.format(heads[6], "YYYY-MM-DD")
  //       );

  //       if (res.success) {
  //         const schedulesData = res.schedules;
  //         // console.log("res: ", res);
  //         setSchedules(schedulesData);
  //         return { ...res };
  //       }
  //       setSchedules([]);
  //       return { ...res };
  //     },
  //     { hideSuccessToast: true }
  //   );
  // };

  const loadData = async () => {
    let schedulesData = [];
    let bookingSchedulesData = [];

    await fetchApi(async () => {
      const res = await scheduleServices.getScheduleListByDoctorId(
        doctorId,
        formatDate.format(heads[0], "YYYY-MM-DD"),
        formatDate.format(heads[6], "YYYY-MM-DD")
      );

      if (res.success) {
        schedulesData = [...res.schedules];
        // console.log("res: ", res);
        // setSchedules(schedulesData);
        return { ...res };
      }
      return { ...res };
    });

    await fetchApi(async () => {
      // Sử dụng phương thức map() để trích xuất các idExpertise
      const expertiseIdsFull = schedulesData.map((schedule) => schedule.idExpertise);

      // Sử dụng phương thức filter() và indexOf() để lọc ra các idExpertise duy nhất
      const expertiseIds = expertiseIdsFull.filter((id, index, self) => self.indexOf(id) === index);

      // console.log("expertiseIds: ", expertiseIds);
      const res = await bookingServices.getCountBookingSchedule({
        expertiseIds,
        doctorId,
        from: formatDate.format(heads[0], "YYYY-MM-DD"),
        to: formatDate.format(heads[6], "YYYY-MM-DD"),
        bookingMethod: bookingMethods.REMOTE
      });

      if (res.success) {
        bookingSchedulesData = [...res.bookingSchedules];
        return { ...res };
      }
      return { ...res };
    });

    setSchedules([...schedulesData]);
    setBookingSchedules([...bookingSchedulesData]);
  };

  const loadTimeOffs = async () => {
    await fetchApi(
      async () => {
        const res = await timeOffServices.getTimeOffByDoctorId(doctorId, {
          from: formatDate.format(heads[0], "YYYY-MM-DD"),
          to: formatDate.format(heads[6], "YYYY-MM-DD")
        });

        if (res.success) {
          const timeOffsData = res.timeOffs;
          setTimeOffs(timeOffsData);
          return { ...res };
        }
        setTimeOffs([]);
        return { ...res };
      },
      { hideSuccessToast: true }
    );
  };

  useEffect(() => {
    loadData();
  }, [heads]);

  useEffect(() => {
    loadTimeOffs();
  }, [heads]);

  useMemo(() => {
    const code = locale?.slice(0, 2) || "vi";
    formatDate.locale(formatDateLocale[code]);
  }, [locale]);

  const [schedulesDayOfWeekAndSession, bookingsByScheduleAnnDateAndTime] = useMemo(() => {
    return [groupSchedulesDayOfWeekAndSession(schedules), groupBookingsByScheduleAndDateAndTime(schedules)];
  }, [schedules]);

  // console.log("schedules: ", schedules);
  // console.log("schedulesDayOfWeekAndSession: ", schedulesDayOfWeekAndSession);

  const bookingSchedulesByScheduleAndDateAndTime = useMemo(() => {
    return groupBookingSchedulesByScheduleAndDateAndTime(bookingSchedules);
  }, [bookingSchedules]);

  // console.log("bookingSchedules: ", bookingSchedules);
  // console.log("bookingSchedulesByScheduleAndDateAndTime: ", bookingSchedulesByScheduleAndDateAndTime);

  const handlePayment = async (booking) => {
    let language = "vn";
    if (locale === "enUS") {
      language = "en";
    }

    const bookingId = booking?.id;
    await fetchApi(async () => {
      const res = await paymentServices.createPayment({ bookingId, language });

      if (res.success) {
        const data = res?.data;
        // console.log("data: ", data);
        // window.location.href = data;
        window.open(data, "_blank");
        return { ...res };
      }

      return { ...res };
    });
  };

  const renderBookingButton = (schedule, bookings, colDate, time, bookingSchedule) => {
    const booking = findBookingsUserId(bookings, authStore.user?.id);
    // if (bookings) {
    //   // console.log("bookings: ", bookings);
    //   // console.log("booking: ", booking);
    //   // console.log("time: ", time);
    // }

    if (booking) {
      if (booking?.bookingStatus === bookingStatuses.BOOKED)
        return (
          <Button
            variant="text"
            sx={{
              color: theme.palette.success.light
            }}
          >
            {t("button.booked")}
          </Button>
        );
      if (booking?.bookingStatus === bookingStatuses.WAITING)
        return (
          <Button
            variant="text"
            sx={{
              color: theme.palette.warning.light
            }}
            onClick={async () => {
              await handlePayment(booking);
            }}
          >
            {t("button.waiting")}
          </Button>
        );
    }

    let isFullSlot;

    if (bookingSchedule) {
      // console.log("bookingSchedule: ", bookingSchedule);

      const countBooking = bookingSchedule?.countBooking || 0;
      if (schedule?.type === scheduleTypes.OFFLINE) {
        const totalOffBookOnl = bookingSchedule?.totalOffBookOnl || 0;
        isFullSlot = countBooking >= totalOffBookOnl;
      }
      // online
      else {
        const totalBookingOnline = bookingSchedule?.totalBookingOnline || 0;
        isFullSlot = countBooking >= totalBookingOnline;
      }

      // console.log("totalOffBookOnl: ", totalOffBookOnl);
      // console.log("countBooking: ", countBooking);
      // console.log("isFullSlot: ", isFullSlot);
    }

    if (isFullSlot) {
      return (
        <Button
          variant="text"
          sx={{
            color: theme.palette.success.light
          }}
        >
          {t("button.reserved")}
        </Button>
      );
    }

    // Số ngày cần đặt trước
    const bookAdvanceDay = settingConfig[settingNames.BOOK_ADVANCE_DAY]?.value;
    // Số ngày được phép đặt trước
    const bookAfterDay = settingConfig[settingNames.BOOK_AFTER_DAY]?.value;

    const canBooking =
      subtractDate(colDate, new Date()) > bookAdvanceDay && subtractDate(colDate, new Date()) < bookAfterDay;
    return (
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#009dff",
          color: "white"
        }}
        disabled={!canBooking}
        onClick={() => {
          const isUserInfoCompleted = checkUserInfoIsCompleted(authStore.user);

          if (isUserInfoCompleted) {
            bookingModal.setShow(true);
            bookingModal.setData({
              schedule,
              date: colDate,
              time
            });
          } else {
            const { pathname, search } = location;

            const oldPath = `${pathname}${search}`;

            navigate(routeConfig.profile, {
              state: {
                oldPath
              }
            });
          }
        }}
      >
        {t("button.book")}
      </Button>
    );
  };

  // console.log("schedules: ", schedules);

  const renderCell = (schedule, colDate, time) => {
    // const booking = findBookingsByDate(schedule?.bookings, colDate, time);
    const colDateFormat = formatDate.format(colDate, "YYYY-MM-DD");
    const bookings = bookingsByScheduleAnnDateAndTime[schedule?.id]?.[colDateFormat]?.[time?.id];
    const isTimeOff = isTimeOffAtThisScheduleTime(timeOffs, colDate, time);

    const bookingSchedule = bookingSchedulesByScheduleAndDateAndTime[schedule?.id]?.[colDateFormat]?.[time?.id];

    // if (dayOfWeek === 5) {
    //   console.log(formatDate.format(colDate, "ddd DD/MM/YYYY"));
    //   console.log("schedule: ", schedule);
    //   console.log("booking: ", booking);
    //   console.log("isTimeOff: ", isTimeOff);
    // }

    return (
      <TableCell
        key={colDate}
        sx={{
          border: "1px solid rgba(0,0,0,0.2)",
          p: 0,
          position: "relative",
          minWidth: 120,
          borderCollapse: "collapse"
        }}
        align="center"
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            minHeight: 75,
            position: "relative"
          }}
        >
          {schedule && !isTimeOff && (
            <>
              {/* Hiển thị loại khám Online - Offline */}
              <Box
                sx={{
                  width: "100%",
                  height: 4,
                  backgroundColor: schedule?.type === "Online" ? scheduleTypes.ONLINE.color : scheduleTypes.OFFLINE.color,
                  color: theme.palette.info.contrastText,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              />

              {/* Hiển thị trạng thái booking trong schedule */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexGrow: 1,
                  // bgcolor: isCurrentTime ? theme.palette.info.light : booking && theme.palette.success.light,
                  // bgcolor: isCurrentTime ? "red" : "inherit",
                  position: "relative",
                  cursor: bookings && "pointer"
                }}
              >
                {renderBookingButton(schedule, bookings, colDate, time, bookingSchedule)}
              </Box>
            </>
          )}
        </Box>
      </TableCell>
    );
  };

  const renderCols = (time) => {
    // Group các schedules lại theo dayOfWeek => để dựa trên dayOfWeek truy xuất schedule của ngày đó

    // const cols = Array.from({ length: 7 }, (_, index) => {

    const cols = heads.map((head) => {
      // schedulesBySession là 1 obj có 2 key morning và afternoon
      const dayOfWeek = head.getDay();
      // const schedulesBySession = schedulesDayOfWeekAndSession[index];
      const schedulesBySession = schedulesDayOfWeekAndSession[dayOfWeek];
      // console.log("schedulesBySession: ", schedulesBySession);
      let schedule;
      const { session } = time;

      switch (session) {
        case scheduleSessions.MORNING:
          schedule = schedulesBySession.morning || schedulesBySession.wholeDay;
          break;

        case scheduleSessions.AFFTERNOON:
          schedule = schedulesBySession.afternoon || schedulesBySession.wholeDay;
          break;

        case scheduleSessions.EVENING:
          schedule = schedulesBySession.evening || schedulesBySession.wholeDay;
          break;

        default:
          break;
      }

      // const colDate = heads[index];
      const colDate = new Date(head);

      return renderCell(schedule, colDate, time);
    });

    return cols;
  };

  const handleAfterBooking = async (booking) => {
    await loadData();
    await handlePayment(booking);
  };

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: "600" }}>
        {t("title")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            sm: "row",
            xs: "column-reverse"
          },
          justifyContent: {
            sm: "flex-end",
            xs: "flex-start"
          },
          alignItems: "center",
          mb: 4
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mb: { sm: 0, xs: 2 }
          }}
        >
          {Object.keys(scheduleTypes).map((key) => {
            return (
              <Box
                key={key}
                sx={{
                  mr: 2
                }}
              >
                <Typography>{scheduleTypes[key].label} </Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: 2,
                    backgroundColor: scheduleTypes[key].color
                  }}
                />
              </Box>
            );
          })}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mb: { sm: 0, xs: 2 }
          }}
        >
          <Button
            variant="outlined"
            type="button"
            sx={{
              fontWeight: "600"
            }}
          >
            {formatDate.format(heads[0], "DD/MM/YYYY")} - {formatDate.format(heads[6], "DD/MM/YYYY")}
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mb: { sm: 0, xs: 2 }
          }}
        >
          <IconButton
            onClick={() => {
              const newCurrentDate = new Date(currentDate);
              newCurrentDate.setDate(newCurrentDate.getDate() - 7);
              setCurrentDate(() => newCurrentDate);
            }}
            disabled={isEqualDateWithoutTime(currentDate, new Date())}
          >
            <ArrowLeftIcon fontSize="large" />
          </IconButton>
          <Button
            variant="contained"
            onClick={() => {
              setCurrentDate(() => new Date());
            }}
            size="small"
          >
            {t("button.currentWeek")}
          </Button>
          <IconButton
            onClick={() => {
              const newCurrentDate = new Date(currentDate);
              newCurrentDate.setDate(newCurrentDate.getDate() + 7);
              setCurrentDate(() => newCurrentDate);
            }}
          >
            <ArrowRightIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          overflow: "auto",
          height: 600
          // minWidth: 1000
        }}
      >
        <Table
          size="small"
          aria-label="a dense table"
          stickyHeader
          sx={{
            borderSpacing: 0
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 2,

                border: "1px solid rgba(0,0,0,0.2)"
              }}
            >
              <TableCell
                sx={{
                  border: "1px solid rgba(0,0,0,0.2)",
                  position: "sticky",
                  left: 0,
                  zIndex: 2,
                  minWidth: 120,
                  backgroundColor: theme.palette.background.paper
                }}
              />
              {heads.map((cell) => {
                const isToday = formatDate.isSameDay(new Date(), cell);
                return (
                  <TableCell
                    sx={{
                      border: "1px solid rgba(0,0,0,0.2)",
                      fontWeight: "600",
                      backgroundColor: isToday && theme.palette.primary.main,
                      color: isToday && "white",
                      zIndex: 1
                    }}
                    key={cell}
                    align="center"
                  >
                    {formatDate.format(cell, "DD/MM (ddd)")}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              borderCollapse: "collapse"
            }}
          >
            {timesList?.map((row, index) => {
              return (
                <TableRow
                  key={timesList[index]?.id}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  sx={{
                    borderCollapse: "collapse"
                  }}
                >
                  <TableCell
                    sx={{
                      border: "1px solid rgba(0,0,0,0.2)",
                      fontWeight: "600",
                      position: "sticky",
                      left: 0,
                      zIndex: 1,
                      minWidth: 120,
                      borderCollapse: "collapse",
                      backgroundColor: theme.palette.background.paper
                    }}
                    component="th"
                    scope="row"
                  >
                    {`${timesList[index]?.timeStart?.split(":")[0]}:${timesList[index]?.timeStart?.split(":")[1]}`} -{" "}
                    {`${timesList[index]?.timeEnd?.split(":")[0]}:${timesList[index]?.timeEnd?.split(":")[1]}`}
                  </TableCell>

                  {renderCols(timesList[index])}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {bookingModal.show && (
        <BookingModal
          show={bookingModal.show}
          setShow={bookingModal.setShow}
          data={bookingModal.data}
          setData={bookingModal.setData}
          handleAfterBooking={handleAfterBooking}
        />
      )}
    </>
  );
}

DoctorScheduleTable.propTypes = {
  timesList: PropTypes.array.isRequired,
  doctorId: PropTypes.string.isRequired
};

export default WithTimesLoaderWrapper(DoctorScheduleTable);
