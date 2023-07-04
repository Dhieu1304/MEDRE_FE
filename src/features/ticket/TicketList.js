import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Paper, Table, TableBody, TableContainer, TableHead, TableRow, useTheme } from "@mui/material";
import formatDate from "date-and-time";
import { Link, useLocation } from "react-router-dom";
import CustomTableCell, { customTableCellVariant } from "../../components/CustomTableCell";
import { useCustomModal } from "../../components/CustomModal";
import CustomOverlay from "../../components/CustomOverlay";
import CustomPageTitle from "../../components/CustomPageTitle";
import { useFetchingStore } from "../../store/FetchingApiStore";
import AddTicketModal from "./components/AddTicketModal";
import { cleanUndefinedAndEmptyStrValueObject } from "../../utils/objectUtil";
import ticketServices from "../../services/ticketServices";
import { useTicketStatusesContantTranslation } from "./hooks/useTicketConstantsTranslation";

export default function SupportList() {
  const { isLoading, fetchApi } = useFetchingStore();
  const { t } = useTranslation("supportPage");
  const { t: tSupport } = useTranslation("supportPage", { keyPrefix: "properties" });
  const [tickets, setTickets] = useState([]);
  const theme = useTheme();
  const addTicketModal = useCustomModal();
  const location = useLocation();
  const columns = useMemo(() => [
    {
      id: "title",
      label: tSupport("title"),
      minWidth: 400
    },
    {
      id: "status",
      label: tSupport("status"),
      minWidth: 200
    },
    {
      id: "createdAt",
      label: tSupport("createdAt"),
      minWidth: 200
    },
    {
      id: "updatedAt",
      label: tSupport("updatedAt"),
      minWidth: 200
    },
    {
      id: "action",
      label: "",
      minWidth: 100
    }
  ]);
  const [, ticketStatusListObj] = useTicketStatusesContantTranslation();

  // status: Open, Closed
  // order:'status:asc','status:desc','createdAt:asc','createdAt:desc',
  const params = cleanUndefinedAndEmptyStrValueObject({
    order: "createdAt:asc",
    page: 1,
    limit: 100
  });

  const loadData = async () => {
    await fetchApi(async () => {
      const res = await ticketServices.getTickets(params);

      if (res.success) {
        const ticketsData = res.tickets;
        setTickets([...ticketsData]);
        return { ...res };
      }
      setTickets([]);
      return { ...res };
    });
  };
  useEffect(() => {
    loadData();
  }, []);

  const handleAfterAddTicket = async () => {
    await loadData();
  };

  return (
    <div>
      <CustomOverlay open={isLoading} />
      <Box>
        <CustomPageTitle
          title={t("title")}
          right={
            <Button
              variant="contained"
              onClick={() => {
                addTicketModal.setShow(true);
              }}
              sx={{
                bgcolor: theme.palette.success.light
              }}
            >
              {t("button.add")}
            </Button>
          }
        />
        <TableContainer component={Paper} sx={{ mb: 4, height: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns?.map((column) => {
                  const minWidth = column?.minWidth;
                  const align = column.id === "value" ? "center" : undefined;
                  return (
                    <CustomTableCell
                      key={column?.id}
                      align={align}
                      sx={{ minWidth }}
                      variant={customTableCellVariant.HEAD_CELL}
                    >
                      {column.label}
                    </CustomTableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets?.map((ticket) => {
                return (
                  <TableRow key={ticket?.id}>
                    <CustomTableCell>{ticket?.title}</CustomTableCell>
                    <CustomTableCell>{ticketStatusListObj?.[ticket?.status]?.label}</CustomTableCell>
                    <CustomTableCell>{formatDate.format(new Date(ticket?.createdAt), "DD/MM/YYYY")}</CustomTableCell>
                    <CustomTableCell>{formatDate.format(new Date(ticket?.updatedAt), "DD/MM/YYYY")}</CustomTableCell>
                    <CustomTableCell variant={customTableCellVariant.ACTION_BODY_CELL}>
                      <Box
                        component={Link}
                        to={`${location.pathname}/${ticket?.id}`}
                        variant="contained"
                        size="small"
                        sx={{
                          px: 1,
                          py: 0.5,
                          borderRadius: 5,
                          textDecoration: "none",
                          width: { sm: "inherit", xs: "100%" },
                          mb: { sm: 0, xs: 1 },
                          ml: { sm: 1, xs: 0 },
                          backgroundColor: theme.palette.primary.light,
                          color: theme.palette.primary.contrastText,
                          ":hover": {
                            backgroundColor: theme.palette.primary.dark,
                            color: theme.palette.primary.contrastText
                          }
                        }}
                      >
                        {t("button.detail")}
                      </Box>
                    </CustomTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {addTicketModal.show && (
        <AddTicketModal
          show={addTicketModal.show}
          setShow={addTicketModal.setShow}
          handleAfterAddTicket={handleAfterAddTicket}
        />
      )}
    </div>
  );
}
