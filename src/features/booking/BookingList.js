import { Box, Pagination, Typography } from "@mui/material";
import PropTypes from "prop-types";
import qs from "query-string";
import { useEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import BookingCard from "./component/BookingCard";
import { useFetchingStore } from "../../store/FetchingApiStore";
import bookingServices from "../../services/bookingServices";
import { normalizeStrToInt } from "../../utils/standardizedForForm";
import CancelBookingModal from "./component/CancelBookingModal";
import { useCustomModal } from "../../components/CustomModal";

function BookingList({ title, type }) {
  const [bookings, setBookings] = useState([]);
  const [count, setCount] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  const createDefaultValues = ({ page, limit } = {}) => {
    return {
      page: normalizeStrToInt(page, 1),
      limit: normalizeStrToInt(limit, 10)
    };
  };

  const defaultValues = useMemo(() => {
    const defaultSearchParams = qs.parse(location.search);
    const result = createDefaultValues(defaultSearchParams);

    return result;
  }, []);

  const { watch, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    criteriaMode: "all"
  });

  const { fetchApi } = useFetchingStore();

  const cancelBookingModal = useCustomModal();

  const loadData = async ({ page }) => {
    fetchApi(async () => {
      let from;
      let to;
      let order;
      if (type === "history") {
        to = new Date();
        order = "date:desc";
      } else if (type === "schedule") {
        from = new Date();
        order = "date:asc";
      }
      const res = await bookingServices.getBookingList({
        page,
        limit: watch().limit,
        from,
        to,
        order
      });

      let countData = 0;
      let bookingsData = [];

      if (res.success) {
        bookingsData = res?.bookings || [];
        countData = res?.count;
        setBookings(bookingsData);
        setCount(countData);

        return { success: true };
      }
      setBookings([]);
      setCount(countData);
      return { error: res.message };
    });
  };

  useEffect(() => {
    const page = 1;
    const params = { ...watch(), page };

    const searchParams = qs.stringify(params);
    setValue("page", page);
    navigate(`?${searchParams}`);
    loadData({ page });
  }, [watch().limit]);

  const handleAfterCancelBooking = async () => {
    await loadData({ page: watch().page });
  };

  return (
    <>
      <Box>
        <Typography
          component="h1"
          variant="h4"
          fontWeight={600}
          fontSize={{
            sm: 30,
            xs: 25
          }}
          sx={{
            mb: 4
          }}
        >
          {title}
        </Typography>
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
  type: PropTypes.oneOf(["schedule", "history"]).isRequired
};

export default BookingList;
