import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Fragment, useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import * as locales from "@mui/material/locale";

import Cookies from "js-cookie";
import { privateRoutes, publicRoutes } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";
import { useAuthStore } from "./store/AuthStore/hooks";
import { useAppConfigStore } from "./store/AppConfigStore";
import { getTheme } from "./config/themeConfig";
import CustomOverlay from "./components/CustomOverlay";
import cookiesUtil from "./utils/cookiesUtil";
import { SOCKET, socket } from "./config/socketConfig";
import { requestPermission } from "./config/firebase";
import { useFetchingStore } from "./store/FetchingApiStore";
import notificationServices from "./services/notificationServices";
import CustomNotificatioToast from "./components/CustomNotificatioToast";

function App() {
  const authStore = useAuthStore();
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isSocketConnected, setIsSocketConnected] = useState(true);

  const { mode, locale, notifications, notificationLimit, updateNotifications } = useAppConfigStore();
  const { fetchApi } = useFetchingStore();

  const theme = useMemo(() => createTheme(getTheme(mode), locales[locale]), [mode, locale]);

  // console.log("locale: ", locale);
  // console.log("notifications: ", notifications);
  const loadNotifications = async (loadLimit) => {
    const newLoadLimit = loadLimit || notificationLimit || 5;
    // console.log("newLoadLimit: ", newLoadLimit);

    await fetchApi(async () => {
      const res = await notificationServices.getNotificationList({ limit: newLoadLimit });
      if (res.success) {
        const notificationData = res?.notifications || [];
        const page = res?.page;
        const limit = res?.limit;
        const totalPages = res?.totalPages;
        const count = res?.count;
        // console.log({ page, limit, totalPages, count });
        updateNotifications({
          notificationData,
          page,
          limit,
          totalPages,
          count
        });
        return { ...res };
      }
      return { ...res };
    });
  };

  useEffect(() => {
    const loadData = async () => {
      await authStore.loadUserInfo();
      setIsFirstVisit(false);
    };
    loadData();
  }, []);

  const onConnect = () => {
    // console.log("Connect");
    setIsSocketConnected(true);
  };
  const onDisconnect = () => {
    // console.log("Diconnect");
    setIsSocketConnected(false);
  };

  const handleNotifications = async (payload) => {
    toast(<CustomNotificatioToast title={payload?.notification?.title} body={payload?.notification?.body} />, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

    await loadNotifications((notifications?.length || 0) + 1);
  };

  // console.log("notifications: ", notifications);

  useEffect(() => {
    socket.on(SOCKET.CONNECT, () => {});
    socket.on(SOCKET.DISCONNECT, () => {});
    socket.on(SOCKET.CONNECT_ERROR, () => {});
    socket.on(SOCKET.SUCCESS, () => {});
    socket.on(SOCKET.ERROR, () => {});

    // socket.on("Success", (message) => {
    //   // console.log("Success: ", message);
    // });
    // socket.on("Error", (message) => {
    //   // console.log("Error: ", message);
    // });
    // socket.on("connect_error", (error) => {
    //   // console.log("Error", error.message);
    // });

    return () => {
      socket.off(SOCKET.CONNECT, onConnect);
      socket.off(SOCKET.DISCONNECT, onDisconnect);
    };
  }, []);

  useEffect(() => {
    if (isSocketConnected) {
      socket.on(SOCKET.NOTIFICATION, handleNotifications);
      return () => {
        socket.off(SOCKET.NOTIFICATION, handleNotifications);
      };
    }
    return () => {};
  }, [isSocketConnected, notifications]);

  const handleAfterLogin = async () => {
    socket.emit(SOCKET.JOIN_ROOM, Cookies.get(cookiesUtil.COOKIES.ACCESS_TOKEN));
    await loadNotifications();
    const token = await requestPermission();
    if (token) {
      await notificationServices.subscribeTopic(token);
    }
  };

  useEffect(() => {
    // console.log("authStore.isLogin: ", authStore.isLogin);
    if (authStore.isLogin) {
      handleAfterLogin();
    }
  }, [authStore.isLogin]);

  // console.log("notifications: ", notifications);

  return (
    <ThemeProvider theme={theme}>
      {isFirstVisit ? (
        <Box width="100vw" height="100vh" bgcolor="#ccc">
          <CustomOverlay open={authStore.isLoading} />
        </Box>
      ) : (
        <>
          <CustomOverlay open={authStore.isLoading} />
          {authStore.isLogin ? (
            <Router>
              <Routes>
                {privateRoutes.map((route) => {
                  let Layout = DefaultLayout;
                  if (route.layout) {
                    Layout = route.layout;
                  } else if (route.layout === null) {
                    Layout = Fragment;
                  }

                  const Page = route.component;
                  const to = route.props?.to;
                  const replace = route.props?.replace;

                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        <Layout>
                          <Page to={to} replace={replace} />
                        </Layout>
                      }
                    />
                  );
                })}
              </Routes>
            </Router>
          ) : (
            <Router>
              <Routes>
                {publicRoutes.map((route) => {
                  let Layout = DefaultLayout;
                  if (route.layout) {
                    Layout = route.layout;
                  } else if (route.layout === null) {
                    Layout = Fragment;
                  }

                  const Page = route.component;
                  const to = route.props?.to;
                  const replace = route.props?.replace;

                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        <Layout>
                          <Page to={to} replace={replace} />
                        </Layout>
                      }
                    />
                  );
                })}
              </Routes>
            </Router>
          )}
          <ToastContainer
            position="top-right"
            autoClose={50}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
