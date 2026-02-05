import { Fonts } from '@/constants/theme'

import React from 'react'
import { Text, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CategoryList from '../sections/categoryList'
import ResturentHeader from '../sections/header'
import RestaurantList from '../sections/resturenList'
import CarouselItem from '../ui/carousel'
import Slider from '../ui/slider'

const HEADER_HEIGHT = 100;
const ResturentListPage = () => {
    const insets = useSafeAreaInsets()

    const scrollOffset = useSharedValue(0)

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollOffset.value = event.contentOffset.y
        }
    })


    // console.log(text)

    const items = [
        {
            id: "1",
            title: "Item 1",
            description: "Description for Item 1",
            image:
                "https://plus.unsplash.com/premium_photo-1701882459791-49ef309e1957?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: "2",
            title: "Item 2",
            description: "Description for Item 2 ",
            image:
                "https://plus.unsplash.com/premium_photo-1694074282447-09ab7399ae5c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: "3",
            title: "Item 3",
            description: "Description for Item 3",
            image:
                "https://plus.unsplash.com/premium_photo-1663850873201-de1c8c3d60ae?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ];

    const foodItems = [
        {
            id: "1",
            name: "All",
            image: "https://cdn-icons-png.flaticon.com/512/2965/2965567.png",
        },
        {
            id: "2",
            name: "Pizza",
            image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
        },
        {
            id: "3",
            name: "Burger",
            image: "https://cdn-icons-png.flaticon.com/512/1046/1046785.png",
        },
        {
            id: "4",
            name: "Hot Dog",
            image: "https://cdn-icons-png.flaticon.com/512/1046/1046782.png",
        },
        {
            id: "5",
            name: "Drink",
            image: "https://cdn-icons-png.flaticon.com/512/1046/1046788.png",
        },
    ];
    return (
        <View className='flex-1 '>

            <ResturentHeader scrollOffset={scrollOffset} search={true} profile={true} />
            <Animated.ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingTop: insets.top + HEADER_HEIGHT }}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >
                <CarouselItem items={items} />
                <View className='mt-4'>
                    <Slider item={foodItems} />
                </View>


                {/* <Text style={{
                    fontFamily: Fonts.brandBold,
                    paddingHorizontal: 16
                }} className='text-[30px] mb-1 text-secondary'>Popular Dises</Text> */}
                <CategoryList />

                <Text style={{
                    fontFamily: Fonts.brandBold,
                    fontSize: 20,
                    marginBottom: 14,
                    paddingHorizontal: 16,
                }}>All Beanches</Text>
                <RestaurantList />

            </Animated.ScrollView>
        </View>
    )
}

export default ResturentListPage