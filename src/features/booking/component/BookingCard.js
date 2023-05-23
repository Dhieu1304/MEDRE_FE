import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Grid,
  useTheme
} from "@mui/material";

import PropTypes from "prop-types";
import formatDate from "date-and-time";
import Countdown from "react-countdown";
import { useTranslation } from "react-i18next";

import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAppConfigStore } from "../../../store/AppConfigStore";
import { formatDateLocale } from "../../../utils/datetimeUtil";
import { scheduleTypes } from "../../../entities/Schedule";
import { bookingStatuses } from "../../../entities/Booking";
import { useFetchingStore } from "../../../store/FetchingApiStore";
import paymentServices from "../../../services/paymentServices";

function BookingCard({ booking, cancelBookingModal }) {
  //   const navigate = useNavigate();

  const { locale } = useAppConfigStore();

  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { fetchApi } = useFetchingStore();

  const { t } = useTranslation("bookingFeature", { keyPrefix: "BookingCard" });
  const { t: tBooking } = useTranslation("bookingEntity", { keyPrefix: "properties" });
  const { t: tBookingConstants } = useTranslation("bookingEntity", { keyPrefix: "constants" });
  const { t: tScheduleConstants } = useTranslation("scheduleEntity", { keyPrefix: "constants" });

  useMemo(() => {
    const code = locale?.slice(0, 2);
    const currentLocale = formatDateLocale[code] || formatDateLocale.en;
    formatDate.locale(currentLocale);
  }, [locale]);

  const bookingStatusListObj = useMemo(() => {
    return [
      {
        label: tBookingConstants("statuses.booked"),
        value: bookingStatuses.BOOKED
      },
      {
        label: tBookingConstants("statuses.cancel"),
        value: bookingStatuses.CANCELED
      },
      {
        label: tBookingConstants("statuses.waiting"),
        value: bookingStatuses.WAITING
      }
    ].reduce((obj, cur) => {
      return {
        ...obj,
        [cur?.value]: cur
      };
    }, {});
  }, [locale]);

  const scheduleTypeListObj = useMemo(() => {
    return [
      {
        label: tScheduleConstants("types.offline"),
        value: scheduleTypes.TYPE_OFFLINE
      },
      {
        label: tScheduleConstants("types.online"),
        value: scheduleTypes.TYPE_ONLINE
      }
    ].reduce((obj, cur) => {
      return {
        ...obj,
        [cur?.value]: cur
      };
    }, {});
  }, [locale]);

  const waitingTimeToSchedule = useMemo(() => {
    const date = new Date(booking?.date);
    const timeStart = booking?.bookingTimeSchedule?.timeStart;
    const [h = 0, m = 0, s = 0] = timeStart ? timeStart.split(":") : [0, 0, 0];

    date.setHours(h, m, s, 0);

    return date;
  }, []);

  const tableFirstCellProps = {
    component: "th",
    scope: "row",
    width: {
      md: "30%",
      xs: "40%"
    },
    sx: {
      fontSize: {
        md: 16,
        xs: 10
      }
    }
  };

  const tableSecondCellProps = {
    align: "left",
    sx: {
      fontSize: {
        md: 16,
        xs: 10
      }
    }
  };

  const handlePayment = async () => {
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
        window.location.href = data;
        return { success: true };
      }

      return { error: res.message };
    });
  };

  const renderCardActions = () => {
    return (
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
          alignItems: "center"
        }}
      >
        {formatDate.subtract(new Date(), waitingTimeToSchedule).toDays() < -1 &&
          booking.bookingStatus !== bookingStatuses.CANCELED && (
            <Button
              variant="contained"
              size="small"
              sx={{
                width: { sm: "inherit", xs: "100%" },
                mb: { sm: 0, xs: 1 },
                ml: 0,
                backgroundColor: theme.palette.error.light,
                color: theme.palette.error.contrastText,
                ":hover": {
                  backgroundColor: theme.palette.error.dark,
                  color: theme.palette.error.contrastText
                }
              }}
              onClick={() => {
                // navigate(`${location.pathname}/${booking?.id}`);
                cancelBookingModal.setShow(true);
                cancelBookingModal.setData(booking);
              }}
            >
              {t("button.cancel")}
            </Button>
          )}

        {!booking?.isPayment && booking.bookingStatus !== bookingStatuses.CANCELED && (
          <Button
            variant="contained"
            size="small"
            sx={{
              width: { sm: "inherit", xs: "100%" },
              mb: { sm: 0, xs: 1 },
              ml: { sm: 1, xs: 0 },
              backgroundColor: theme.palette.success.light,
              color: theme.palette.success.contrastText,
              ":hover": {
                backgroundColor: theme.palette.success.dark,
                color: theme.palette.success.contrastText
              }
            }}
            onClick={handlePayment}
          >
            {t("button.payment")}
          </Button>
        )}
        <Button
          variant="contained"
          size="small"
          sx={{
            width: { sm: "inherit", xs: "100%" },
            mb: { sm: 0, xs: 1 },
            ml: { sm: 1, xs: 0 },
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
            ":hover": {
              backgroundColor: theme.palette.primary.dark,
              color: theme.palette.primary.contrastText
            }
          }}
          onClick={() => {
            navigate(`${location.pathname}/${booking?.id}`);
          }}
        >
          {t("button.detail")}
        </Button>
      </Box>
    );
  };

  const renderStatus = (status) => {
    const { CANCELED, BOOKED, WAITING } = bookingStatuses;

    switch (status) {
      case CANCELED:
        return (
          <Typography
            sx={{
              color: theme.palette.error.light
            }}
          >
            {bookingStatusListObj[status]?.label}
          </Typography>
        );

      case BOOKED:
        return (
          <Typography
            sx={{
              color: theme.palette.success.light
            }}
          >
            {bookingStatusListObj[status]?.label}
          </Typography>
        );

      case WAITING:
        return (
          <Typography
            sx={{
              color: theme.palette.warning.light
            }}
          >
            {bookingStatusListObj[status]?.label}
          </Typography>
        );

      default:
        return null;
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2,
        border: "1px solid rgba(0,0,0,0.1)",
        mb: 10
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                md: "row",
                xs: "column"
              },
              justifyContent: "flex-start"
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mr: {
                  md: 4,
                  xs: 0
                },
                mb: {
                  md: 0,
                  xs: 2
                }
              }}
            >
              <Typography variant="h5">{formatDate.format(new Date(booking?.date), "ddd, DD/MM/YY")}</Typography>
              <Box sx={{ color: "red" }}>
                <Countdown
                  date={waitingTimeToSchedule}
                  renderer={({ days, hours, minutes, seconds, completed }) => {
                    return (
                      !completed && (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center"
                          }}
                        >
                          {!!days && (
                            <Typography
                              variant="body2"
                              sx={{
                                mr: 1
                              }}
                            >
                              {days} {t("countDown.day")}
                            </Typography>
                          )}
                          <Typography variant="body2">
                            {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:
                            {seconds.toString().padStart(2, "0")}
                          </Typography>
                        </Box>
                      )
                    );
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="recipe"
                    alt={booking?.bookingSchedule?.scheduleOfStaff?.name}
                    src={booking?.bookingSchedule?.scheduleOfStaff?.image}
                  />
                }
                title={booking?.bookingSchedule?.scheduleOfStaff?.name}
                subheader={`(${booking?.bookingSchedule?.scheduleOfStaff?.certificate})`}
                sx={{
                  m: 0,
                  p: 0
                }}
              />
              <CardContent sx={{ display: { xs: "none", lg: "flex" }, flexGrow: 1, pt: 0, ml: 5 }}>
                <Typography>{booking?.bookingSchedule?.scheduleOfStaff?.description}</Typography>
              </CardContent>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <Box sx={{ flexDirection: "column", p: 0, mb: 2 }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody
                    sx={
                      {
                        // border: "1px solid rgba(0,0,0,0.2)"
                      }
                    }
                  >
                    <TableRow>
                      <TableCell {...tableFirstCellProps}>{tBooking("time")}</TableCell>
                      <TableCell {...tableSecondCellProps}>
                        {`${booking?.bookingTimeSchedule?.timeStart?.split(":")[0]}:${
                          booking?.bookingTimeSchedule?.timeStart?.split(":")[1]
                        }`}{" "}
                        -{" "}
                        {`${booking?.bookingTimeSchedule?.timeEnd?.split(":")[0]}:${
                          booking?.bookingTimeSchedule?.timeEnd?.split(":")[1]
                        }`}{" "}
                        ({scheduleTypeListObj[booking?.bookingSchedule?.type]?.label})
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell {...tableFirstCellProps}>{tBooking("schedule.expertise")}</TableCell>
                      <TableCell {...tableSecondCellProps}>{booking?.bookingSchedule?.scheduleExpertise?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell {...tableFirstCellProps}>{tBooking("patient.name")}</TableCell>
                      <TableCell {...tableSecondCellProps}>{booking?.bookingOfPatient?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell {...tableFirstCellProps}>{tBooking("reason")}</TableCell>
                      <TableCell {...tableSecondCellProps}>{booking?.reason}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell {...tableFirstCellProps}>{tBooking("status")}</TableCell>
                      <TableCell {...tableSecondCellProps}>{renderStatus(booking?.bookingStatus)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            {renderCardActions()}
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

BookingCard.propTypes = {
  booking: PropTypes.object.isRequired,
  cancelBookingModal: PropTypes.object.isRequired
};

export default BookingCard;
