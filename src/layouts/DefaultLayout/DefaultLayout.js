import { Box } from "@mui/material";
import PropTypes from "prop-types";

function DefaultLayout({ children }) {
  return <Box sx={{ backgroundColor: "red" }}>{children}</Box>;
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default DefaultLayout;
