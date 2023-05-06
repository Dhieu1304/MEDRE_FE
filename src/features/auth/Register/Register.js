import OtpForm from "./OtpForm";
import RegisterForm from "./RegisterForm";

const Register = () => {
  // const countStep = useMemo(() => 2);
  //
  // const [step, setStep] = useState(1);

  const render = () => {
    const step = 2;
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
