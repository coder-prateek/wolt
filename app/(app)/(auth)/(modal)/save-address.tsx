import { Colors, Fonts } from '@/constants/theme'
import { useAddressCreateMutation } from '@/hooks/mutate/address'
import useAddressStore from '@/storage/use-address'
import { Ionicons } from '@expo/vector-icons'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import React, { memo, useState } from 'react'
import {
    ActivityIndicator,
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'

const LABELS = [
    { key: 'Home', icon: 'home-outline' as const },
    { key: 'Work', icon: 'briefcase-outline' as const },
    { key: 'Other', icon: 'location-outline' as const },
]

const Page = () => {
    const { longitude, longitudeDelta, latitude, latitudeDelta, state, country, city, name, currentAddress } = useAddressStore()
    const router = useRouter()
    const queryClient = useQueryClient()

    const [selectedLabel, setSelectedLabel] = useState('Home')
    const [customLabel, setCustomLabel] = useState('')
    const [floor, setFloor] = useState('')
    const [landmark, setLandmark] = useState('')

    const createAddress = useAddressCreateMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addresses'] })
            Alert.alert('Success', 'Address saved successfully', [
                { text: 'OK', onPress: () => router.dismissAll() }
            ])
        },
        onError: () => {
            Alert.alert('Error', 'Failed to save address. Please try again.')
        },
    })

    const handleSave = () => {
        if (!latitude || !longitude) {
            Alert.alert('Error', 'Please select a location on the map first.')
            return
        }

        const label = selectedLabel === 'Other' ? (customLabel || 'Other') : selectedLabel

        createAddress.mutate({
            label,
            address: currentAddress,
            latitude,
            longitude,
            floor,
            landmark,
        })
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                scrollEnabled={false}
                zoomEnabled={false}
                rotateEnabled={false}
                pitchEnabled={false}
                initialRegion={{
                    latitude: latitude || 28.6139,
                    longitude: longitude || 77.209,
                    latitudeDelta: latitudeDelta || 0.005,
                    longitudeDelta: longitudeDelta || 0.005,
                }}
            >
                {latitude && longitude && (
                    <Marker coordinate={{ latitude, longitude }} />
                )}
            </MapView>

            <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
                {/* Address Info */}
                <View style={styles.addressRow}>
                    <Ionicons name="location" size={22} color={Colors.primary} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.addressName} numberOfLines={1}>
                            {name || 'Selected Location'}
                        </Text>
                        <Text style={styles.addressDetail} numberOfLines={2}>
                            {currentAddress || `${city}, ${state}, ${country}`}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => router.back()} style={styles.changeButton}>
                        <Text style={styles.changeButtonText}>Change</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.divider} />

                {/* Label Selection */}
                <Text style={styles.sectionTitle}>Save as</Text>
                <View style={styles.labelRow}>
                    {LABELS.map(({ key, icon }) => {
                        const isSelected = selectedLabel === key
                        return (
                            <TouchableOpacity
                                key={key}
                                style={[styles.labelChip, isSelected && styles.labelChipSelected]}
                                onPress={() => setSelectedLabel(key)}
                                activeOpacity={0.7}
                            >
                                <Ionicons
                                    name={icon}
                                    size={18}
                                    color={isSelected ? '#fff' : Colors.dark}
                                />
                                <Text style={[styles.labelChipText, isSelected && styles.labelChipTextSelected]}>
                                    {key}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>

                {selectedLabel === 'Other' && (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter label name (e.g. Gym, Friend's place)"
                        placeholderTextColor="#999"
                        value={customLabel}
                        onChangeText={setCustomLabel}
                    />
                )}

                {/* Additional Details */}
                <Text style={styles.sectionTitle}>Additional details (optional)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Floor / Flat number"
                    placeholderTextColor="#999"
                    value={floor}
                    onChangeText={setFloor}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nearby landmark"
                    placeholderTextColor="#999"
                    value={landmark}
                    onChangeText={setLandmark}
                />

                {/* Save Button */}
                <TouchableOpacity
                    style={[styles.saveButton, createAddress.isPending && { opacity: 0.6 }]}
                    onPress={handleSave}
                    disabled={createAddress.isPending}
                    activeOpacity={0.8}
                >
                    {createAddress.isPending ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.saveButtonText}>Save Address</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default memo(Page)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    map: {
        width: '100%',
        height: 200,
    },
    formContainer: {
        flex: 1,
        padding: 20,
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    addressName: {
        fontSize: 16,
        fontFamily: Fonts.brandBold,
        color: Colors.dark,
    },
    addressDetail: {
        fontSize: 13,
        color: Colors.muted,
        marginTop: 2,
        lineHeight: 18,
    },
    changeButton: {
        borderWidth: 1.5,
        borderColor: Colors.primary,
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 6,
    },
    changeButtonText: {
        fontSize: 14,
        fontFamily: Fonts.brandBold,
        color: Colors.primary,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 20,
    },
    sectionTitle: {
        fontSize: 15,
        fontFamily: Fonts.brandBold,
        color: Colors.dark,
        marginBottom: 12,
    },
    labelRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 16,
    },
    labelChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    labelChipSelected: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    labelChipText: {
        fontSize: 14,
        fontFamily: Fonts.brandBold,
        color: Colors.dark,
    },
    labelChipTextSelected: {
        color: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
        color: Colors.dark,
        marginBottom: 12,
        backgroundColor: '#fafafa',
    },
    saveButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: Platform.OS === 'ios' ? 36 : 24,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: Fonts.brandBold,
    },
})
