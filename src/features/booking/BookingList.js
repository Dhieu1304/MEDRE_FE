import { Box, Typography } from "@mui/material";
import BookingCard from "./component/BookingCard";

function BookingList() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Danh sách lịch khám
      </Typography>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cur) => {
        return <BookingCard key={cur} />;
      })}
    </Box>
  );
}

export default BookingList;
