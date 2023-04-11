import { JitsiMeeting } from "@jitsi/react-sdk";
import React, { useRef } from "react";
import { userDecoded } from "./config";

function MeetingPage() {
  const apiRef = useRef();

  const printEventOutput = () => {
    // updateLog((items) => [...items, JSON.stringify(payload)]);
  };

  const handleAudioStatusChange = (payload) => {
    if (payload.muted) {
      // updateLog((items) => [...items, `${feature} off`]);
    } else {
      // updateLog((items) => [...items, `${feature} on`]);
    }
  };

  const handleChatUpdates = (payload) => {
    if (payload.isOpen || !payload.unreadCount) {
      return;
    }
    apiRef.current.executeCommand("toggleChat");
    // updateLog((items) => [...items, `you have ${payload.unreadCount} unread messages`]);
  };

  const handleKnockingParticipant = () => {
    // updateLog((items) => [...items, JSON.stringify(payload)]);
    // updateKnockingParticipants((participants) => [...participants, payload?.participant]);
  };

  const handleJitsiIFrameRef1 = (iframeRef) => {
    const style = {
      border: "10px solid #3d3d3d",
      background: "#3d3d3d",
      height: "400px",
      marginBottom: "20px"
    };

    Object.assign(iframeRef.style, style);
  };
  const handleApiReady = (apiObj) => {
    apiRef.current = apiObj;
    apiRef.current.on("knockingParticipant", handleKnockingParticipant);
    apiRef.current.on("audioMuteStatusChanged", (payload) => handleAudioStatusChange(payload, "audio"));
    apiRef.current.on("videoMuteStatusChanged", (payload) => handleAudioStatusChange(payload, "video"));
    apiRef.current.on("raiseHandUpdated", printEventOutput);
    apiRef.current.on("titleViewChanged", printEventOutput);
    apiRef.current.on("chatUpdated", handleChatUpdates);
    apiRef.current.on("knockingParticipant", handleKnockingParticipant);
  };

  const handleReadyToClose = () => {
    /* eslint-disable-next-line no-alert */
    alert("Ready to close...");
  };

  // const generateRoomName = () => `JitsiMeetRoomNo${Math.random() * 100}-${Date.now()}`;

  // const domain = "https://meet.lettutor.com";
  const { roomName } = userDecoded;
  const userDisplayName = userDecoded.context.user.name;
  const userEmail = userDecoded.context.user.email;

  const renderSpinner = () => (
    <div
      style={{
        fontFamily: "sans-serif",
        textAlign: "center"
      }}
    >
      Loading..
    </div>
  );

  return (
    <>
      <h1
        style={{
          fontFamily: "sans-serif",
          textAlign: "center"
        }}
      >
        JitsiMeeting Demo MeetingPage
      </h1>
      <JitsiMeeting
        roomName={roomName}
        userInfo={{
          userDisplayName,
          userEmail
        }}
        spinner={renderSpinner}
        configOverwrite={{
          subject: "lalalala",
          hideConferenceSubject: false
        }}
        onApiReady={(externalApi) => handleApiReady(externalApi)}
        onReadyToClose={handleReadyToClose}
        getIFrameRef={handleJitsiIFrameRef1}
      />
    </>
  );
}

export default MeetingPage;

// import { useEffect } from "react";
// import JitsiMeetJS from "lib-jitsi-meet";

// function MeetingPage() {
//   const roomName = "my-jitsi-room";
//   const domain = "meet.jit.si";
//   let connection = null;
//   let isJoined = false;
//   let room = null;

//   useEffect(() => {
//     const options = {
//       hosts: {
//         domain: domain,
//         muc: `conference.${domain}`
//       },
//       bosh: `//${domain}/http-bind?room=${roomName}`,
//       clientNode: "http://jitsi.org/jitsimeet"
//     };

//     connection = new JitsiMeetJS.JitsiConnection(null, null, options);

//     connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
//     connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, onConnectionFailed);
//     connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, disconnect);

//     JitsiMeetJS.mediaDevices.addEventListener(JitsiMeetJS.events.mediaDevices.DEVICE_LIST_CHANGED, onDeviceListChanged);

//     connection.connect();

//     return () => {
//       connection.disconnect();
//       JitsiMeetJS.mediaDevices.removeEventListener(JitsiMeetJS.events.mediaDevices.DEVICE_LIST_CHANGED, onDeviceListChanged);
//     };
//   }, []);

//   const onConnectionSuccess = () => {
//     room = connection.initJitsiConference(roomName, {
//       openBridgeChannel: true
//     });
//     room.addEventListener(JitsiMeetJS.events.conference.CONFERENCE_JOINED, onConferenceJoined);
//     room.addEventListener(JitsiMeetJS.events.conference.CONFERENCE_ERROR, onConferenceError);
//     room.addEventListener(JitsiMeetJS.events.conference.CONFERENCE_LEFT, onConferenceLeft);
//   };

//   const onConnectionFailed = (error) => {
//     console.error("Connection Failed!", error);
//   };

//   const disconnect = () => {
//     console.log("Disconnected!");
//   };

//   const onDeviceListChanged = (devices) => {
//     console.info("Device list changed!", devices);
//   };

//   const onConferenceJoined = () => {
//     console.log("Conference joined!");
//     isJoined = true;
//     room.setDisplayName("My Name");
//   };

//   const onConferenceError = (error) => {
//     console.error("Conference Error!", error);
//   };

//   const onConferenceLeft = () => {
//     console.log("Conference left!");
//     isJoined = false;
//   };

//   const joinConference = () => {
//     if (!isJoined) {
//       room.join();
//     }
//   };

//   const leaveConference = () => {
//     if (isJoined) {
//       room.leave();
//     }
//   };

//   return (
//     <div>
//       <h1>Jitsi Meet React MeetingPage</h1>
//       <button onClick={joinConference}>Join Conference</button>
//       <button onClick={leaveConference}>Leave Conference</button>
//     </div>
//   );
// }

// export default MeetingPage;

// import jwt_decode from "jwt-decode";
// import { JitsiMeeting } from "@jitsi/react-sdk";
// import { userDecoded } from "./config";

// export default function MeetingPage() {
//   console.log("MeetingPage");
//   const YOUR_DOMAIN = "https://meet.lettutor.com";

//   return (
//     <JitsiMeeting
//       domain={YOUR_DOMAIN}
//       roomName={userDecoded.roomName}
//       configOverwrite={{
//         startWithAudioMuted: true,
//         disableModeratorIndicator: true,
//         startScreenSharing: true,
//         enableEmailInStats: false
//       }}
//       interfaceConfigOverwrite={{
//         DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
//       }}
//       userInfo={{
//         displayName: userDecoded.context.user.email
//       }}
//       // onApiReady={(externalApi) => {
//       //   // here you can attach custom event listeners to the Jitsi Meet External API
//       //   // you can also store it locally to execute commands
//       // }}
//       getIFrameRef={(iframeRef) => {
//         iframeRef.style.height = "400px";
//       }}
//     />
//   );
// }
