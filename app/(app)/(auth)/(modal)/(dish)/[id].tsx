import Buttons from '@/Components/ui/Buttons/button';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    console.log(id)
    const router = useRouter();



    return (
        <>
            <Animated.ScrollView showsHorizontalScrollIndicator={false} className='flex-1'>
                <ImageBackground source={{ uri: `https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=1630&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D` }} className='w-full h-96' resizeMode="cover">
                    <LinearGradient
                        colors={["transparent", "#fff"]}
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: 100,
                        }}
                    />


                </ImageBackground>
                <View className=' px-4 ' >
                    <View className='flex-row items-start justify-between '>

                        <Text className='text-3xl font-semibold mb-2 w-52' numberOfLines={2}>{id}</Text>

                        <Text className='text-2xl text-primary font-semibold'>$12.99</Text>

                    </View>
                    <View className='flex-row  gap-2 items-center '>
                        <Buttons className='bg-primary/20 px-2 py-2'>
                            <Text className='text-primary font-semibold '>Best Seller</Text>
                        </Buttons>

                        <Text className='text-gray-600  ' >
                            <Ionicons name='time' size={16} />
                            15-20 min
                        </Text>
                    </View>
                </View>

                <View>
                    <Text className='mt-4 px-4 text-gray-700 leading-6 text-lg' numberOfLines={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </Text>
                </View>





            </Animated.ScrollView>
        </>

    );
};
export default Page;

