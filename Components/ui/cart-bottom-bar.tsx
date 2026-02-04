import { useCartStore } from '@/hooks/use-cartstore';
import { useRouter } from 'expo-router';
import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

const CartBottomBar = () => {
    const router = useRouter();
    const totalItems = useCartStore((state) => state.totalItems);
    const total = useCartStore((state) => state.total);

    if (totalItems === 0) return null;

    return (
        <Animated.View
            entering={FadeInDown.springify().damping(18)}
            exiting={FadeOutDown.duration(200)}
            style={styles.container}
        >
            <Pressable
                style={styles.bar}
                onPress={() => router.push('/(auth)/(tabs)/cart' as any)}
            >

                <View style={styles.countBadge}>
                    <Text style={styles.countText}>{totalItems}</Text>
                </View>


                <Text style={styles.viewBasketText}>VIEW CART</Text>

                <Text style={styles.priceText}>${total.toFixed(2)}</Text>
            </Pressable>
        </Animated.View>
    );
};

export default memo(CartBottomBar);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: 10,
    },
    bar: {
        backgroundColor: '#F95555',
        borderRadius: 8,
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
});
