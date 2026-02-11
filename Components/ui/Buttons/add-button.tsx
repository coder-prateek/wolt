import { Dish } from '@/data/restaurant_menu';
import { useCartStore } from '@/storage/use-cartstore';
import { Ionicons } from '@expo/vector-icons';
import React, { FC, memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const AddButton: FC<{ item: any; resturent?: any }> = ({ item }) => {
    const addToCart = useCartStore((state) => state.addItem);
    const cart = useCartStore((state) => state.items);
    const incrementItem = useCartStore((state) => state.incrementItem);
    const decrementItem = useCartStore((state) => state.decrementItem);

    const cartItem = cart.find((cartItem) => cartItem.dish.id === item.id);
    const quantity = cartItem?.quantity || 0;

    const handleAddToCart = () => {
        const dish: Dish = {
            id: item.id,
            name: item.title || item.name,
            description: item.description || '',
            price: typeof item.price === 'string'
                ? parseFloat(item.price.replace('$', ''))
                : item.price,
            image: item.image,
        };
        addToCart(dish, 1);
    };

    if (quantity > 0) {
        return (
            <View style={styles.quantityContainer}>
                <Pressable
                    style={styles.quantityButton}
                    onPress={() => decrementItem(item.id)}
                >
                    <Ionicons name="remove" size={18} color="#F95555" />
                </Pressable>
                <Text style={styles.quantityText}>{quantity}</Text>
                <Pressable
                    style={styles.quantityButton}
                    onPress={() => incrementItem(item.id)}
                >
                    <Ionicons name="add" size={18} color="#F95555" />
                </Pressable>
            </View>
        );
    }

    return (
        <Pressable style={styles.addButton} onPress={handleAddToCart}>
            <Ionicons name="add" size={22} color="white" />
        </Pressable>
    );
};

export default memo(AddButton);

const styles = StyleSheet.create({
    addButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F95555',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#F95555',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF0F0',
        borderRadius: 20,
        paddingHorizontal: 4,
    },
    quantityButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#F95555',
        minWidth: 24,
        textAlign: 'center',
    },
});
