import React, { useEffect } from "react";
import Animated, {
    scrollTo,
    useAnimatedReaction,
    useAnimatedRef,
    useSharedValue,
} from "react-native-reanimated";

const iconDataSets = {
    set1: [
        { emoji: "🍕", color: "#FFE5CC" },
        { emoji: "🍔", color: "#F4D03F" },
        { emoji: "🍟", color: "#F8D7DA" },
        { emoji: "🌮", color: "#D5EDDA" },
        { emoji: "🍗", color: "#FADBD8" },
    ],
    set2: [
        { emoji: "🎮", color: "#D1ECF1" },
        { emoji: "🎧", color: "#E2E3E5" },
        { emoji: "☕", color: "#F4D03F" },
        { emoji: "🍿", color: "#FFE5CC" },
        { emoji: "🥤", color: "#F8D7DA" },
    ],
    set3: [
        { emoji: "🍰", color: "#FADBD8" },
        { emoji: "🍦", color: "#D1ECF1" },
        { emoji: "🍪", color: "#FFE5CC" },
        { emoji: "🎲", color: "#D5EDDA" },
        { emoji: "🕹️", color: "#E2E3E5" },
    ],
};

const ITEM_HEIGHT = 160;
const SCROLL_SPEED = 20;
const GAP = 10;

const ScrollView = ({
    ScrollDirection = "down",
    iconSet = "set1",
}: {
    ScrollDirection: "down" | "up";
    iconSet: "set1" | "set2" | "set3";
}) => {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollY = useSharedValue(0);
    const IconData = iconDataSets[iconSet];

    const Item = [...IconData, ...IconData];
    const totalItemHeight = Item.length * ITEM_HEIGHT;

    useEffect(() => {
        if (ScrollDirection === "up") {
            scrollY.value = totalItemHeight;
        } else {
            scrollY.value = 0;
        }

        const interVeal = setInterval(() => {
            const interval =
                (SCROLL_SPEED / 30) * (ScrollDirection === "down" ? 1 : -1);

            scrollY.value += interval;
        }, 1000 / 30);

        return () => clearInterval(interVeal);
    }, [ScrollDirection]);

    useAnimatedReaction(
        () => scrollY.value,
        (y) => {
            if (ScrollDirection === "down") {
                if (y >= totalItemHeight) {
                    scrollY.value = 0;
                    scrollTo(scrollRef, 0, 0, false);
                } else {
                    scrollTo(scrollRef, 0, y, false);
                }
            } else {
                if (y <= 0) {
                    scrollY.value = totalItemHeight;
                    scrollTo(scrollRef, 0, totalItemHeight, false);
                } else {
                    scrollTo(scrollRef, 0, y, false);
                }
            }
        },
    );
    return (
        <Animated.ScrollView
            contentContainerStyle={{
                gap: 10,
                paddingVertical: 20,
            }}
            ref={scrollRef}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
        >
            {Item.map((item, index) => (
                <Animated.View
                    key={index}
                    className={`   items-center justify-center rounded-[20px]`}
                    style={{
                        width: 140,
                        backgroundColor: item.color,
                        height: ITEM_HEIGHT,
                        marginBottom: GAP,
                        marginHorizontal: 5,
                        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Animated.Text style={{ fontSize: 40 }}>{item.emoji}</Animated.Text>
                </Animated.View>
            ))}
        </Animated.ScrollView>
    );
};

export default ScrollView;
