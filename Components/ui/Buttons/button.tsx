import { Ionicons } from "@expo/vector-icons";

import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";

import { cn, PressableFeedback } from "heroui-native";

const Buttons = ({
    children,
    delay,
    className,
    icon,
    onPress,
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    icon?: React.ComponentProps<typeof Ionicons>["name"];
    onPress?: () => void;
}) => {
    return (
        <Animated.View entering={FadeInDown.delay(delay ?? 0)} className={""}>
            <PressableFeedback
                className={cn(
                    "flex-row items-center justify-center py-5 gap-4  rounded-bl-2xl rounded-tr-2xl",
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
                {children}
            </PressableFeedback>
        </Animated.View>
    );
};

export default Buttons;
