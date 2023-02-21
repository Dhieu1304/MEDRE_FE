import OtpForm from "./OtpForm";
import RegisterForm from "./RegisterForm";

const Register = () => {
  // const countStep = useMemo(() => 2);
  //
  // const [step, setStep] = useState(1);

  // const prevStep = () => {
  //   if (step > 1) setStep((prev) => prev + 1);
  // };

  // const nextStep = () => {
  //   if (step < countStep) setStep((prev) => prev + 1);
  // };

  const render = () => {
    const step = 1;
    switch (step) {
      case 1:
        return <RegisterForm />;
      case 2:
        return <OtpForm />;
      default:
        return <>ERROR</>;
    }
  };

  return render();
};

export default Register;
