import { Colors, Fonts } from '@/constants/theme'
import { useSetDefaultAddressMutation } from '@/hooks/mutate/address'
import { SavedAddress, useGetAddressesQuery } from '@/hooks/query/address'
import useAddressStore from '@/storage/use-address'
import { Ionicons } from '@expo/vector-icons'
import * as Location from 'expo-location'
import { useRouter } from 'expo-router'
import React, { memo, useState } from 'react'
import {
    ActivityIndicator,
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const LABEL_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
    Home: 'home-outline',
    Work: 'briefcase-outline',
}

const Page = () => {
    const router = useRouter()
    const setAddress = useAddressStore((state) => state.setAddress)
    const [locating, setLocating] = useState(false)

    const { data: savedAddresses, isLoading } = useGetAddressesQuery()
    const setDefault = useSetDefaultAddressMutation({
        onSuccess: () => {
            router.dismiss()
        },
        onError: () => {
            Alert.alert('Error', 'Failed to set default address.')
        },
    })

    const handleUseCurrentLocation = async () => {
        try {
            setLocating(true)
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'Allow the app to use location services.')
                return
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            })

            await setAddress?.(location.coords.latitude, location.coords.longitude)
            router.dismiss()
        } catch (err) {
            console.error(err)
            Alert.alert('Error', 'Could not get your current location.')
        } finally {
            setLocating(false)
        }
    }

    const handleSelectSavedAddress = (address: SavedAddress) => {
        setAddress?.(address.latitude, address.longitude)
        setDefault.mutate({ addressId: address._id })
    }

    const getLabelIcon = (label: string): keyof typeof Ionicons.glyphMap => {
        return LABEL_ICONS[label] || 'location-outline'
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={22} color="#999" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for area, street name..."
                        placeholderTextColor="#999"
                    />
                </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.card}>
                <Pressable
                    style={styles.actionRow}
                    onPress={handleUseCurrentLocation}
                    disabled={locating}
                >
                    {locating ? (
                        <ActivityIndicator size="small" color={Colors.primary} />
                    ) : (
                        <Ionicons name="locate-outline" size={22} color={Colors.primary} />
                    )}
                    <Text style={styles.actionText}>Use my Current Location</Text>
                </Pressable>

                <View style={styles.separator} />

                <Pressable
                    style={styles.actionRow}
                    onPress={() => router.push('/(auth)/(modal)/map')}
                >
                    <Ionicons name="add-outline" size={22} color={Colors.primary} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.actionText}>Add a New Address</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#ccc" />
                </Pressable>
            </View>

            {/* Saved Addresses */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Saved Addresses</Text>

                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color={Colors.primary} />
                    </View>
                ) : savedAddresses && savedAddresses.length > 0 ? (
                    <View style={styles.card}>
                        {savedAddresses.map((item, index) => (
                            <React.Fragment key={item._id}>
                                {index > 0 && <View style={styles.separator} />}
                                <Pressable
                                    style={styles.addressRow}
                                    onPress={() => handleSelectSavedAddress(item)}
                                >
                                    <View style={styles.iconCircle}>
                                        <Ionicons
                                            name={getLabelIcon(item.label)}
                                            size={20}
                                            color={Colors.primary}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.addressLabel}>{item.label}</Text>
                                        <Text style={styles.addressText} numberOfLines={1}>
                                            {item.address}
                                        </Text>
                                    </View>
                                    {item.isDefault && (
                                        <View style={styles.defaultBadge}>
                                            <Text style={styles.defaultBadgeText}>Default</Text>
                                        </View>
                                    )}
                                    <Ionicons name="chevron-forward" size={20} color="#ccc" />
                                </Pressable>
                            </React.Fragment>
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="location-outline" size={40} color="#ccc" />
                        <Text style={styles.emptyText}>No saved addresses yet</Text>
                        <Text style={styles.emptySubtext}>
                            Add a new address to get started
                        </Text>
                    </View>
                )}
            </View>
        </ScrollView>
    )
}

export default memo(Page)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    searchContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderColor: '#ddd',
        backgroundColor: '#f5f5f5',
        gap: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: Colors.dark,
    },
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    actionText: {
        fontSize: 15,
        fontFamily: Fonts.brandBold,
        color: Colors.primary,
    },
    separator: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginHorizontal: 16,
    },
    section: {
        marginTop: 20,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: Fonts.brandBold,
        color: Colors.dark,
        marginBottom: 10,
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    iconCircle: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: Colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressLabel: {
        fontSize: 15,
        fontFamily: Fonts.brandBold,
        color: Colors.dark,
    },
    addressText: {
        fontSize: 13,
        color: Colors.muted,
        marginTop: 2,
    },
    defaultBadge: {
        backgroundColor: Colors.primaryLight,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    defaultBadgeText: {
        fontSize: 11,
        fontFamily: Fonts.brandBold,
        color: Colors.primary,
    },
    loadingContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 30,
        alignItems: 'center',
    },
    emptyContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 30,
        alignItems: 'center',
        gap: 6,
    },
    emptyText: {
        fontSize: 15,
        fontFamily: Fonts.brandBold,
        color: Colors.dark,
        marginTop: 8,
    },
    emptySubtext: {
        fontSize: 13,
        color: Colors.muted,
    },
})
