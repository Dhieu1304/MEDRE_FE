import { Button } from "@mui/material";
import PropTypes from "prop-types";

export const EMPTY = "EMPTY";
export const BOOKED = "BOOKED";
export const EMPTY_PAST = "EMPTY_PAST";
export const RESERVED = "RESERVED";
export const BUSY = "BUSY";

function BookingButton({ variant, onClick }) {
  const render = () => {
    /*
     "empty": "Book", // có thể book được
     "booked": "Booked", // do chính user đó đã book
     "emptyPast": "Book", // có thể trước book được đã quá giờ (màu mờ hơn "empty")
     "reserved": "Reserved", // đã được người khác book
     "busy" and default: "": // bác sĩ bận, ko book đc lúc đó
    */

    switch (variant) {
      case EMPTY:
        return (
          <Button
            size="small"
            variant="contained"
            sx={{ mx: 0.2, my: 0.2, borderRadius: 10, backgroundColor: "#009dff", color: "white" }}
            onClick={onClick}
          >
            Book
          </Button>
        );
      case BOOKED:
        return (
          <Button
            size="small"
            variant="outlined"
            sx={{
              mx: 0.2,
              my: 0.2,
              borderRadius: 10,
              backgroundColor: "white",
              color: "rgb(46, 204, 113)",
              cursor: "default"
            }}
            onClick={onClick}
            disableTouchRipple
          >
            Booked
          </Button>
        );
      case EMPTY_PAST:
        return (
          <Button
            size="small"
            variant="text"
            sx={{
              mx: 0.2,
              my: 0.2,
              borderRadius: 10,
              backgroundColor: "rgb(245, 245, 245);",
              color: "rgba(0,0,0,0.25)",
              cursor: "default"
            }}
            onClick={onClick}
            disableTouchRipple
          >
            Book
          </Button>
        );
      case RESERVED:
        return (
          <Button
            size="small"
            variant="text"
            sx={{
              mx: 0.2,
              my: 0.2,
              borderRadius: 10,
              backgroundColor: "white",
              color: "rgb(120, 120, 120)",
              cursor: "default"
            }}
            onClick={onClick}
            disableTouchRipple
          >
            Reserved
          </Button>
        );
      case BUSY:
      default:
        return <div />;
    }
  };
  return render();
}

BookingButton.propTypes = {
  variant: PropTypes.string.isRequired
};

export default BookingButton;
