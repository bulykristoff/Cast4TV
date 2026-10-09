import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as ScreenOrientation from "expo-screen-orientation";
import CastContext from "react-native-google-cast";
import MainStack from "./navigation";
import { colors } from "./theme";

export default function App() {
  useEffect(() => {
    // app.json declares orientation "default" so the OS *allows* landscape
    // (required for the video's fullscreen rotation). Keep the app itself
    // pinned to portrait here; RenderChannel temporarily unlocks to landscape
    // while the player is in fullscreen and re-locks on dismiss.
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  // DEBUG: trace device discovery + the full Cast session lifecycle.
  //   devices: [] forever            → discovery broken (network / permissions)
  //   castState Connecting → NoDevicesAvailable/NotConnected
  //                                  → receiver (EC2D8F42) failed to launch;
  //                                    onSessionStartFailed logs WHY.
  //   session STARTED                → connect OK, problem is in loadMedia.
  useEffect(() => {
    const sm = CastContext.getSessionManager();
    const dm = CastContext.getDiscoveryManager();
    const subs = [
      CastContext.onCastStateChanged((state) =>
        console.log("* [CAST] castState:", state)
      ),
      sm.onSessionStarting(() => console.log("* [CAST] session STARTING")),
      sm.onSessionStarted((s) =>
        console.log("* [CAST] session STARTED, id:", s?.id)
      ),
      sm.onSessionStartFailed((s, error) =>
        console.log("* [CAST] session START FAILED:", JSON.stringify(error))
      ),
      sm.onSessionSuspended((s, reason) =>
        console.log("* [CAST] session SUSPENDED:", reason)
      ),
      sm.onSessionResuming(() => console.log("* [CAST] session RESUMING")),
      sm.onSessionResumed(() => console.log("* [CAST] session RESUMED")),
      sm.onSessionEnding(() => console.log("* [CAST] session ENDING")),
      sm.onSessionEnded((s, error) =>
        console.log("* [CAST] session ENDED:", JSON.stringify(error ?? "no error"))
      ),
      dm.onDevicesUpdated((devices) =>
        console.log(
          "* [CAST] devices:",
          JSON.stringify(devices.map((d) => d.friendlyName))
        )
      ),
    ];
    CastContext.getCastState().then((state) =>
      console.log("* [CAST] initial castState:", state)
    );
    dm.startDiscovery()
      .then(() => console.log("* [CAST] discovery started"))
      .catch((e) => console.log("* [CAST] startDiscovery failed:", e?.message));
    return () => subs.forEach((sub) => sub?.remove?.());
  }, []);

  return (
    <>
      <StatusBar backgroundColor={colors.primary} style="light" />

      <MainStack />
    </>
  );
}
