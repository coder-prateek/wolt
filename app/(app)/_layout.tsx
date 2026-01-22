import { Stack } from "expo-router";
import React from "react";

const MainLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(public)" options={{ headerShown: false }} />
        </Stack>
    );
};

export default MainLayout;
