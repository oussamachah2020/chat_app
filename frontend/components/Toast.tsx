import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FONTS, SHADOWS, assets } from "../constants";
import toastStore from "../store/toastStore";

type ToastProps = {};

function Toast({}: ToastProps) {
  const { type, title, text, setVisible } = toastStore();

  return (
    <View style={styles.container}>
      {type === "valid" && <Image source={assets.Correct} />}
      {type === "error" && <Image source={assets.Wrong} />}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{text}</Text>
      </View>
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => setVisible(false)}
      >
        <Image source={assets.Close} />
      </TouchableOpacity>
    </View>
  );
}

export default Toast;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    backgroundColor: "#fff",
    marginHorizontal: 31,
    borderRadius: 10,
    padding: 15,
    // ...SHADOWS.medium,
    position: "absolute",
    zIndex: 10,
    top: 40,
    right: 0,
    left: 0,
    elevation: 10,
  },
  contentContainer: {
    justifyContent: "center",
    marginLeft: 9,
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
  },
  message: {
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  closeBtn: {
    position: "relative",
    left: 30,
  },
});
