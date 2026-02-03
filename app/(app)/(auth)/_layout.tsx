import { Colors } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import { router, Stack } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{
                headerShown: false
            }} />


            <Stack.Screen
                name="(modal)/(dish)/[id]"

                options={{
                    headerShown: false, presentation: "formSheet", sheetAllowedDetents: [0.8],
                    title: "",
                    headerShadowVisible: false,
                    sheetCornerRadius: 16,
                    sheetGrabberVisible: true,
                    contentStyle: {
                        backgroundColor: Colors.background,
                    },
                    headerRight: () => (
                        <TouchableOpacity
                            style={{ padding: 4, borderRadius: 20, backgroundColor: Colors.light }}
                            onPress={() => router.dismiss()}>
                            <Ionicons name="close-sharp" size={28} />
                        </TouchableOpacity>
                    )
                }

                }

            />
            <Stack.Screen name="(modal)/filter" options={{
                presentation: "formSheet",
                sheetAllowedDetents: [0.8],
                title: "",
                headerShadowVisible: false,
                sheetCornerRadius: 16,
                sheetGrabberVisible: true,
                contentStyle: {
                    backgroundColor: Colors.background,
                },
                headerRight: () => (
                    <TouchableOpacity
                        style={{ padding: 4, borderRadius: 20, backgroundColor: Colors.light }}
                        onPress={() => router.dismiss()}>
                        <Ionicons name="close-sharp" size={28} />
                    </TouchableOpacity>
                )
            }} />
            <Stack.Screen name="(modal)/location" options={{
                presentation: "formSheet",
                sheetAllowedDetents: [0.7],
                title: "",
                headerShadowVisible: false,
                sheetCornerRadius: 16,
                sheetGrabberVisible: true,
                headerRight: () => (
                    <TouchableOpacity
                        style={{ padding: 4, borderRadius: 20, backgroundColor: Colors.light }}
                        onPress={() => router.dismiss()}>
                        <Ionicons name="close-sharp" size={28} />
                    </TouchableOpacity>
                )
            }} />
            <Stack.Screen name="(modal)/map" options={{ headerShown: false }} />
        </Stack>
    )
}

export default Layout