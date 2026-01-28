import { Fonts } from '@/constants/theme'
import React from 'react'
import { Text, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CategoryList from '../sections/categoryList'
import ResturentHeader from '../sections/header'
import RestaurantList from '../sections/resturenList'
const HEADER_HEIGHT = 60;
const ResturentListPage = () => {
    const inset = useSafeAreaInsets()
    const scrollOffset = useSharedValue(0)

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollOffset.value = event.contentOffset.y
        }
    })

    return (
        <View className='flex-1 '>
            <ResturentHeader title="Resturents" scrollOffset={scrollOffset} />
            <Animated.ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingTop: inset.top + HEADER_HEIGHT }}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}

            >
                <Text style={{
                    fontFamily: Fonts.brandBold,
                    paddingHorizontal: 16
                }} className='text-[30px] mb-1 text-secondary'>Resturents</Text>
                <CategoryList />

                <Text style={{
                    fontFamily: Fonts.brandBold,
                    fontSize: 20,
                    marginBottom: 16,
                    paddingHorizontal: 16,
                }}>All restaurants</Text>
                <RestaurantList />

            </Animated.ScrollView>
        </View>
    )
}

export default ResturentListPage