import { Stack } from 'expo-router'
import React from 'react'

const SearchLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ title: 'Search' }} />
        </Stack>
    )
}

export default SearchLayout