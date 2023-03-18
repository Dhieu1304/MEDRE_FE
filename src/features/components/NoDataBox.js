import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function NoDataBox() {
  const { t } = useTranslation("common");

  return (
    <Box textAlign="center" m={2}>
      <Typography variant="h6" component="p">
        {t("no_data")}
      </Typography>
    </Box>
  );
}

export default NoDataBox;
