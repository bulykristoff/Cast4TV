// Central color palette for the app, derived from the app icon:
// Hungarian racing-red stripes, a charcoal TV bezel, and white highlights.
// Import `colors` anywhere instead of hard-coding hex values so the whole
// app stays visually consistent.
export const colors = {
  // Brand red (the icon's racing stripes).
  primary: "#E11B22",
  // Darker red for pressed states / drawer active pill.
  primaryDark: "#A5111A",
  // Bright red for highlights (spinners, focus).
  primaryLight: "#FF3B44",

  // Near-black app background (video reads best on black).
  background: "#0D0D0F",
  // Slightly lifted surface for the drawer / cards.
  surface: "#17181C",
  surfaceAlt: "#202228",
  border: "#2A2C33",

  // Text.
  onPrimary: "#FFFFFF",
  text: "#F5F5F7",
  textMuted: "#A0A3AB",
};
