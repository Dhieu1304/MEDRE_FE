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
import { useCustomModal } from "../../../components/CustomModal";
import scheduleServices from "../../../services/scheduleServices";
import { formatDateLocale, getNext7DaysFrom, isEqualDateWithoutTime } from "../../../utils/datetimeUtil";
import BookingModal from "../components/BookingModal";
import WithTimesLoaderWrapper from "../../time/hocs/WithTimesLoaderWrapper";

import { findBookingsByDate, groupSchedulesDayOfWeekAndSession, isTimeOffAtThisScheduleTime } from "./utils";
import { useAppConfigStore } from "../../../store/AppConfigStore";
import { useFetchingStore } from "../../../store/FetchingApiStore";
import timeOffServices from "../../../services/timeOffServices";
import { scheduleSessions } from "../../../entities/Schedule";
import { useAuthStore } from "../../../store/AuthStore/hooks";
import { bookingStatuses } from "../../../entities/Booking";

function DoctorScheduleTable({ timesList, doctorId }) {
  const [schedules, setSchedules] = useState([]);
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
  const { locale } = useAppConfigStore();
  const authStore = useAuthStore();

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

  const loadData = async () => {
    await fetchApi(async () => {
      const res = await scheduleServices.getScheduleListByDoctorId(doctorId, heads[0], heads[6]);

      if (res.success) {
        const schedulesData = res.schedules;
        // console.log("res: ", res);
        setSchedules(schedulesData);
        return { success: true, error: "" };
      }
      setSchedules([]);
      return { success: false, error: res.message };
    });
  };

  const loadTimeOffs = async () => {
    await fetchApi(async () => {
      const res = await timeOffServices.getTimeOffByDoctorId(doctorId, {
        from: heads[0],
        to: heads[6]
      });

      if (res.success) {
        const timeOffsData = res.timeOffs;
        setTimeOffs(timeOffsData);
        return { success: true, error: "" };
      }
      setTimeOffs([]);
      return { success: false, error: res.message };
    });
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

  const schedulesDayOfWeekAndSession = useMemo(() => {
    return groupSchedulesDayOfWeekAndSession(schedules);
  }, [schedules]);

  const renderBookingButton = (booking) => {
    if (!booking) {
      return (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#009dff",
            color: "white"
          }}
        >
          {t("button.book")}
        </Button>
      );
    }

    if (booking?.idUser === authStore?.user?.id) {
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
          >
            {t("button.waiting")}
          </Button>
        );
      return null;
    }
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
  };

  const renderCell = (schedule, colDate, time) => {
    // console.log("schedule: ", schedule);
    const booking = findBookingsByDate(schedule?.bookings, colDate, time);

    const isTimeOff = isTimeOffAtThisScheduleTime(timeOffs, colDate, time);

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
                  cursor: booking && "pointer"
                }}
              >
                {renderBookingButton(booking)}
              </Box>
            </>
          )}
        </Box>
      </TableCell>
    );
  };

  const renderCols = (time) => {
    // Group các schedules lại theo dayOfWeek => để dựa trên dayOfWeek truy xuất schedule của ngày đó

    const cols = Array.from({ length: 7 }, (_, index) => {
      // schedulesBySession là 1 obj có 2 key morning và afternoon
      const schedulesBySession = schedulesDayOfWeekAndSession[index];
      let schedule;
      const { session } = time;

      switch (session) {
        case scheduleSessions.MORNING:
          schedule = schedulesBySession.morning || schedulesBySession.wholeDay;
          break;

        case scheduleSessions.AFFTERNOON:
          schedule = schedulesBySession.afternoon || schedulesBySession.wholeDay;
          break;

        default:
          break;
      }

      const colDate = heads[index];
      return renderCell(schedule, colDate, time);
    });

    return cols;
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
          height: 750
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
                    {/* {row?.timeStart} - {row?.timeEnd} */}
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
