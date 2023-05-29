import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { LIGHT } from "../../config/themeConfig";
import Context from "./Context";

function AppConfigProvider({ children }) {
  const [mode, setMode] = useState(LIGHT);

  const [notifications, setNotifications] = useState([]);
  const [notificationLimit, setNotificationLimit] = useState(10);
  const [notificationPage, setNotificationPage] = useState(1);
  const [notificationTotalPages, setNotificationTotalPages] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);

  const [settingConfig, setSettingConfig] = useState({});

  const localeCodeObj = useMemo(() => {
    return {
      vi: "viVN",
      en: "enUS"
    };
  }, []);

  const currentLocaleCode = localStorage.getItem("i18nextLng") || "en";

  const [locale, setLocale] = useState(localeCodeObj[currentLocaleCode]);

  // console.log("notifications: ", notifications);

  const updateSettingConfig = (settings) => {
    const settingConfigObj = settings?.reduce((acc, cur) => {
      return {
        ...acc,
        [cur?.name]: cur
      };
    }, {});
    setSettingConfig({ ...settingConfigObj });
  };

  // console.log("settingConfig: ", settingConfig);

  const updateNotifications = ({ notificationData, page, limit, totalPages, count }) => {
    setNotifications(() => [...notificationData]);
    setNotificationPage(page);
    setNotificationLimit(limit);
    setNotificationTotalPages(totalPages);
    setNotificationCount(count);
  };

  const markReadNotification = (index) => {
    const newNotification = { ...notifications[index], read: true };
    const newNotifications = [...notifications];
    newNotifications[index] = newNotification;
    setNotifications([...newNotifications]);
  };

  // console.log({ notificationLimit, notificationPage, notificationTotalPages, notificationCount });

  const value = useMemo(
    () => ({
      mode,
      setMode,
      locale,
      setLocale,
      notifications,
      notificationLimit,
      notificationPage,
      notificationTotalPages,
      notificationCount,
      updateNotifications,
      markReadNotification,
      settingConfig,
      updateSettingConfig
    }),
    [
      mode,
      locale,
      notifications,
      notificationLimit,
      notificationPage,
      notificationTotalPages,
      notificationCount,
      settingConfig
    ]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

AppConfigProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppConfigProvider;
