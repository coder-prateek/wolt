import { Colors, Fonts } from '@/constants/theme';
import useAddressStore from '@/storage/use-address';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import MapView, { Region } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

const DEFAULT_REGION: Region = {
    latitude: 28.6139,
    longitude: 77.209,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
};

export default function AddressPickerPage() {
    const { setAddress, currentAddress, name, city } = useAddressStore();

    const [region, setRegion] = useState(DEFAULT_REGION);
    const [address, setLocalAddress] = useState(currentAddress || '');
    const [locationName, setLocationName] = useState(name || '');
    const [locationCity, setLocationCity] = useState(city || '');
    const [loading, setLoading] = useState(false);
    const [locating, setLocating] = useState(true);

    const mapRef = useRef<MapView | null>(null);

    // Get current location
    useEffect(() => {
        (async () => {
            try {
                const { status } =
                    await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setLocating(false);
                    return;
                }

                const location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                });

                const newRegion = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                };

                setRegion(newRegion);
                await reverseGeocode(
                    location.coords.latitude,
                    location.coords.longitude
                );
            } catch (err) {
                console.error(err);
            } finally {
                setLocating(false);
            }
        })();
    }, []);

    const reverseGeocode = useCallback(
        async (latitude: number, longitude: number) => {
            try {
                const results = await Location.reverseGeocodeAsync({
                    latitude,
                    longitude,
                });

                if (results.length > 0) {
                    const { name, city, street, region } = results[0];

                    setLocationName(name ?? '');
                    setLocationCity(city ?? '');
                    setLocalAddress(
                        `${street ?? ''}, ${region ?? ''}, ${city ?? ''}`
                    );
                }
            } catch (error) {
                console.error(error);
            }
        },
        []
    );

    const handleRegionChangeComplete = async (newRegion: Region) => {
        setRegion(newRegion);
        await reverseGeocode(newRegion.latitude, newRegion.longitude);
    };

    const handleLocateMe = async () => {
        try {
            setLocating(true);

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            const coords = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            };

            setRegion(coords);

            mapRef.current?.animateToRegion(coords, 1000);

            await reverseGeocode(coords.latitude, coords.longitude);
        } catch (err) {
            console.error(err);
        } finally {
            setLocating(false);
        }
    };

    const handleConfirm = async () => {
        try {
            setLoading(true);
            await setAddress?.(region.latitude, region.longitude, region.latitudeDelta, region.longitudeDelta);
            router.push("/(auth)/(modal)/save-address");
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container} >
            <View>
                <View style={{
                    flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 8,
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
            </View>
            <View style={styles.mapContainer}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    region={region}
                    onRegionChangeComplete={handleRegionChangeComplete}
                />

                {/* Center Pin */}
                <View style={styles.pinContainer} pointerEvents="none">
                    <Ionicons
                        name="location"
                        size={40}
                        color={Colors.primary}
                    />
                    <View style={styles.pinShadow} />
                </View>

                {/* Locate Button */}
                <TouchableOpacity
                    style={styles.locateButton}
                    onPress={handleLocateMe}
                >
                    {locating ? (
                        <ActivityIndicator size="small" />
                    ) : (
                        <Ionicons name="navigate" size={22} />
                    )}
                </TouchableOpacity>
            </View>

            {/* Bottom Card */}
            <View style={styles.bottomCard}>
                <View style={styles.addressRow}>
                    <Ionicons
                        name="location"
                        size={20}
                        color={Colors.primary}
                    />

                    <View style={{ flex: 1 }}>
                        <Text style={styles.addressName} numberOfLines={1}>
                            {locationName || 'Move the map'}
                        </Text>

                        <Text style={styles.addressDetail} numberOfLines={2}>
                            {address || 'Drag the map to select location'}
                        </Text>

                        {locationCity ? (
                            <Text style={styles.addressCity}>
                                {locationCity}
                            </Text>
                        ) : null}
                    </View>
                </View>

                <TouchableOpacity
                    style={[
                        styles.confirmButton,
                        loading && { opacity: 0.6 },
                    ]}
                    disabled={loading || !address}
                    onPress={handleConfirm}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.confirmButtonText}>
                            Confirm location
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: Colors.background, }, mapContainer: { flex: 1, position: 'relative', }, map: { ...StyleSheet.absoluteFillObject, }, pinContainer: { position: 'absolute', top: '50%', left: '50%', marginLeft: -20, marginTop: -40, alignItems: 'center', }, pinShadow: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(0,0,0,0.2)', marginTop: -4, }, locateButton: { position: 'absolute', bottom: 20, right: 16, width: 46, height: 46, borderRadius: 23, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 4, }, bottomCard: { backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 20, paddingBottom: Platform.OS === 'ios' ? 36 : 24, borderTopLeftRadius: 20, borderTopRightRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 8, }, addressRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, gap: 12, }, addressIconContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primaryLight, justifyContent: 'center', alignItems: 'center', marginTop: 2, }, addressInfo: { flex: 1, }, addressName: { fontSize: 17, fontFamily: Fonts.brandBold, color: Colors.dark, marginBottom: 2, }, addressDetail: { fontSize: 14, color: Colors.muted, lineHeight: 20, }, addressCity: { fontSize: 13, color: Colors.muted, marginTop: 2, }, confirmButton: { backgroundColor: Colors.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', }, confirmButtonDisabled: { opacity: 0.6, }, confirmButtonText: { color: '#fff', fontSize: 16, fontFamily: Fonts.brandBold, }, }); 7