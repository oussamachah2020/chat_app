import React from "react";
import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useUserStore } from "../../store/userStore";
import { COLORS, FONTS, assets } from "../../constants";
import { services } from "../../constants/userServices";
import { Col, Row, Grid } from "react-native-easy-grid";
import { FlatGrid } from "react-native-super-grid";
import { Icon } from "@rneui/themed";

type Props = {};

const ProfileScreen = (props: Props) => {
  const setAccessToken = useUserStore((v) => v.setAccessToken);
  const email = useUserStore((v) => v.email);
  const fullName = useUserStore((v) => v.fullName);

  return (
    <View
      style={{
        marginTop: 80,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            position: "relative",
          }}
        >
          <Image
            source={assets.FullProfilePic}
            alt="profile_pic"
            style={{
              width: 120,
              height: 120,
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              width: 38,
              height: 38,
              padding: 10,
              borderRadius: 50,
              justifyContent: "center",
              position: "absolute",
              right: 0,
              bottom: 0,
            }}
          >
            <Icon
              name="camera"
              size={15}
              type="font-awesome"
              color={"#9747FF"}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.medium,
              textTransform: "uppercase",
              fontSize: 14,
            }}
          >
            {fullName}
          </Text>
          <Text
            style={{
              fontFamily: FONTS.medium,
              fontSize: 14,
              color: "rgba(0, 0, 0, 0.30)",
            }}
          >
            {email}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FlatGrid
            itemDimension={110}
            data={services}
            style={styles.gridView}
            spacing={10}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                style={{
                  borderRadius: 10,
                  backgroundColor:
                    "linear-gradient(135deg, rgba(94, 48, 231, 0.90) 0%, rgba(39, 17, 107, 0.79) 100%)",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 110,
                  height: 85,
                }}
              >
                <Image source={item.icon} resizeMode="contain" />
                <Text
                  style={{
                    fontFamily: FONTS.medium,
                    color: "#fff",
                    textAlign: "center",
                    marginTop: 5,
                  }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <Button
        icon="logout"
        mode="contained"
        onPress={() => setAccessToken("")}
        style={{
          position: "absolute",
          bottom: -100,
          alignSelf: "center",
        }}
      >
        Logout
      </Button>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
});
