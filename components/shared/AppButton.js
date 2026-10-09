import { Pressable, Text, StyleSheet } from "react-native";
import { colors } from "../../theme";

// Themed pressable button replacing RN's unstyleable <Button>. `variant`
// controls the look: "primary" (solid red) or "secondary" (outlined).
const AppButton = ({ title, onPress, variant = "primary", style }) => {
  const isPrimary = variant === "primary";
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.secondary,
        pressed && (isPrimary ? styles.primaryPressed : styles.secondaryPressed),
        style,
      ]}
    >
      <Text style={[styles.text, !isPrimary && styles.secondaryText]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: colors.primary,
  },
  primaryPressed: {
    backgroundColor: colors.primaryDark,
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  secondaryPressed: {
    backgroundColor: colors.surfaceAlt,
  },
  text: {
    color: colors.onPrimary,
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  secondaryText: {
    color: colors.primary,
  },
});

export default AppButton;
