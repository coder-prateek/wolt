
import { Stack } from 'expo-router'
import React from 'react'

const DiscoveryLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ title: 'Discovery' }} />
        </Stack>
    )
}

export default DiscoveryLayout