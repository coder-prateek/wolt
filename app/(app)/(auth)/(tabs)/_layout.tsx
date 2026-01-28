import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

const MainLayout = () => {
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
            <Tabs.Screen name="discovery" options={{
                headerShown: false, title: 'Discovery', tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? "compass" : "compass-outline"} size={size} color={color} />
                )
            }} />

            <Tabs.Screen name="stores" options={{
                headerShown: false, title: 'Stores', tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? "storefront" : "storefront-outline"} size={size} color={color} />
                )
            }} />

            <Tabs.Screen name="search" options={{
                headerShown: false, title: 'Search', tabBarIcon: ({ color, size, focused }) => (
                    <FontAwesome5 name={focused ? "search-location" : "search"} size={size} color={color} />
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