import useAddressStore from '@/storage/use-address'
import { useCartStore } from '@/storage/use-cartstore'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const DELIVERY_FEE = 2.0
const SERVICE_FEE = 1.5

const Page = () => {
    const router = useRouter()
    const [deliveryType, setDeliveryType] = useState<'delivery' | 'takeout'>('delivery')
    const { items, total, incrementItem, decrementItem } = useCartStore()

    const subtotal = total
    const deliveryFee = deliveryType === 'delivery' ? DELIVERY_FEE : 0
    const serviceFee = SERVICE_FEE
    const grandTotal = subtotal + deliveryFee + serviceFee

    const currentAddress = useAddressStore((state) => state.currentAddress)


    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name='chevron-back' size={24} color='black' />
                </Pressable>
                <Text style={styles.headerTitle}>Checkout</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* <View style={styles.toggleContainer}>
                    <Pressable
                        style={[
                            styles.toggleButton,
                            deliveryType === 'delivery' && styles.toggleButtonActive
                        ]}
                        onPress={() => setDeliveryType('delivery')}
                    >
                        <Ionicons
                            name='bicycle'
                            size={18}
                            color={deliveryType === 'delivery' ? '#009DE0' : '#666'}
                        />
                        <Text style={[
                            styles.toggleText,
                            deliveryType === 'delivery' && styles.toggleTextActive
                        ]}>Delivery</Text>
                    </Pressable>
                    <Pressable
                        style={[
                            styles.toggleButton,
                            deliveryType === 'takeout' && styles.toggleButtonActive
                        ]}
                        onPress={() => setDeliveryType('takeout')}
                    >
                        <Ionicons
                            name='bag-handle-outline'
                            size={18}
                            color={deliveryType === 'takeout' ? '#009DE0' : '#666'}
                        />
                        <Text style={[
                            styles.toggleText,
                            deliveryType === 'takeout' && styles.toggleTextActive
                        ]}>Takeout</Text>
                    </Pressable>
                </View> */}

                {/* Delivery Address */}



                <View style={styles.section}>
                    {/* <View style={styles.sectionRow}>
                        <View style={styles.iconContainer}>
                            <View style={styles.locationIcon}>
                                <Ionicons name='location' size={20} color='white' />
                            </View>
                        </View>
                        <View style={styles.sectionContent}>
                            <Text style={styles.sectionLabel}>DELIVERY ADDRESS</Text>
                            <Text style={styles.sectionTitle}>Home</Text>
                            <Text style={styles.sectionSubtitle}>
                                4517 Washington Ave. Manchester, Kentucky 39495
                            </Text>
                        </View>
                        <Pressable>
                            <Text style={styles.changeText}>Change</Text>
                        </Pressable>
                    </View> */}

                    {
                        currentAddress ? (
                            <View style={styles.sectionRow}>
                                <View style={styles.iconContainer}>
                                    <View style={styles.locationIcon}>
                                        <Ionicons name='location' size={20} color='white' />
                                    </View>
                                </View>
                                <View style={styles.sectionContent}>
                                    <Text style={styles.sectionLabel}>DELIVERY ADDRESS</Text>
                                    <Text style={styles.sectionTitle}>Home</Text>
                                    <Text style={styles.sectionSubtitle}>
                                        {currentAddress}
                                    </Text>
                                </View>
                                <Pressable>
                                    <Text style={styles.changeText}>Change</Text>
                                </Pressable>
                            </View>
                        ) : (
                            <Pressable style={[styles.sectionRow, { justifyContent: 'center' }]}
                                onPress={() => router.push('/(app)/(auth)/(modal)/address')}
                            >
                                <Ionicons name='location-outline' size={20} color='#ccc' />
                                <Text style={[styles.sectionTitle, { color: '#ccc', marginLeft: 8 }]}>Add Delivery Address</Text>
                            </Pressable>
                        )
                    }
                </View>


                {/* Estimated Time */}
                <View style={styles.section}>
                    <View style={styles.sectionRow}>
                        <View style={styles.iconContainer}>
                            <View style={styles.timeIcon}>
                                <Ionicons name='time' size={20} color='white' />
                            </View>
                        </View>
                        <View style={styles.sectionContent}>
                            <Text style={styles.sectionLabel}>ESTIMATED TIME</Text>
                            <Text style={styles.sectionTitle}>20-30 mins</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Order Summary */}
                <View style={styles.orderSection}>
                    <View style={styles.orderHeader}>
                        <Text style={styles.orderTitle}>Order Summary</Text>
                        <Pressable>
                            <Text style={styles.addItemsText}>+ Add Items</Text>
                        </Pressable>
                    </View>

                    {items.length === 0 ? (
                        <View style={styles.emptyCart}>
                            <Ionicons name='cart-outline' size={48} color='#ccc' />
                            <Text style={styles.emptyCartText}>Your cart is empty</Text>
                        </View>
                    ) : (
                        items.map((item) => (
                            <View key={item.dish.id} style={styles.cartItem}>
                                <Image source={item.dish.image as number} style={styles.itemImage} />
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemName}>{item.dish.name}</Text>
                                    <Text style={styles.itemDescription} numberOfLines={1}>
                                        {item.dish.description}
                                    </Text>
                                    <Text style={styles.itemPrice}>
                                        ${(item.dish.price * item.quantity).toFixed(2)}
                                    </Text>
                                </View>
                                <View style={styles.quantityControl}>
                                    <Pressable
                                        style={styles.quantityButton}
                                        onPress={() => decrementItem(item.dish.id)}
                                    >
                                        <Ionicons name='remove' size={18} color='#666' />
                                    </Pressable>
                                    <Text style={styles.quantityText}>{item.quantity}</Text>
                                    <Pressable
                                        style={[styles.quantityButton, styles.quantityButtonPlus]}
                                        onPress={() => incrementItem(item.dish.id)}
                                    >
                                        <Ionicons name='add' size={18} color='#FF6B5B' />
                                    </Pressable>
                                </View>
                            </View>
                        ))
                    )}
                </View>

                <View style={styles.divider} />

                {/* Payment Method */}
                {/* <View style={styles.paymentSection}>
                    <Text style={styles.paymentTitle}>Payment Method</Text>
                    <Pressable style={styles.paymentCard}>
                        <View style={styles.paymentIcon}>
                            <View style={styles.mastercardIcon}>
                                <View style={[styles.mastercardCircle, styles.mastercardRed]} />
                                <View style={[styles.mastercardCircle, styles.mastercardYellow]} />
                            </View>
                        </View>
                        <View style={styles.paymentInfo}>
                            <Text style={styles.paymentName}>Mastercard</Text>
                            <Text style={styles.paymentNumber}>**** **** **** 4582</Text>
                        </View>
                        <Ionicons name='chevron-forward' size={20} color='#ccc' />
                    </Pressable>
                </View> */}

                {/* Price Summary */}
                <View style={styles.priceSummary}>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Subtotal</Text>
                        <Text style={styles.priceValue}>${subtotal.toFixed(2)}</Text>
                    </View>
                    {deliveryType === 'delivery' && (
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Delivery Fee</Text>
                            <Text style={styles.priceValue}>${deliveryFee.toFixed(2)}</Text>
                        </View>
                    )}
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Service Fee</Text>
                        <Text style={styles.priceValue}>${serviceFee.toFixed(2)}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
                    </View>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Place Order Button */}
            <View style={styles.bottomBar}>
                <Pressable style={styles.placeOrderButton}>
                    <Text style={styles.placeOrderText}>Place Order</Text>
                    <Ionicons name='arrow-forward' size={20} color='white' />
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        // backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    headerSpacer: {
        width: 40,
    },
    scrollView: {
        flex: 1,
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        borderRadius: 25,
        padding: 4,
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 16,
    },
    toggleButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 22,
        gap: 6,
    },
    toggleButtonActive: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
    },
    toggleTextActive: {
        color: '#1a1a1a',
    },
    section: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginBottom: 2,
    },
    sectionRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    iconContainer: {
        marginRight: 12,
    },
    locationIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FF6B5B',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FFB347',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionContent: {
        flex: 1,
    },
    sectionLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#999',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 2,
    },
    sectionSubtitle: {
        fontSize: 13,
        color: '#666',
        lineHeight: 18,
    },
    changeText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FF6B5B',
    },
    divider: {
        height: 8,
        backgroundColor: '#f5f5f5',
    },
    orderSection: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    orderTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    addItemsText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#009DE0',
    },
    emptyCart: {
        alignItems: 'center',
        paddingVertical: 32,
    },
    emptyCartText: {
        marginTop: 12,
        fontSize: 14,
        color: '#999',
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    itemInfo: {
        flex: 1,
        marginLeft: 12,
    },
    itemName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 2,
    },
    itemDescription: {
        fontSize: 12,
        color: '#999',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FF6B5B',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        paddingHorizontal: 4,
    },
    quantityButton: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButtonPlus: {
        backgroundColor: '#FFE5E3',
        borderRadius: 16,
    },
    quantityText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a1a1a',
        minWidth: 24,
        textAlign: 'center',
    },
    paymentSection: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    paymentTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    paymentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 12,
    },
    paymentIcon: {
        marginRight: 12,
    },
    mastercardIcon: {
        flexDirection: 'row',
        width: 32,
        height: 20,
    },
    mastercardCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    mastercardRed: {
        backgroundColor: '#EB001B',
        zIndex: 1,
    },
    mastercardYellow: {
        backgroundColor: '#F79E1B',
        marginLeft: -8,
    },
    paymentInfo: {
        flex: 1,
    },
    paymentName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    paymentNumber: {
        fontSize: 13,
        color: '#999',
    },
    priceSummary: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginTop: 2,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    priceLabel: {
        fontSize: 14,
        color: '#666',
    },
    priceValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1a1a1a',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    totalValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FF6B5B',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 16,
        paddingBottom: 32,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    placeOrderButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF6B5B',
        paddingVertical: 16,
        borderRadius: 30,
        gap: 8,
    },
    placeOrderText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
})

export default Page
