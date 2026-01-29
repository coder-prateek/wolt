import ResturentHeader from '@/Components/sections/header'
import TabsComponent from '@/Components/ui/tabs'
import React from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const HEADER_HEIGHT = 130;
const Page = () => {
    const insets = useSafeAreaInsets()

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollOffset.value = event.contentOffset.y
        }
    })
    const scrollOffset = useSharedValue(0)
    const [activeTab, setActiveTab] = React.useState('settings')
    return (
        <View className='flex-1'>


            <ResturentHeader title="Food Menu" scrollOffset={scrollOffset} search={true} />
            <Animated.ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingTop: insets.top + HEADER_HEIGHT }}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}>
                <TabsComponent />
            </Animated.ScrollView>
        </View>
    )
}

export default Page