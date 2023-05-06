import { Box, Typography } from "@mui/material";

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import CustomModal from "../../../components/CustomModal";
import { useFetchingStore } from "../../../store/FetchingApiStore/hooks";
import bookingServices from "../../../services/bookingServices";

function CancelBookingModal({ show, setShow, data, setData, handleAfterCancelBooking }) {
  const { t } = useTranslation("bookingFeature", { keyPrefix: "CancelBookingModal" });

  const { fetchApi } = useFetchingStore();

  const handleCancelBooking = async () => {
    await fetchApi(async () => {
      const res = await bookingServices.cancelBooking(data?.id);
      if (res?.success) {
        setShow(false);
        setData({});
        if (handleAfterCancelBooking) await handleAfterCancelBooking();
        return { success: true };
      }
      toast(res.message);
      return { error: res.message };
    });

    setShow(false);
    setData({});

    if (handleAfterCancelBooking) await handleAfterCancelBooking();
  };

  return (
    <CustomModal
      show={show}
      setShow={setShow}
      data={data}
      setData={setData}
      title={t("title")}
      submitBtnLabel={t("button.cancel")}
      onSubmit={handleCancelBooking}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {t("confirmQuestion")}
        </Typography>
      </Box>
    </CustomModal>
  );
}

CancelBookingModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  handleAfterCancelBooking: PropTypes.func.isRequired
};

export default CancelBookingModal;
