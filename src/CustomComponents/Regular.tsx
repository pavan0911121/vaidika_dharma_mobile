import { StyleSheet, Text, TextProps } from "react-native";
import React from "react";

interface Props extends TextProps {
  children: React.ReactNode;
  color?: string;
  fontSize?: number;
}

const Regular: React.FC<Props> = ({
  children,
  color = "#000000",
  fontSize = 14,
  style,
  ...rest
}) => {
  return (
    <Text
      style={[styles.text, { color, fontSize, }, style]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Regular;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins-Regular", // ensure font is added & linked
  },
});