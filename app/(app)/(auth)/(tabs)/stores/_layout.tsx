
import { Stack } from 'expo-router'
import React from 'react'

const StoresLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ title: 'Stores' }} />
        </Stack>
    )
}

export default StoresLayout