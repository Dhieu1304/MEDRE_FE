import { Button } from "@mui/material";
import PropTypes from "prop-types";

function ExpertiseButton({ label }) {
  return (
    <Button disableTouchRipple size="small" variant="outlined" sx={{ mx: 0.2, my: 0.2, borderRadius: 10 }}>
      {label}
    </Button>
  );
}

ExpertiseButton.propTypes = {
  label: PropTypes.string.isRequired
};

export default ExpertiseButton;
