import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { userType, users } from "../constants/defaultData";
import { assets } from "../constants";
import { Avatar } from "react-native-paper";

type Props = {
  user: userType;
};

function UsersList({ user }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 20,
        marginTop: 20,
        marginLeft: 20,
      }}
    >
      <TouchableOpacity
        key={user.id}
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Image
          source={assets.State}
          style={{ position: "absolute", top: 0, right: 5, zIndex: 10 }}
        />
        <Avatar.Image size={50} source={user.profilePic} />
        <Text>{user.fullName}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default UsersList;
