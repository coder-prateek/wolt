import { Ionicons } from "@expo/vector-icons";

import React from "react";
import { Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { cn, PressableFeedback } from "heroui-native";
const AuthButtons = ({
    name,
    delay,
    className,
    icon,
    onPress,
}: {
    name: string;
    delay: number;
    className?: string;
    icon?: React.ComponentProps<typeof Ionicons>["name"];
    onPress?: () => void;
}) => {
    return (
        <Animated.View entering={FadeInDown.delay(delay)} className={""}>
            {/* <Button onPress={() => console.log("Pressed!")} >{name}</Button> */}
            {/* <PressableFeedback
                className={cn(" ", className)}
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    borderRadius: 12,
                    gap: 8,
                    paddingVertical: 17,
                }}
            >
                <PressableFeedback.Ripple
                    animation={{
                        backgroundColor: { value: "#ec4899" },
                        opacity: { value: [0, 0.1, 0] },
                        progress: { baseDuration: 600 },
                    }}
                />
                <Ionicons name={icon} size={24} color="#fff" />
                <Animated.Text
                    style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}
                >
                    {name}
                </Animated.Text>
            </PressableFeedback> */}

            <PressableFeedback
                className={cn(
                    "flex-row items-center justify-center py-5 gap-4 rounded-xl ",
                    className,
                )}
                onPress={onPress}
            >
                <PressableFeedback.Ripple
                    animation={{
                        backgroundColor: { value: "#ffffff" },
                        opacity: { value: [0, 0.1, 0] },
                        progress: { baseDuration: 600 },
                    }}
                />
                <Ionicons name={icon} size={18} color="#fff" />
                <Text
                    className="text-white"
                    style={{ fontSize: 16, fontWeight: "600" }}
                >
                    {name}
                </Text>
            </PressableFeedback>
        </Animated.View>
    );
};

export default AuthButtons;
