import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import BookingCard from "./component/BookingCard";

function BookingList({ title }) {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        {title}
      </Typography>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cur) => {
        return <BookingCard key={cur} />;
      })}
    </Box>
  );
}

BookingList.propTypes = {
  title: PropTypes.string.isRequired
};

export default BookingList;
