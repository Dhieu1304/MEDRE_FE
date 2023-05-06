import { useState } from "react";
import OtpForm from "./OtpForm";
import RegisterForm from "./RegisterForm";

const Register = () => {
  // const countStep = useMemo(() => 2);
  //
  const [step, setStep] = useState(1);

  const render = () => {
    switch (step) {
      case 1:
        return <RegisterForm step={step} setStep={setStep} />;
      case 2:
        return <OtpForm step={step} setStep={setStep} />;
      default:
        return <RegisterForm step={step} setStep={setStep} />;
    }
  };

  return render();
};

export default Register;
