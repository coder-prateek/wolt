
import { Stack } from 'expo-router'
import React from 'react'

const CartLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ title: 'Cart' }} />
        </Stack>
    )
}

export default CartLayout