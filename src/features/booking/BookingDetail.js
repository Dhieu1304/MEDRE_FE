import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import formatDate from "date-and-time";
import bookingServices from "../../services/bookingServices";
import { useFetchingStore } from "../../store/FetchingApiStore";
import { useAppConfigStore } from "../../store/AppConfigStore";
import { formatDateLocale } from "../../utils/datetimeUtil";
import { bookingPaymentStatuses } from "../../entities/Booking/constant";
import CustomOverlay from "../../components/CustomOverlay/CustomOverlay";
import CustomPageTitle from "../../components/CustomPageTitle";

function BookingDetail() {
  const [booking, setBooking] = useState();

  const { t } = useTranslation("bookingFeature", { keyPrefix: "BookingDetail" });
  const { t: tBooking } = useTranslation("bookingEntity", { keyPrefix: "properties" });
  const { t: tBookingConstants } = useTranslation("bookingEntity", { keyPrefix: "constants" });

  const params = useParams();
  const bookingId = useMemo(() => params?.bookingId, [params?.bookingId]);

  const { isLoading, fetchApi } = useFetchingStore();
  const { locale } = useAppConfigStore();
  // const theme = useTheme();

  useMemo(() => {
    const code = locale.slice(0, 2);
    const currentLocale = formatDateLocale[code] || formatDateLocale.en;
    formatDate.locale(currentLocale);
  }, [locale]);

  const bookingPaymentStatusListObj = useMemo(() => {
    return [
      {
        label: tBookingConstants("paymentStatuses.paid"),
        value: bookingPaymentStatuses.PAID
      },
      {
        label: tBookingConstants("paymentStatuses.unpaid"),
        value: bookingPaymentStatuses.UNPAID
      }
    ].reduce((obj, cur) => {
      return {
        ...obj,
        [cur?.value]: cur
      };
    }, {});
  }, [locale]);

  useEffect(() => {
    const loadData = async () => {
      await fetchApi(
        async () => {
          const res = await bookingServices.getBookingDetail(bookingId);

          if (res.success) {
            const bookingData = res.booking;
            setBooking(bookingData);
            return { ...res };
          }
          setBooking({});
          return { ...res };
        },
        { hideSuccessToast: true }
      );
    };
    loadData();
  }, []);
  const tableFirstCellProps = {
    component: "th",
    scope: "row",
    width: "40%",
    sx: {
      fontSize: {
        md: 16,
        xs: 10
      },
      verticalAlign: "top"
    }
  };

  const tableSecondCellProps = {
    align: "left",
    sx: {
      width: "40%",
      fontSize: {
        md: 16,
        xs: 10
      }
    }
  };

  return (
    <>
      <CustomOverlay open={isLoading} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CustomPageTitle title={t("title")} />
        {/*
          <Button
            variant="contained"
            size="small"
            onClick={() => {}}
            sx={{
              display: {
                sm: "flex",
                xs: "none"
              },
              backgroundColor: theme.palette.success.light,
              color: theme.palette.success.contrastText
            }}
            endIcon={<FileDownloadIcon />}
          >
            {t("button.exportFile")}
          </Button>

          <IconButton
            sx={{
              display: {
                sm: "none",
                xs: "flex"
              },
              color: theme.palette.success.light
            }}
          >
            <FileDownloadIcon />
          </IconButton> */}

        {/* , border: "1px solid rgba(0,0,0,0.2)" */}
        <Box
          sx={{
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
            width: "100%",
            px: {
              md: 0,
              xs: 0
            }
          }}
        >
          <Box sx={{ flexDirection: "column", mb: 2 }}>
            <Typography
              component="h1"
              variant="h6"
              fontWeight={600}
              fontSize={{
                sm: 25,
                xs: 20
              }}
            >
              {t("subTitle.scheduleInfo")}
            </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell {...tableFirstCellProps}>{tBooking("date")}</TableCell>
                    <TableCell {...tableSecondCellProps}>
                      {formatDate.format(new Date(booking?.date), "ddd, DD/MM/YY")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell {...tableFirstCellProps}>{tBooking("time")}</TableCell>
                    <TableCell {...tableSecondCellProps}>
                      {" "}
                      {`${booking?.bookingTimeSchedule?.timeStart?.split(":")[0]}:${
                        booking?.bookingTimeSchedule?.timeStart?.split(":")[1]
                      }`}{" "}
                      -{" "}
                      {`${booking?.bookingTimeSchedule?.timeEnd?.split(":")[0]}:${
                        booking?.bookingTimeSchedule?.timeEnd?.split(":")[1]
                      }`}{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell {...tableFirstCellProps}>{tBooking("schedule.expertise")}</TableCell>
                    <TableCell {...tableSecondCellProps}>{booking?.bookingSchedule?.scheduleExpertise?.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell {...tableFirstCellProps}>{tBooking("paymentStatus")}</TableCell>
                    <TableCell {...tableSecondCellProps}>{bookingPaymentStatusListObj[booking?.isPayment]?.label}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell {...tableFirstCellProps}>{tBooking("reason")}</TableCell>
                    <TableCell {...tableSecondCellProps}>{booking?.reason}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box sx={{ flexDirection: "column", mb: 2 }}>
            <Typography
              component="h1"
              variant="h6"
              fontWeight={600}
              fontSize={{
                sm: 25,
                xs: 20
              }}
            >
              {t("subTitle.doctorInfo")}
            </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell {...tableFirstCellProps}>{tBooking("doctor.name")}</TableCell>
                    <TableCell {...tableSecondCellProps}>{booking?.bookingSchedule?.scheduleOfStaff?.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell {...tableFirstCellProps}>{tBooking("doctor.expertises")}</TableCell>
                    <TableCell {...tableSecondCellProps}>
                      {booking?.bookingSchedule?.scheduleOfStaff?.expertises?.map((expertise) => expertise?.name).join(", ")}{" "}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box sx={{ flexDirection: "column", mb: 2 }}>
            <Typography
              component="h1"
              variant="h6"
              fontWeight={600}
              fontSize={{
                sm: 25,
                xs: 20
              }}
            >
              {t("subTitle.patientInfo")}
            </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell {...tableFirstCellProps}>{tBooking("patient.name")}</TableCell>
                    <TableCell {...tableSecondCellProps}>{booking?.bookingOfPatient?.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell {...tableFirstCellProps}>{tBooking("patient.dob")}</TableCell>
                    <TableCell {...tableSecondCellProps}>
                      {formatDate.format(new Date(booking?.bookingOfPatient?.dob), "DD/MM/YY")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell {...tableFirstCellProps}>{tBooking("patient.phoneNumber")}</TableCell>
                    <TableCell {...tableSecondCellProps}>{booking?.bookingOfPatient?.phoneNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell {...tableFirstCellProps}>{tBooking("patient.address")}</TableCell>
                    <TableCell {...tableSecondCellProps}>{booking?.bookingOfPatient?.address}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default BookingDetail;
