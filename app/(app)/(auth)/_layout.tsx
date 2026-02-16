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
                    headerShown: false,
                }
                }

            />
            <Stack.Screen
                name="(modal)/address"
                options={{
                    presentation: "fullScreenModal",
                    title: "Select Location",
                    headerShadowVisible: false,
                }}
            />
            <Stack.Screen
                name="(modal)/save-address"
                options={{
                    presentation: "fullScreenModal",
                    title: "Save Address",
                    headerShadowVisible: false,
                }}
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
                        activeOpacity={0.3}
                        style={{ padding: 4, borderRadius: 20, backgroundColor: Colors.light, marginRight: 8 }}
                        onPress={() => router.dismiss()}>
                        <Ionicons name="close-sharp" size={28} />
                    </TouchableOpacity>
                )
            }} />
            <Stack.Screen name="(modal)/map"

                options={{
                    presentation: "fullScreenModal",
                    headerShown: false,
                    headerShadowVisible: false,
                }} />

            <Stack.Screen
                name="order"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    )
}

export default Layout