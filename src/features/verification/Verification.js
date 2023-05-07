import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import { useFetchingStore } from "../../store/FetchingApiStore";
import authServices from "../../services/authServices";
import CustomOverlay from "../../components/CustomOverlay/CustomOverlay";
import VerificationForm from "./components/VerificationForm/VerificationForm";

function Verification() {
  const { isLoading, fetchApi } = useFetchingStore();
  const sendVerificationOtpToPhone = async (phoneNumber) => {
    // return await fetchApi(async () => {
    return fetchApi(async () => {
      const res = await authServices.sendVerificationOtpToPhone(phoneNumber);
      if (res.success) {
        toast(res.message);
        return { success: true };
      }
      toast(res.message);
      return { error: res.message };
    });
  };

  const sendVerificationToEmail = async (email) => {
    // return await fetchApi(async () => {
    return fetchApi(async () => {
      const res = await authServices.sendVerificationToEmail(email);
      if (res.success) {
        toast(res.message);
        return { success: true };
      }
      toast(res.message);
      return { error: res.message };
    });
  };

  return (
    <>
      <CustomOverlay open={isLoading} />
      <Typography>Verification</Typography>
      <VerificationForm
        sendVerificationOtpToPhone={sendVerificationOtpToPhone}
        sendVerificationToEmail={sendVerificationToEmail}
      />
    </>
  );
}

export default Verification;
