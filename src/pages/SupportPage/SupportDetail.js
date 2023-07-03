import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../store/AuthStore";
import "./SupportPage.css";
import images from "../../assets/images";
import { Avatar, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useFetchingStore } from "../../store/FetchingApiStore";
import axiosClient from "../../config/axiosClient";
import {useParams} from 'react-router-dom';
import camelcaseKeys from "camelcase-keys";
import CustomOverlay from "../../components/CustomOverlay";
import CustomPageTitle from "../../components/CustomPageTitle";
export default function SupportDetail() {
  const { isLoading, fetchApi } = useFetchingStore();
  const authStore = useAuthStore();
  const { t } = useTranslation("supportPage");
  const data = useParams();
  const [ticketDetails, setTicketDetails] = useState([]);
  const [question, setQuestion] = useState("");
  const loadData = async () => {
    await fetchApi(async () => {
      try {
        const res = await axiosClient.get(`/ticket/detail/${data.ticketId}`);
        if (res.status) {
          const ticket = camelcaseKeys(res?.data, { deep: true });
          const ticketDetailsData = ticket || [];
          setTicketDetails(ticketDetailsData);
  
          return { ...res };
        }
        setTicketDetails([]);
          return { ...res };

      } catch (e) {
        // console.error(e.message);
        return {
          success: false,
          message: e.message
        };
      }

    });
  };
  useEffect(() => {
    loadData();
  }, []);

  const changeQuestion = (e) => {
    setQuestion(e.target.value);
  };
  const sendQuestion = async() => {
    await fetchApi(async () => {
      try {
        const res = await axiosClient.post('/ticket/response', {id_ticket: ticketDetails.id, content: question });
        console.log(res);
        if (res.status) {
          return { ...res };
        }
          return { ...res };

      } catch (e) {
        // console.error(e.message);
        return {
          success: false,
          message: e.message
        };
      }
    })
    loadData();
  };
  return (
    <>
      <CustomOverlay open={isLoading} />
      <CustomPageTitle
          title={t("form-detail")}
      />
      <h2>{t("topic")}: {ticketDetails.title}</h2>
      <div className="chatting-info">
        {ticketDetails?.ticketDetails?.map((chatData) => (
          <div className="chatting-group">
            <div>
              <h3>{chatData.idUser == authStore.user.id ? t("form.question") : t("form.answer")}</h3>
              <h4>{chatData.content}</h4>
            </div>
          </div>
        ))}
      </div>
      <div className="input-question">
        <TextField fullWidth id="question" onChange={changeQuestion} />
        <Button onClick={sendQuestion}>
          <SendIcon sx={{ fontSize: 40 }} />
        </Button>
      </div>
    </>
  );
}
