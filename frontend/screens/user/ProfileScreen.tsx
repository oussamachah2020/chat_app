import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useUserStore } from "../../store/userStore";

type Props = {};

const ProfileScreen = (props: Props) => {
  const setAccessToken = useUserStore((v) => v.setAccessToken);
  return (
    <View
      style={{
        marginTop: 50,
      }}
    >
      <TouchableOpacity onPress={() => setAccessToken("")}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
