
import React from 'react'
import { Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const Page = () => {
    return (
        <ScrollView contentInsetAdjustmentBehavior='automatic' className='flex-1 '>
            <Text>Profile</Text>
        </ScrollView>
    )
}

export default Page