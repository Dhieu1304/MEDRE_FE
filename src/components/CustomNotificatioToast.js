import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

function CustomNotificatioToast({ title, body }) {
  return (
    <Box>
      {title && (
        <Typography variant="h4" fontWeight={600} color="#000" fontSize={20}>
          {title}
        </Typography>
      )}
      {body && <Box component="p">{body}</Box>}
    </Box>
  );
}

CustomNotificatioToast.defaultProps = {
  title: undefined,
  body: undefined
};

CustomNotificatioToast.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string
};

export default CustomNotificatioToast;
