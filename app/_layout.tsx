import "@/global.css";
import {
  Nunito_400Regular,
  Nunito_700Bold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import type { HeroUINativeConfig } from "heroui-native";
import { HeroUINativeProvider } from "heroui-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function RootLayout() {
  const [FontsLoader] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_900Black,
  });

  if (!FontsLoader) return null;

  const config: HeroUINativeConfig = {
    textProps: {
      minimumFontScale: 0.5,
      maxFontSizeMultiplier: 1.5,
      allowFontScaling: true,
      adjustsFontSizeToFit: false,
    },
    // devInfo: {
    //   stylingPrinciples: true, // Optional: disable styling principles message
    // },

    toast: {
      defaultProps: {
        variant: "default",
        placement: "top",
      },
      insets: {
        top: 0,
        bottom: 6,
        left: 12,
        right: 12,
      },
      maxVisibleToasts: 3,
    },
  };

  const queryClient = new QueryClient();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <HeroUINativeProvider
          config={{
            devInfo: {
              stylingPrinciples: false,
            },
          }}
        >
          <Slot />
        </HeroUINativeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
