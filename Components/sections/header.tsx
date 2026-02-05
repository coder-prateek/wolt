import useAddressStore from '@/hooks/use-address';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import * as Location from "expo-location";
interface RestaurantHeaderProps {
    title?: string;
    scrollOffset: SharedValue<number>;
    profile?: boolean;
    search?: boolean;
}

const SCOLL_THRESHOLD = 60;

const RestaurantHeader = ({ title, profile = false, search = false, scrollOffset }: RestaurantHeaderProps) => {
    const insets = useSafeAreaInsets();

    const shadowStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollOffset.value,
            [0, SCOLL_THRESHOLD],
            [0, 1],
            Extrapolation.CLAMP
        );

        return {
            shadowOpacity: opacity * 0.1,
            elevation: opacity * 4,
        };
    });


    const router = useRouter()
    const [locationServicesEnabled, setLocationServicesEnabled] = useState(false)
    const setAddress = useAddressStore((state) => state.setAddress);

    const displayCurrentAddress = useAddressStore((state) => state.currentAddress);


    useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
    }, [])
    //check if location is enable or not
    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();       //returns true or false
        if (!enabled) {                     //if not enable 
            Alert.alert('Location not enabled', 'Please enable your Location', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        } else {
            setLocationServicesEnabled(enabled)         //store true into state
        }
    }
    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();  //used 
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Allow the app to use the location services', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }

        //get current position lat and long
        const { coords } = await Location.getCurrentPositionAsync();

        if (coords) {
            const { latitude, longitude } = coords;
            await setAddress?.(latitude, longitude);

        }
    }



    // console.log(displayCurrentAddress)

    return (
        <Animated.View className=" bg-black" style={[styles.headerContainer, shadowStyle, { paddingTop: insets.top }]}>
            {
                profile ? (
                    <View className=" flex-row w-full  items-center justify-between px-6  mb-4">
                        <View className=" flex-row items-center justify-center gap-4">
                            <Image
                                src="https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                className="h-10 w-10 rounded-full"
                            />
                            <TouchableOpacity onPress={() => router.push('/(auth)/(modal)/address')} className="flex-col">
                                <Text className="text-gray-600 text-sm font-bold">Delever to</Text>
                                <View className='flex-row items-center justify-center'>

                                    <Text className="text-gray-800 text-md  w-60 " numberOfLines={1} >{displayCurrentAddress ?? "Loading..."}</Text>
                                    <Ionicons name="chevron-down" size={16} color="black" />
                                </View>

                            </TouchableOpacity>
                        </View>

                        <Ionicons name="notifications-sharp" size={24} color="black" />
                    </View>
                ) : (
                    <View className=" flex-row w-full  items-center justify-between px-6  mb-4">
                        {/* back */}
                        <TouchableOpacity activeOpacity={0.5} className='  bg-white rounded-full p-2 shadow-lg' onPress={() => router.back()}>
                            <Ionicons name="chevron-back" size={24} color="black" />
                        </TouchableOpacity>
                        <Text className="text-2xl font-bold ">{title}</Text>
                        {/* cart */}

                        <TouchableOpacity activeOpacity={0.5} className='  bg-white rounded-full p-2 shadow-lg ' onPress={() => router.push('/(auth)/(tabs)/cart')}>
                            <Ionicons name="cart" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                )
            }
            {
                search &&
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    width: '90%',
                    marginBottom: 10,
                    marginLeft: 20,
                    borderColor: '#ccc',
                    backgroundColor: '#f0f0f0',
                    paddingVertical: 5,
                }}>


                    <Ionicons name="search" size={24} color="gray" />
                    <TextInput
                        style={{
                            flex: 1,
                            paddingLeft: 10,
                        }}
                        placeholder="Search Your Meal"
                        placeholderTextColor="#999"


                    />

                </View>
            }


        </Animated.View>
    );
};


const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        zIndex: 100,
        // boxShadow: '0px 2px 4px -2px rgba(0, 0, 0, 0.2)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
});

export default RestaurantHeader;
