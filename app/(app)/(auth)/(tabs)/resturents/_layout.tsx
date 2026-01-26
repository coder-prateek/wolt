
import { Stack } from 'expo-router'
import React from 'react'

const ResturentLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ title: 'Resturents' }} />
        </Stack>
    )
}

export default ResturentLayout