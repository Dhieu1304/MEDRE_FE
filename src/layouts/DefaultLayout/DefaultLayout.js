import { Box } from "@mui/material";
import PropTypes from "prop-types";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header";

function DefaultLayout({ children }) {
  return (
    <Box sx={{ width: "100vw", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box sx={{ width: "100%", height: "100%", flexGrow: 1 }} px={12} py={4}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default DefaultLayout;
