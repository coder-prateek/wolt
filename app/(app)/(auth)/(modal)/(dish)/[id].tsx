import ReccomendedItem from '@/Components/recomended';
import Buttons from '@/Components/ui/Buttons/button';
import { useCartStore } from '@/hooks/use-cartstore';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const item = 1
    const addToCart = useCartStore((state) => state.addItem);
    const cart = useCartStore((state) => state.items);
    const incrementItem = useCartStore((state) => state.incrementItem);
    const decrementItem = useCartStore((state) => state.decrementItem);

    const cartItem = cart.find((cartItem) => cartItem.dish.id = item);
    const quantity = cartItem?.quantity || 0;


    return (
        <View className='flex-1 bg-white'>
            <ScrollView
                className='flex-1'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <ImageBackground
                    source={{ uri: `https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=1630&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D` }}
                    className='w-full h-80'
                    resizeMode="cover"
                >
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

                <View className='px-4 -mt-4'>
                    <View className='flex-row items-start justify-between'>
                        <Text className='text-3xl font-semibold mb-2 flex-1 mr-4' numberOfLines={2}>{id}</Text>
                        <Text className='text-2xl text-primary font-semibold'>$12.99</Text>
                    </View>

                    <View className='flex-row gap-2 items-center mt-2'>
                        <Buttons className='bg-primary/20 px-3 py-1.5 rounded-full'>
                            <Text className='text-primary font-semibold text-sm'>Best Seller</Text>
                        </Buttons>

                        <View className='flex-row items-center gap-1'>
                            <Ionicons name='time-outline' size={16} color="#666" />
                            <Text className='text-gray-600'>15-20 min</Text>
                        </View>
                    </View>

                    <Text className='mt-4 text-gray-600 leading-6 text-base' numberOfLines={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Text>
                </View>

                <ReccomendedItem />
            </ScrollView>

            <Animated.View
                entering={FadeInDown.springify().damping(18)}
                exiting={FadeOutDown.duration(200)}
                style={styles.container}
                className="flex-row items-center justify-center gap-4"
            >
                <View className='flex-row items-center bg-gray-200 px-2 py-2 rounded-full'>
                    <Pressable
                        style={styles.quantityButton}
                        onPress={() => decrementItem(item)}
                    >
                        <Ionicons name="remove" size={20} color="#F95555" />
                    </Pressable>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <Pressable
                        style={styles.quantityButton}
                        onPress={() => incrementItem(item)}
                    >
                        <Ionicons name="add" size={20} color="#F95555" />
                    </Pressable>
                </View>
                <Pressable
                    style={styles.bar}
                    onPress={() => router.push('/(auth)/(tabs)/cart' as any)}
                >
                    <Text style={styles.viewBasketText}>Add to cart</Text>
                    <Text className='h-2 mx-2 w-2 rounded-full bg-white'></Text>
                    <Text style={styles.priceText}>{(cartItem?.dish?.price ?? 0) * quantity}</Text>
                </Pressable>
            </Animated.View>
        </View>
    );
};
export default Page;


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingBottom: 34,
        paddingTop: 10,
        backgroundColor: 'white',
    },
    bar: {
        backgroundColor: '#F95555',
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },
    countBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        minWidth: 36,
        alignItems: 'center',
    },
    countText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
    viewBasketText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    priceText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF0F0',
        borderRadius: 20,
        paddingHorizontal: 4,
    },
    quantityButton: {
        width: 42,
        height: 42,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#F95555',
        minWidth: 24,
        textAlign: 'center',
    },
});
