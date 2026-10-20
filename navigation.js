import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { CastButton } from "react-native-google-cast";
import { Text, View, Image, StyleSheet } from "react-native";
import RenderChannel from "./components/RenderChannel";
import { colors } from "./theme";

const Drawer = createDrawerNavigator();

const M4_LOGO =
  "https://upload.wikimedia.org/wikipedia/hu/thumb/f/fd/M4_logo.png/1200px-M4_logo.png";

// Every channel in the drawer. Two kinds of source:
//   • `channel`   — a mediaklikk id that RenderChannel scrapes at runtime
//                   (M4 Sport family, may be Widevine DRM).
//   • `streamUrl` — a direct HLS (.m3u8) URL played as-is, no scraping/DRM.
//                   These sports channels come from the iptv-org project
//                   (https://github.com/iptv-org/iptv, "Sports" category +
//                   country playlists). Must be https and send CORS headers,
//                   or the Cast receiver can't load them.
// To add a channel, add an entry here — no other code changes needed.
const CHANNELS = [
  { name: "M4_Sport", title: "M4 Sport", logoUrl: M4_LOGO, params: { channel: "mtv4live" } },
  { name: "M4_SportPlus", title: "M4 Sport+", logoUrl: M4_LOGO, params: { channel: "mtv4plus" } },
  {
    name: "RedBullTV",
    title: "Red Bull TV",
    logoUrl: "https://images.pluto.tv/channels/5e7cb84a172a0f0007da69e4/colorLogoPNG.png",
    params: { streamUrl: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8" },
  },
  {
    name: "FuelTV",
    title: "Fuel TV",
    logoUrl: "https://i.imgur.com/I8mviBy.png",
    params: {
      streamUrl:
        "https://amg01074-fueltv-fueltvemeaen-rakuten-b6j62.amagi.tv/hls/amagi_hls_data_rakutenAA-fueltvemeaen/CDN/master.m3u8",
    },
  },
  {
    name: "GloryKickboxing",
    title: "GLORY Kickboxing",
    logoUrl: "https://i.imgur.com/tS7Ub7i.png",
    params: {
      streamUrl:
        "https://6f972d29.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/UmFrdXRlblRWLWV1X0dsb3J5S2lja2JveGluZ19ITFM/playlist.m3u8",
    },
  },
  {
    name: "RallyTV",
    title: "Rally TV",
    logoUrl: "https://i.postimg.cc/WtLq2C7c/logo-Rally-Tv1.png",
    params: {
      streamUrl:
        "https://rally-tv-live.akamaized.net/hls/live/2117704/RallyTV-Pri/master.m3u8",
    },
  },
  {
    name: "TennisChannel",
    title: "Tennis Channel",
    logoUrl: "https://i.imgur.com/tsljAnY.png",
    params: {
      streamUrl:
        "https://cdn-ue1-prod.tsv2.amagi.tv/linear/amg01444-tennischannelth-tennischannelnl-samsungnl/playlist.m3u8",
    },
  },
  {
    name: "TennisChannel2",
    title: "Tennis Channel 2",
    logoUrl:
      "https://image-resizer-cloud-cdn.api.cms.amdvids.com/image/7382296F-97F6-4450-B77B-8FE331FC04F6/3-1x1.png",
    params: { streamUrl: "https://mumbai-edge.smartplaytv.in/Tennis2/index.m3u8" },
  },
  {
    name: "Unbeaten",
    title: "Unbeaten",
    logoUrl: "https://i.imgur.com/LmkNt3v.png",
    params: {
      streamUrl:
        "https://lukentvlive.vgcdn.net/v1/master/cef183924f24adfa3d5d7601c3a17769082c0c2b/UnbeatenSports/playlist.m3u8",
    },
  },
  {
    name: "WorldOfFreesports",
    title: "World of Freesports",
    logoUrl: "https://i.imgur.com/lta5Mog.png",
    params: {
      streamUrl:
        "https://mainstreammedia-worldoffreesportsintl-rakuten.amagi.tv/playlist.m3u8",
    },
  },
  {
    name: "WorldPokerTour",
    title: "World Poker Tour",
    logoUrl: "https://i.imgur.com/98kLMjj.png",
    params: {
      streamUrl:
        "https://d39g1vxj2ef6in.cloudfront.net/v1/master/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod-rakuten-stitched/playlist.m3u8?ads.xumo_channelId=88883102",
    },
  },
  {
    name: "Stadium",
    title: "Stadium",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Stadium_%28sports_network%29_logo.svg/960px-Stadium_%28sports_network%29_logo.svg.png",
    params: {
      streamUrl:
        "https://wurl120sports.global.transmit.live/hls/679a907dce42a042c23ace37/v1/stadium_gracenote/samsung_us/latest/main/hls/playlist.m3u8",
    },
  },
  {
    name: "TraceSportStars",
    title: "Trace Sport Stars",
    logoUrl: "https://i.imgur.com/FabFP5A.png",
    params: { streamUrl: "https://lightning-tracesport-samsungau.amagi.tv/playlist.m3u8" },
  },

  // ── Romanian ──
  {
    name: "TVRSport",
    title: "TVR Sport",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/TVR_Sport_Logo_2023.svg/960px-TVR_Sport_Logo_2023.svg.png",
    params: { streamUrl: "https://tvr-sport.lg.mncdn.com/tvrsport/smil:tvrsport.smil/playlist.m3u8" },
  },

  // ── Arabic (iptv-org has no free Saudi sports streams; these are Gulf/Levant) ──
  {
    name: "KTVSport",
    title: "KTV Sport",
    logoUrl: "https://i.imgur.com/R1hGX1d.png",
    params: { streamUrl: "https://kwtspta.cdn.mangomolo.com/sp/smil:sp.stream.smil/chunklist.m3u8" },
  },
  {
    name: "AlIraqiaSport",
    title: "Al Iraqia Sport",
    logoUrl: "https://i.imgur.com/DrrlxTO.png",
    params: { streamUrl: "https://imn-live.esite-lab.com/hls/iraqia-sports-1.m3u8" },
  },
  {
    name: "JordanSport",
    title: "Jordan Sport",
    logoUrl: "https://i.imgur.com/2EmrZPQ.png",
    params: { streamUrl: "https://jrtv-live.ercdn.net/jordansporthd/jordansporthd.m3u8" },
  },

  // ── English ──
  {
    name: "talkSPORT",
    title: "talkSPORT",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/9/9d/Talksport_logo.png",
    params: {
      streamUrl:
        "https://af7a8b4e.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/TEctZ2JfdGFsa1NQT1JUX0hMUw/playlist.m3u8",
    },
  },
  {
    name: "FIFAPlusWomen",
    title: "FIFA+ Women",
    logoUrl: "https://i.imgur.com/xy9ZxVO.png",
    params: {
      streamUrl:
        "https://cffda8ff.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/U2Ftc3VuZy1nYl9GSUZBUGx1c3dvbWVuX0hMUw/playlist.m3u8",
    },
  },
  {
    name: "PGATour",
    title: "PGA Tour",
    logoUrl: "https://i.imgur.com/J0TY9dG.png",
    params: { streamUrl: "https://d11k1mnrgfposz.cloudfront.net/playlist.m3u8" },
  },
  // amagi master playlists lack CORS headers (the Cast receiver would reject
  // them), so these two point straight at the 1080p variant, which has them.
  {
    name: "NHLNetwork",
    title: "NHL Network",
    logoUrl: "https://i.imgur.com/UNZ8bef.png",
    params: { streamUrl: "https://nhl-firetv.amagi.tv/playlist1080p.m3u8" },
  },
  {
    name: "beINSportsXtra",
    title: "beIN SPORTS XTRA",
    logoUrl: "https://i.ibb.co/HT49GPmB/XTRA-2.png",
    params: { streamUrl: "https://bein-xtra-bein.amagi.tv/playlistR1080p.m3u8" },
  },
  {
    name: "StrongmanChampionsLeague",
    title: "Strongman Champions League",
    logoUrl:
      "https://images-0.rakuten.tv/storage/global-live-channel/translation/artwork/30ccc088-dca7-4458-ad5a-328fef06e1ca-width200-quality90.png",
    params: { streamUrl: "https://rightsboosterltd-scl-1-be.samsung.wurl.tv/playlist.m3u8" },
  },
];

// Shared header/appearance for every channel screen so adding a channel stays
// a one-liner (see CLAUDE.md). Pass the display title.
const channelScreenOptions = (title) => ({
  title,
  headerStyle: {
    backgroundColor: colors.primary,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTintColor: colors.onPrimary,
  headerTitleStyle: {
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  headerRight: () => (
    <CastButton
      style={{ width: 40, height: 40, marginRight: 12, tintColor: colors.onPrimary }}
    />
  ),
});

export default function MainStack() {
  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props} style={styles.drawer}>
        <View style={styles.drawerHeader}>
          <Image
            source={require("./assets/icon.png")}
            style={styles.drawerLogo}
          />
          <Text style={styles.drawerTitle}>Cast4TV</Text>
          <Text style={styles.drawerSubtitle}>Channels</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="M4_Sport"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: colors.surface,
          },
          drawerActiveTintColor: colors.onPrimary,
          drawerInactiveTintColor: colors.textMuted,
          drawerActiveBackgroundColor: colors.primary,
          drawerLabelStyle: {
            fontWeight: "700",
            fontSize: 15,
          },
          drawerItemStyle: {
            borderRadius: 12,
            marginHorizontal: 8,
          },
        }}
      >
        {CHANNELS.map(({ name, title, logoUrl, params }) => (
          <Drawer.Screen
            key={name}
            name={name}
            component={RenderChannel}
            initialParams={{ ...params, channelName: title, logoUrl }}
            options={channelScreenOptions(title)}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: colors.surface,
  },
  drawerHeader: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    marginBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    alignItems: "flex-start",
  },
  drawerLogo: {
    width: 56,
    height: 56,
    borderRadius: 14,
    marginBottom: 12,
  },
  drawerTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  drawerSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 2,
  },
});
