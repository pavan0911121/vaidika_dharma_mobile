import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
interface Props {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  fontFamily?: string;
  paddingVertical?: number;
  paddingHorizontal?: number;
}
const PrimaryButon:React.FC<Props> = ({
  title,
  onPress,
  backgroundColor = "#5B3415",
  textColor = "#FFFFFF",
  borderRadius = 100,
  fontFamily = "Poppins-Bold",
  paddingVertical = 14,
  paddingHorizontal = 40,
})  => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor, borderRadius, paddingVertical, paddingHorizontal },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, { color: textColor, fontFamily }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default PrimaryButon

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontFamily:"Poppins-Light",
  },
});