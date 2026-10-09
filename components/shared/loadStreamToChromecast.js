import { MediaHlsSegmentFormat } from "react-native-google-cast";

// Headers our custom receiver forwards onto the Widevine license POST. Mirrors
// the working web-player license request. Best-effort only (see receiver code:
// Referer/Origin are forbidden XHR headers the browser may strip).
const LICENSE_HEADERS = {
  Referer: "https://player.mediaklikk.hu/",
  Origin: "https://player.mediaklikk.hu",
};

// Shown on the TV when a channel doesn't provide its own logo.
const DEFAULT_LOGO =
  "https://upload.wikimedia.org/wikipedia/hu/thumb/f/fd/M4_logo.png/1200px-M4_logo.png";

const loadStreamToChromecast = ({
  client,
  url,
  licenseServer,
  channelName,
  logoUrl,
  directStream,
}) => {
  if (client && url) {
    const isDash = url.toLowerCase().includes(".mpd");
    // Fall back to sensible defaults if none were passed.
    const title = channelName || "M4 Sport";
    const image = logoUrl || DEFAULT_LOGO;

    // For Widevine DASH we hand the license server URL to the CUSTOM receiver
    // via customData. The receiver's LOAD interceptor reads `licenseUrl` and
    // configures a Widevine PlaybackConfig. Without a custom receiver app id
    // (app.json → react-native-google-cast → receiverAppId) this is ignored by
    // the Default Media Receiver and DRM playback fails with idleReason "error".
    const customData = licenseServer
      ? { licenseUrl: licenseServer, licenseHeaders: LICENSE_HEADERS }
      : undefined;

    // Return the promise so callers can await readiness / catch+retry.
    return client.loadMedia({
      mediaInfo: {
        contentUrl: url,
        contentType: isDash ? "application/dash+xml" : "application/x-mpegURL",
        // hlsSegmentFormat only applies to HLS streams. M4's scraped HLS uses
        // MPEG-TS segments and casting needs the explicit hint. The iptv-org
        // channels are a mix of TS and fMP4/CMAF, so for those (directStream)
        // we omit the hint and let the receiver auto-detect — forcing TS on an
        // fMP4 stream would break casting.
        ...(isDash || directStream
          ? {}
          : { hlsSegmentFormat: MediaHlsSegmentFormat.TS }),
        ...(customData ? { customData } : {}),
        // NOTE: `type` must be one of react-native-google-cast's valid
        // metadata types ("generic" | "movie" | "musicTrack" | "photo" |
        // "tvShow"). The previous `type: "user"` (plus a bogus `mykey` field)
        // was invalid, so the whole metadata object was dropped and the TV
        // fell back to showing the receiver app name ("Cast4TV") instead of
        // the channel. "generic" reliably surfaces `title` on the receiver UI.
        metadata: {
          type: "generic",
          title,
          subtitle: "Live",
          images: [{ url: image }],
        },
      },
    });
  }

  return Promise.resolve();
};

export { loadStreamToChromecast };
