import { FormProvider, useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import OtpForm from "./components/OtpForm";
import InfoForm from "./components/InfoForm";
import SentEmailInfo from "./components/SentEmailInfo";
import patternConfig from "../../config/patternConfig";
import { useFetchingStore } from "../../store/FetchingApiStore";
import authServices from "../../services/authServices";
import CustomOverlay from "../../components/CustomOverlay/CustomOverlay";

const steps = {
  SENT_INFO: "SENT_INFO",
  VERIFY: {
    EMAIL: "EMAIL",
    OTP: "OTP"
  }
};

function Verification() {
  // const [step, setStep] = useState(4);

  const location = useLocation();
  const [initPhoneNumberOrEmail, initStep] = useMemo(() => {
    const phoneNumberOrEmail = location.state?.phoneNumberOrEmail || "";
    const isFinalVerifyStep = location.state?.isFinalVerifyStep;
    let initStepData = steps.SENT_INFO;

    if (patternConfig.phonePattern.test(phoneNumberOrEmail)) {
      if (isFinalVerifyStep) {
        initStepData = steps.VERIFY.OTP;
      }
    } else if (patternConfig.emailPattern.test(phoneNumberOrEmail)) {
      if (isFinalVerifyStep) {
        initStepData = steps.VERIFY.EMAIL;
      }
    }

    return [phoneNumberOrEmail, initStepData];
  }, []);

  const [step, setStep] = useState(initStep);
  const { isLoading, fetchApi } = useFetchingStore();

  const infoForm = useForm({
    mode: "onChange",
    defaultValues: {
      phoneNumberOrEmail: initPhoneNumberOrEmail
    },
    criteriaMode: "all"
  });

  const otpForm = useForm({
    mode: "onChange",
    defaultValues: {
      otp: ""
    },
    criteriaMode: "all"
  });

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

  const resendVerification = async () => {
    const { phoneNumberOrEmail } = infoForm.watch();
    if (patternConfig.phonePattern.test(phoneNumberOrEmail)) {
      await sendVerificationOtpToPhone(phoneNumberOrEmail);
    } else if (patternConfig.emailPattern.test(phoneNumberOrEmail)) {
      await sendVerificationToEmail(phoneNumberOrEmail);
    } else {
      setStep(steps.SENT_INFO);
    }
  };

  const handleSendVerification = async ({ phoneNumberOrEmail }) => {
    if (patternConfig.phonePattern.test(phoneNumberOrEmail)) {
      const res = await sendVerificationOtpToPhone(phoneNumberOrEmail);
      if (res?.success) {
        setStep(steps.VERIFY.OTP);
      }
    } else {
      const res = await sendVerificationToEmail(phoneNumberOrEmail);
      if (res?.success) {
        setStep(steps.VERIFY.EMAIL);
      }
    }
  };

  const handleVerifyOtp = async ({ otp }) => {
    await fetchApi(async () => {
      const res = await authServices.verifyOtpToVerfifyPhoneNumber(otp);
      if (res.success) {
        toast(res.message);
        // navigate
        return { success: true };
      }
      toast(res.message);
      return { error: res.message };
    });
  };

  const backToFirstStep = () => {
    setStep(steps.SENT_INFO);
    otpForm.reset({
      otp: ""
    });
  };

  const render = () => {
    switch (step) {
      case steps.SENT_INFO:
        return (
          <FormProvider {...infoForm}>
            <InfoForm handleSendVerification={handleSendVerification} />;
          </FormProvider>
        );
      case steps.VERIFY.OTP:
        return (
          <FormProvider {...otpForm}>
            <OtpForm
              handleVerifyOtp={handleVerifyOtp}
              backToFirstStep={backToFirstStep}
              resendVerification={resendVerification}
            />
            ;
          </FormProvider>
        );

      case steps.VERIFY.EMAIL:
        return <SentEmailInfo backToFirstStep={backToFirstStep} resendVerification={resendVerification} />;
      default:
        return (
          <FormProvider {...infoForm}>
            <InfoForm handleSendVerification={handleSendVerification} />;
          </FormProvider>
        );
    }
  };

  return (
    <>
      <CustomOverlay open={isLoading} />
      {render()}
    </>
  );
}

export default Verification;
