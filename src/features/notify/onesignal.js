import OneSignal from "react-onesignal";

const appId = process.env.REACT_APP_OS_APP_ID;
// const appId = "d3ec3eaa-2a3b-46ef-a66b-02def951635f";
export default async function runOneSignal() {
  // console.log("appID: ", appId);
  await OneSignal.init({ appId, allowLocalhostAsSecureOrigin: true });
  // console.log("result: ", result);
  await OneSignal.showSlidedownPrompt();
}
