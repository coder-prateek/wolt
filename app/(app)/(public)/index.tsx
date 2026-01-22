import AuthButtons from "@/Components/ui/Buttons/auth-bttons";
import ScrollView from "@/Components/ui/scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Index() {
  const openWebBrowser = () => {
    console.log("Open Web Browser");
  };
  return (
    <View style={styles.constainer}>
      <View style={styles.infiniteScroller}>
        <View>
          <ScrollView ScrollDirection="down" iconSet="set1" />
        </View>
        <View>
          <ScrollView ScrollDirection="up" iconSet="set2" />
        </View>
        <View>
          <ScrollView ScrollDirection="down" iconSet="set3" />
        </View>
        <LinearGradient
          colors={["transparent", "#fff"]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 200,
          }}
        />
      </View>
      <View style={styles.contentContainer}>
        <Image
          source={require("../../../assets/images/wolt-logo.png")}
          style={styles.brandLogo}
        />
        <Animated.Text
          entering={FadeInDown}
          // style={styles.tagline}
          className="text-center text-[32px] font-black mb-12 leading-9"
        >
          Almost everything delivered
        </Animated.Text>

        {/*Auth Button  */}
        <View style={styles.ButtonContainer}>
          <AuthButtons
            name="Continue with Email"
            delay={100}
            className="bg-black  "
            icon="mail-outline"
          />
          <AuthButtons
            name="Continue with Google"
            delay={200}
            className="bg-blue-500"
            icon="logo-google"
          />
        </View>

        <Animated.View
          className={"mt-10 px-20"}
          entering={FadeInDown.delay(300)}
        >
          <Text
            onPress={openWebBrowser}
            style={{
              fontSize: 12,
              color: "#999999",
              textAlign: "center",
              lineHeight: 18,
            }}
          >
            Please visit{" "}
            <Text className="text-[#4285f4] underline">
              Wolt Privacy Statement
            </Text>{" "}
            to learn about personal data processing at Wolt.
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  brandLogo: {
    width: 100,
    height: 48,
    resizeMode: "contain",
    marginBottom: 20,
  },
  // tagline: {
  //   fontSize: 32,
  //   fontFamily: Fonts.brandBlack,
  //   alignItems: "center",
  //   marginBottom: 50,
  //   lineHeight: 36,
  // },
  infiniteScroller: {
    flex: 0.8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    position: "relative",
    overflow: "hidden",
  },
  ButtonContainer: {
    width: "100%",
    gap: 12,
  },
});
