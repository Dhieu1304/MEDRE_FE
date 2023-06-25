import { Box, Button, Checkbox, CircularProgress, Grid, ListItemText, MenuItem, Pagination, Select } from "@mui/material";
import PropTypes from "prop-types";
import qs from "query-string";
import { useEffect, useMemo, useState } from "react";

import formatDate from "date-and-time";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import BookingCard from "./component/BookingCard";
import { useFetchingStore } from "../../store/FetchingApiStore";
import bookingServices from "../../services/bookingServices";
import { normalizeStrToInt, normalizeStrToStr, normalizeStrToDateStr } from "../../utils/standardizedForForm";
import CancelBookingModal from "./component/CancelBookingModal";
import { useCustomModal } from "../../components/CustomModal";
import CustomOverlay from "../../components/CustomOverlay/CustomOverlay";
import CustomPageTitle from "../../components/CustomPageTitle";
import { useAppConfigStore } from "../../store/AppConfigStore";
import NoDataBox from "../../components/NoDataBox";
import CustomInput from "../../components/CustomInput/CustomInput";
import { subtractDate } from "../../utils/datetimeUtil";
import useObjDebounce from "../../hooks/useObjDebounce";

function BookingList({ title, bookingListType }) {
  const [bookings, setBookings] = useState([]);
  const [count, setCount] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  const { t: tfilter } = useTranslation("bookingFeature", { keyPrefix: "BookingList.filter" });
  const { t: tSelectType } = useTranslation("bookingFeature", { keyPrefix: "BookingList.select.types" });
  const { locale } = useAppConfigStore();

  const createDefaultValues = ({ page, limit, from, to, type } = {}) => {
    return {
      page: normalizeStrToInt(page, 1),
      limit: normalizeStrToInt(limit, 10),
      from: normalizeStrToDateStr(from),
      to: normalizeStrToDateStr(to),
      type: normalizeStrToStr(type)
    };
  };

  const defaultValues = useMemo(() => {
    const defaultSearchParams = qs.parse(location.search);
    const result = createDefaultValues(defaultSearchParams);

    return result;
  }, []);

  const scheduleTypesList = useMemo(() => {
    return [
      {
        label: tSelectType("online"),
        value: "Online"
      },
      {
        label: tSelectType("offline"),
        value: "Offline"
      },
      {
        label: tSelectType("all"),
        value: ""
      }
    ];
  }, [locale]);

  const { watch, setValue, control, trigger, reset } = useForm({
    mode: "onChange",
    defaultValues,
    criteriaMode: "all"
  });

  const { isLoading, fetchApi } = useFetchingStore();

  const { debouncedObj: searchDebounce, isWaiting: isSearchWaiting } = useObjDebounce(
    { from: watch().from, to: watch().to },
    1000
  );

  const cancelBookingModal = useCustomModal();

  const loadData = async ({ page }) => {
    await fetchApi(async () => {
      let { from } = watch();
      let { to } = watch();
      let order;

      const today = new Date();

      // Nếu type là History
      if (bookingListType === "history") {
        // Nếu "to" ko tồn tại hoặc "to" > today thì "to" = today
        if (!to || subtractDate(new Date(to), today) > 0) {
          to = formatDate.format(new Date(), "YYYY-MM-DD");
        }
        //
        // to = new Date();
        order = "date:desc";
      } else if (bookingListType === "schedule") {
        // Nếu "from" ko tồn tại hoặc "from" < today thì "from" = today
        if (!from || subtractDate(new Date(from), today) < 0) {
          from = formatDate.format(new Date(), "YYYY-MM-DD");
        }
        // from = new Date();
        order = "date:desc";
      }

      // console.log({ from, to });

      const res = await bookingServices.getBookingList({
        page,
        limit: watch().limit,
        from,
        to,
        order,
        type: watch().type
      });

      let countData = 0;
      let bookingsData = [];

      if (res.success) {
        bookingsData = res?.bookings || [];
        countData = res?.count;
        setBookings(bookingsData);
        setCount(countData);

        return { ...res };
      }
      setBookings([]);
      setCount(countData);
      return { ...res };
    });
  };

  useEffect(() => {
    const page = 1;
    const params = { ...watch(), page };

    const searchParams = qs.stringify(params);
    setValue("page", page);
    navigate(`?${searchParams}`);
    loadData({ page });
  }, [watch().type, watch().limit, ...Object.values(searchDebounce)]);

  const handleAfterCancelBooking = async () => {
    await loadData({ page: watch().page });
  };

  return (
    <>
      <CustomOverlay open={isLoading} />
      <Box>
        <CustomPageTitle
          title={title}
          titleRight={isSearchWaiting && <CircularProgress color="primary" size={24} thickness={3} />}
        />

        <Box
          sx={{
            mb: 2
          }}
        >
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12} md={4} lg={4}>
              <CustomInput control={control} label={tfilter("from")} trigger={trigger} name="from" type="date" />
            </Grid>

            <Grid item xs={12} md={4} lg={4}>
              <CustomInput control={control} label={tfilter("to")} trigger={trigger} name="to" type="date" />
            </Grid>

            <Grid item xs={12} md={4} lg={4}>
              <CustomInput control={control} label={tfilter("type")} trigger={trigger} name="type">
                <Select
                  // multiple
                  renderValue={(selected) => {
                    return selected;
                  }}
                >
                  {scheduleTypesList.map((item) => {
                    return (
                      <MenuItem key={item?.value} value={item?.value}>
                        <Checkbox checked={watch().type === item?.value} />
                        <ListItemText primary={item?.label} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </CustomInput>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mb: 4
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              reset(createDefaultValues());
            }}
          >
            {tfilter("button.reset")}
          </Button>
        </Box>

        {count <= 0 && <NoDataBox />}

        {bookings.map((booking) => {
          return <BookingCard key={booking?.id} booking={booking} cancelBookingModal={cancelBookingModal} />;
        })}

        {!!count && (
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
            <Pagination
              count={Math.ceil(count / watch().limit)}
              color="primary"
              page={watch().page}
              sx={{
                display: "flex",
                justifyContent: "flex-end"
              }}
              onChange={(event, newPage) => {
                setValue("page", newPage);
                const params = { ...watch(), page: newPage };
                const searchParams = qs.stringify(params);
                navigate(`?${searchParams}`);
                loadData({ page: newPage });
              }}
            />
          </Box>
        )}
      </Box>

      {cancelBookingModal.show && (
        <CancelBookingModal
          show={cancelBookingModal.show}
          setShow={cancelBookingModal.setShow}
          data={cancelBookingModal.data}
          setData={cancelBookingModal.setData}
          handleAfterCancelBooking={handleAfterCancelBooking}
        />
      )}
    </>
  );
}

BookingList.propTypes = {
  title: PropTypes.string.isRequired,
  bookingListType: PropTypes.oneOf(["schedule", "history"]).isRequired
};

export default BookingList;
