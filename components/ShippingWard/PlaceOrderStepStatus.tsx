import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InfoDelive from "./InfoDelive";
import Payment from "./Payment";
import PlacedOrder from "./PlacedOrder";
import { useAppSelector } from "@/utils/hooks";
import { selectCart } from "@/utils/slice";
import ReviewOrder from "./ReviewOrder";

const renderMultipleForm = (activeStep: number, handleComplete: () => void) => {
  if (activeStep === 0) {
    return <InfoDelive handleComplete={handleComplete} />;
  }
  if (activeStep === 1) {
    return <Payment handleComplete={handleComplete} />;
  }
  if (activeStep === 2) {
    return <ReviewOrder handleComplete={handleComplete} />;
  }
};
const PlaceOrderStepStatus: React.FC = () => {
  const { shippingWards } = useAppSelector(selectCart);
  const indexActive = shippingWards.tabActive;
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  let [steps] = React.useState([
    "Thông tin vận chuyển",
    "Phương thức thanh toán",
    "Xác nhận",
    "Đặt hàng",
  ]);
  React.useEffect(() => {
    console.log("indexActive: ", indexActive);

    setActiveStep(indexActive);
  }, [indexActive, shippingWards]);

  React.useEffect(() => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
  }, [activeStep, completed]);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step: any, i: any) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  React.useEffect(() => {
    console.log("completed: ", completed);
  }, [completed]);

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <PlacedOrder />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ mt: 2, mb: 1, py: 1 }}>
              {renderMultipleForm(activeStep, handleComplete)}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
};
export default PlaceOrderStepStatus;
