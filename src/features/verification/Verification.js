import { FormProvider, useForm } from "react-hook-form";
import OtpForm from "./components/OtpForm";
import InfoForm from "./components/InfoForm";
import SentEmailInfo from "./components/SentEmailInfo";

function Verification() {
  // const [step, setStep] = useState(4);

  // const location = useLocation();
  // const myData = location.state?.myData;

  // console.log("location.state: ", location.state);

  const infoForm = useForm({
    mode: "onChange",
    defaultValues: {
      phoneNumberOrEmail: "0375435896"
    },
    criteriaMode: "all"
  });

  const otpForm = useForm({
    mode: "onChange",
    defaultValues: {
      phoneNumberOrEmail: "0375435896"
    },
    criteriaMode: "all"
  });

  // const handleSendVerification = async ({ phoneNumberOrEmail }) => {
  const handleSendVerification = async () => {
    // console.log("phoneNumberOrEmail: ", phoneNumberOrEmail);
  };

  // const handleVerifyOtp = async ({ otp }) => {
  const handleVerifyOtp = async () => {
    // console.log("otp: ", otp);
  };

  // console.log("step: ", step);

  const render = () => {
    const step = 4;
    switch (step) {
      case 1:
        return (
          <FormProvider {...infoForm}>
            <InfoForm handleSendVerification={handleSendVerification} />;
          </FormProvider>
        );
      case 2:
        return (
          <FormProvider {...otpForm}>
            <OtpForm handleVerifyOtp={handleVerifyOtp} />;
          </FormProvider>
        );
      case 4:
        return <SentEmailInfo />;
      default:
        return (
          <FormProvider {...infoForm}>
            <InfoForm handleSendVerification={handleSendVerification} />;
          </FormProvider>
        );
    }
  };

  return render();
}

export default Verification;
