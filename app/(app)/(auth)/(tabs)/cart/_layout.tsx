
import { Stack } from 'expo-router'
import React from 'react'

const CartLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false, title: 'Cart' }} />
        </Stack>
    )
}

export default CartLayout