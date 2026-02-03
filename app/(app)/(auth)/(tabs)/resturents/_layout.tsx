
import { Stack } from 'expo-router'
import React from 'react'

const ResturentLayout = () => {
    return (
        <Stack screenOptions={{ contentStyle: { backgroundColor: "#fff" } }}>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='menu' options={{ headerShown: false }} />
        </Stack>
    )
}

export default ResturentLayout