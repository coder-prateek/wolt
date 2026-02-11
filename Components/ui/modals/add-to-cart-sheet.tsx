import { Dish } from '@/data/restaurant_menu';
import { useCartStore } from '@/storage/use-cartstore';
import { Ionicons } from '@expo/vector-icons';
import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import {
    Dimensions,
    Image,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    FadeIn,
    FadeOut,
    runOnJS,
    SlideInDown,
    SlideOutDown,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import Buttons from '../Buttons/button';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface CartItemData {
    id: number;
    name: string;
    description?: string;
    price: number;
    image?: string | ImageSourcePropType;
    isCustomizable?: boolean;
}

const getImageSource = (image?: string | ImageSourcePropType) => {
    if (!image) return undefined;
    if (typeof image === 'string') {
        return { uri: image };
    }
    return image;
};

export interface AddToCartSheetRef {
    open: (item: CartItemData) => void;
    close: () => void;
}

interface AddToCartSheetProps {
    onAddToCart?: (item: CartItemData, quantity: number) => void;
}

const AddToCartSheet = forwardRef<AddToCartSheetRef, AddToCartSheetProps>(
    ({ onAddToCart }, ref) => {
        const [isVisible, setIsVisible] = useState(false);
        const [selectedItem, setSelectedItem] = useState<CartItemData | null>(null);
        const [quantity, setQuantity] = useState(1);

        const translateY = useSharedValue(0);
        const context = useSharedValue({ y: 0 });

        const addToCart = useCartStore((state) => state.addItem);

        const closeModal = useCallback(() => {
            setIsVisible(false);
            setSelectedItem(null);
            setQuantity(1);
            translateY.value = 0;
        }, [translateY]);

        const openModal = useCallback((item: CartItemData) => {
            setSelectedItem(item);
            setQuantity(1);
            setIsVisible(true);
        }, []);

        useImperativeHandle(ref, () => ({
            open: openModal,
            close: closeModal,
        }));

        const gesture = Gesture.Pan()
            .onStart(() => {
                context.value = { y: translateY.value };
            })
            .onUpdate((event) => {
                translateY.value = Math.max(0, context.value.y + event.translationY);
            })
            .onEnd((event) => {
                if (event.translationY > 100 || event.velocityY > 500) {
                    runOnJS(closeModal)();
                } else {
                    translateY.value = withSpring(0, { damping: 20 });
                }
            });

        const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ translateY: translateY.value }],
        }));

        const handleAddToCart = () => {
            if (selectedItem) {
                // Cast to Dish for cart store compatibility
                addToCart(selectedItem as unknown as Dish, quantity);
                onAddToCart?.(selectedItem, quantity);
                closeModal();
            }
        };

        const incrementQuantity = () => setQuantity((prev) => prev + 1);
        const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

        if (!isVisible || !selectedItem) return null;

        const totalPrice = (selectedItem.price * quantity).toFixed(2);

        return (
            <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
                {/* Backdrop */}
                <Animated.View
                    entering={FadeIn.duration(200)}
                    exiting={FadeOut.duration(200)}
                    style={styles.backdrop}
                >
                    <Pressable style={StyleSheet.absoluteFill} onPress={closeModal} />
                </Animated.View>

                {/* Bottom Sheet */}
                <GestureDetector gesture={gesture}>
                    <Animated.View
                        entering={SlideInDown.springify().damping(18)}
                        exiting={SlideOutDown.duration(200)}
                        style={[styles.sheetContainer, animatedStyle]}
                    >
                        {/* Handle */}
                        <View style={styles.handleContainer}>
                            <View style={styles.handle} />
                        </View>

                        {/* Content */}
                        <View style={styles.content}>
                            {/* Dish Image */}
                            {selectedItem.image && (
                                <Image
                                    source={getImageSource(selectedItem.image)}
                                    style={styles.dishImage}
                                    resizeMode="cover"
                                />
                            )}

                            {/* Dish Info */}
                            <View style={styles.dishInfo}>
                                <Text style={styles.dishName}>{selectedItem.name}</Text>
                                {selectedItem.description && (
                                    <Text style={styles.dishDescription} numberOfLines={2}>
                                        {selectedItem.description}
                                    </Text>
                                )}
                                <Text style={styles.dishPrice}>${selectedItem.price.toFixed(2)}</Text>
                            </View>

                            {/* Quantity Selector */}
                            <View style={styles.quantityContainer}>
                                <Text style={styles.quantityLabel}>Quantity</Text>
                                <View style={styles.quantitySelector}>
                                    <Pressable
                                        onPress={decrementQuantity}
                                        style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
                                        disabled={quantity <= 1}
                                    >
                                        <Ionicons
                                            name="remove"
                                            size={20}
                                            color={quantity <= 1 ? '#ccc' : '#009DE0'}
                                        />
                                    </Pressable>
                                    <Text style={styles.quantityText}>{quantity}</Text>
                                    <Pressable onPress={incrementQuantity} style={styles.quantityButton}>
                                        <Ionicons name="add" size={20} color="#009DE0" />
                                    </Pressable>
                                </View>
                            </View>

                            {/* Add to Cart Button */}
                            <View style={styles.addButtonContainer}>
                                <Buttons
                                    className="bg-primary w-full py-4"
                                    onPress={handleAddToCart}
                                >
                                    <Text style={styles.addButtonText}>
                                        Add to Cart • ${totalPrice}
                                    </Text>
                                </Buttons>
                            </View>
                        </View>
                    </Animated.View>
                </GestureDetector>
            </View>
        );
    }
);

AddToCartSheet.displayName = 'AddToCartSheet';

export default AddToCartSheet;

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    sheetContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: SCREEN_HEIGHT * 0.85,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 20,
    },
    handleContainer: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: '#E0E0E0',
        borderRadius: 2,
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 34,
    },
    dishImage: {
        width: '100%',
        height: 200,
        borderRadius: 16,
        marginBottom: 16,
    },
    dishInfo: {
        marginBottom: 20,
    },
    dishName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    dishDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 8,
    },
    dishPrice: {
        fontSize: 18,
        fontWeight: '600',
        color: '#009DE0',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        marginBottom: 20,
    },
    quantityLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    quantitySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 4,
    },
    quantityButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButtonDisabled: {
        opacity: 0.5,
    },
    quantityText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        minWidth: 40,
        textAlign: 'center',
    },
    addButtonContainer: {
        marginTop: 8,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
});
