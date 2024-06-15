import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const Button = ({
  colorTitle,
  colorBackground,
  onPress,
  title,
  icon,
  disabled
}) => (
  <TouchableOpacity
    disabled={disabled ? disabled : false}
    onPress={onPress}
    activeOpacity={0.8}
    style={[
      styles.bt,
      { backgroundColor: disabled ? (disabled ? 'silver' : colorBackground) : colorBackground, borderColor: colorTitle },
    ]}
  >
    {icon && icon()}

    <Text style={[styles.textBT, { color: colorTitle }]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  textBT: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  bt: {
    justifyContent: "center",
    borderRadius: 5,
    paddingHorizontal: 30,
    padding: 15,
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    borderWidth: 0.5,
  },
});
