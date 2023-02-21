import { useMemo, useState } from "react";
import PhoneNumberForm from "./PhoneNumberForm";
import OtpForm from "./OtpForm";

const ForgetPassword = () => {
  const countStep = useMemo(() => 2);

  const [step, setStep] = useState(1);

  const prevStep = () => {
    if (step > 1) setStep((prev) => prev + 1);
  };

  const nextStep = () => {
    if (step < countStep) setStep((prev) => prev + 1);
  };

  const render = () => {
    switch (step) {
      case 1:
        return <PhoneNumberForm prevStep={prevStep} nextStep={nextStep} />;
      case 2:
        return <OtpForm />;
      default:
        return <>Error</>;
    }
  };

  return render();
};

export default ForgetPassword;
