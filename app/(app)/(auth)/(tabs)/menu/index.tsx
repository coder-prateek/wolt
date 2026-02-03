import ResturentHeader from '@/Components/sections/header'
import Menutab from '@/Components/sections/tabs/menutab'
import CartBottomBar from '@/Components/ui/cart-bottom-bar'
import React from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const HEADER_HEIGHT = 130;



const Page = () => {


    const insets = useSafeAreaInsets()
    const scrollOffset = useSharedValue(0)

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollOffset.value = event.contentOffset.y
        }
    })

    return (
        <View className='flex-1'>
            <ResturentHeader title="Food Menu" scrollOffset={scrollOffset} search={true} />
            <Animated.ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingTop: insets.top + HEADER_HEIGHT }}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}>
                <Menutab />



            </Animated.ScrollView>
            <CartBottomBar />
        </View>
    )
}

export default Page