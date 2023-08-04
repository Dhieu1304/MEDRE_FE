import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Fragment, useEffect, useMemo, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import * as locales from "@mui/material/locale";

import { privateRoutes, publicRoutes } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";
import { useAuthStore } from "./store/AuthStore/hooks";
import { useAppConfigStore } from "./store/AppConfigStore";
import { getTheme } from "./config/themeConfig";
import CustomOverlay from "./components/CustomOverlay";
import useNotificationBackground from "./features/notification/hooks/useNotificationBackground";
import { useFetchingStore } from "./store/FetchingApiStore";
import settingServices from "./services/settingServices";

function App() {
  const authStore = useAuthStore();
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  const { fetchApi } = useFetchingStore();
  const { mode, locale, updateSettingConfig } = useAppConfigStore();

  const theme = useMemo(() => createTheme(getTheme(mode), locales[locale]), [mode, locale]);

  useNotificationBackground();

  useEffect(() => {
    const loadData = async () => {
      await authStore.loadUserInfo();
      setIsFirstVisit(false);
    };
    loadData();
  }, []);

  const loadSettings = async () => {
    await fetchApi(async () => {
      const res = await settingServices.getSettingList();

      if (res.success) {
        const settingsData = res?.settings || [];
        updateSettingConfig([...settingsData]);
        // console.log("settingsData: ", settingsData);
      }
      return { ...res };
    });
  };
  useEffect(() => {
    if (authStore?.isLogin) {
      loadSettings();
    }
  }, [authStore?.isLogin]);

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
