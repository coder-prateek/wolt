import useAddressStore from '@/storage/use-address'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React, { useEffect } from 'react'

const MainLayout = () => {
    const getCurrentAddress = useAddressStore((state) => state.getCurrentAddress)

    useEffect(() => {
        getCurrentAddress?.()
    }, [getCurrentAddress])

    return (
        <Tabs screenOptions={{
            tabBarLabelStyle: {
                fontSize: 9,
                fontWeight: '600'

            }
        }}>
            <Tabs.Screen name="resturents" options={{
                headerShown: false, title: 'Resturents', tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name={"restaurant"} size={size} color={color} />
                )
            }} />
            <Tabs.Screen name="menu" options={{
                headerShown: false, title: 'Menu', tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? "restaurant" : "restaurant-outline"} size={size} color={color} />
                )
            }} />
            <Tabs.Screen name="cart" options={{
                headerShown: false, title: 'Cart', tabBarIcon: ({ color, size, focused

                }) => (
                    <Ionicons name={focused ? "cart" : "cart-outline"} size={size} color={color} />
                )
            }} />



            <Tabs.Screen name="profile" options={{
                headerShown: false, title: 'Profile', tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person" size={size} color={color} />
                )
            }} />
        </Tabs>
    )
}

export default MainLayout