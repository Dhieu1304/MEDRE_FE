import { Divider, Grid, ListItem, ListItemText, TextField, Paper, List, Fab, Box, Card, CardHeader } from "@mui/material";
import formatDate from "date-and-time";

import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";

// import { useAuthStore } from "../../store/AuthStore";

import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

// import { useTranslation } from "react-i18next";
import CustomOverlay from "../../components/CustomOverlay/CustomOverlay";
import { useFetchingStore } from "../../store/FetchingApiStore";
import ticketServices from "../../services/ticketServices";
import { ticketStatuses } from "../../entities/Ticket";

function TicketDetail() {
  const [ticket, setTicket] = useState();

  const params = useParams();
  const ticketId = params?.ticketId;

  // const { t } = useTranslation("ticketFeature", { keyPrefix: "TicketDetail" });

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      content: ""
    }
  });

  const { isLoading, fetchApi } = useFetchingStore();

  const loadData = async () => {
    await fetchApi(async () => {
      const res = await ticketServices.getTicketDetail(ticketId);

      if (res.success) {
        const ticketData = res?.ticket;
        setTicket(ticketData);

        return { ...res };
      }
      setTicket({});
      return { ...res };
    });
  };
  useEffect(() => {
    if (ticketId) {
      loadData();
    }
  }, [ticketId]);

  const handleResponseMessage = async ({ content }) => {
    const data = {
      id: ticketId,
      content
    };

    await fetchApi(async () => {
      const res = await ticketServices.responseTicket(data);

      if (res.success) {
        await loadData();
        reset();
        return { ...res };
      }

      return { ...res };
    });
  };

  return (
    <>
      <CustomOverlay open={isLoading} />
      <Card
        sx={{
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: 4
        }}
      >
        <CardHeader title={ticket?.title} />
        <Divider />

        <Box component={Paper}>
          <Box>
            <List sx={{ height: "60vh", overflowY: "auto" }}>
              {ticket?.ticketDetails?.map((item) => {
                return item?.idUser ? (
                  <ListItem key={item?.id}>
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItemText sx={{ textAlign: "left" }} primary={item?.content} />
                      </Grid>
                      <Grid item xs={12}>
                        <ListItemText
                          sx={{ textAlign: "left" }}
                          secondary={formatDate.format(new Date(item?.createdAt), "DD/MM/YY hh:mm")}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                ) : (
                  <ListItem key={item?.id}>
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItemText sx={{ textAlign: "right" }} primary={item?.content} />
                      </Grid>
                      <Grid item xs={12}>
                        <ListItemText
                          sx={{ textAlign: "right" }}
                          secondary={formatDate.format(new Date(item?.createdAt), "DD/MM/YY hh:mm")}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                );
              })}
            </List>
            <Divider />
            <Grid container sx={{ padding: "20px" }}>
              <Grid item xs={11}>
                <Controller
                  control={control}
                  name="content"
                  rules={{
                    required: true
                  }}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <TextField
                        sx={{
                          height: "100%",
                          width: "100%"
                        }}
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        fullWidth
                        multiline
                        disabled={ticket?.status === ticketStatuses.CLOSE}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={1} sx={{ textAlign: "right" }}>
                <Fab color="primary" aria-label="add" onClick={handleSubmit(handleResponseMessage)}>
                  <SendIcon />
                </Fab>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Card>
    </>
  );
}

export default TicketDetail;
