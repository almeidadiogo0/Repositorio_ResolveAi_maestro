import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { colors } from '../../style/colors';
import { styles } from './LocationPickerStyle';

interface LocationPickerProps {
    onLocationSelect: (location: { latitude: number; longitude: number; address?: string }) => void;
    initialLocation?: { latitude: number; longitude: number; address?: string };
}

export function LocationPicker({ onLocationSelect, initialLocation }: LocationPickerProps) {
    const expoConfig = Constants.expoConfig as any;
    const hasGoogleMapsApiKey = Boolean(
        expoConfig?.android?.config?.googleMaps?.apiKey || expoConfig?.extra?.googleMapsApiKey,
    );
    const defaultCoords = initialLocation?.latitude
        ? initialLocation
        : {
              latitude: -22.4044,
              longitude: -43.6633,
          };

    const [mapRegion, setMapRegion] = useState({
        ...defaultCoords,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });
    const [markerCoord, setMarkerCoord] = useState<{ latitude: number; longitude: number } | null>(
        initialLocation?.latitude ? initialLocation : null,
    );
    const [addressText, setAddressText] = useState<string | null>(initialLocation?.address || null);

    const getAddressFromCoords = async (coord: { latitude: number; longitude: number }) => {
        try {
            const [place] = await Location.reverseGeocodeAsync(coord);

            if (place) {
                const { street, streetNumber, district, subregion, city, region } = place;
                const cityState = `${subregion || city || 'Localidade Desconhecida'} - ${region || 'BR'}`;

                if (street) return `${street}${streetNumber ? `, ${streetNumber}` : ''} - ${cityState}`;
                if (district) return `${district} - ${cityState}`;
                return cityState;
            }
        } catch {
        }

        return 'Local marcado no mapa';
    };

    const handlePress = async (event: any) => {
        const coord = event.nativeEvent.coordinate;
        setMarkerCoord(coord);

        const address = await getAddressFromCoords(coord);
        setAddressText(address);
        onLocationSelect({ ...coord, address });
    };

    const handleFallbackPress = () => {
        const coord = {
            latitude: defaultCoords.latitude,
            longitude: defaultCoords.longitude,
        };
        const address = 'Local marcado no mapa';

        setMarkerCoord(coord);
        setAddressText(address);
        onLocationSelect({ ...coord, address });
    };

    const handleGetCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Permissão negada', 'Precisamos da permissão de localização para obter o seu local atual.');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const coord = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };

            setMarkerCoord(coord);
            setMapRegion({
                ...coord,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });

            const address = await getAddressFromCoords(coord);
            setAddressText(address);
            onLocationSelect({ ...coord, address });
        } catch {
            Alert.alert('Erro', 'Não foi possível obter a localização atual.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.label}>Local do Problema</Text>
                <TouchableOpacity onPress={handleGetCurrentLocation} style={styles.useCurrentButton}>
                    <Ionicons name="location" size={20} color={colors.primary} />
                    <Text style={styles.useCurrentText}>Usar atual</Text>
                </TouchableOpacity>
            </View>
            {hasGoogleMapsApiKey ? (
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        region={mapRegion}
                        onRegionChangeComplete={setMapRegion}
                        onPress={handlePress}
                    >
                        {markerCoord ? <Marker coordinate={markerCoord} /> : null}
                    </MapView>
                </View>
            ) : (
                <TouchableOpacity
                    style={[styles.mapContainer, styles.mapFallback]}
                    onPress={handleFallbackPress}
                    activeOpacity={0.85}
                    accessibilityLabel="Marcar local padrao"
                    accessibilityRole="button"
                >
                    <Ionicons name="map-outline" size={28} color={colors.primary} />
                    <Text style={styles.fallbackTitle}>Mapa indisponivel</Text>
                    <Text style={styles.fallbackText}>Toque para usar a localizacao padrao.</Text>
                </TouchableOpacity>
            )}
            <Text style={styles.hint}>{addressText ? `📍 ${addressText}` : 'Toque no mapa para marcar o local exato.'}</Text>
        </View>
    );
}
