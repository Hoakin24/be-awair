import { useState } from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';

import LocationSearchBar from '@/components/location-search-bar/LocationSearchBar';
import { fetchAirQuality } from '@/utils/api';
import styles from '../tabStyles.style';

type Location = {
    name: string;
    latitude: number;
    longitude: number;
    state?: string;
    country?: string;
};

const Map = () => {
    const [selectedLocation, setSelectedLocation] = useState<any>(null);
    const [airQuality, setAirQuality] = useState<number | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [aqiTip, setAqiTip] = useState<string | null>(null);

    const router = useRouter();

    const aqiTips: Record<number, string[]> = {
        1: [
            "Enjoy outdoor activities freely.",
            "Open windows to let fresh air in.",
            "Perfect time for a morning jog!",
            "Consider biking instead of driving.",
            "Air your laundry outside—it’ll dry fast and clean!",
        ],
        2: [
            "Still good to go outside, but be mindful of allergies.",
            "Open your windows for fresh air.",
            "Sensitive people should avoid prolonged exposure.",
            "A short walk outdoors is safe.",
            "It's okay to exercise outdoors, just stay hydrated.",
        ],
        3: [
            "Limit outdoor exercise, especially in the afternoon.",
            "Keep windows closed to avoid allergens.",
            "Use an air purifier indoors if possible.",
            "Take breaks if you feel short of breath.",
            "Reduce prolonged outdoor exposure.",
        ],
        4: [
            "Avoid outdoor exercise.",
            "Wear a mask if you need to go out.",
            "Close all windows and doors.",
            "Stay indoors, especially if you have health conditions.",
            "Run an air purifier or turn on the AC with recirculation mode.",
        ],
        5: [
            "Stay indoors as much as possible.",
            "Avoid physical activities outdoors.",
            "Use a high-quality mask if going out is necessary.",
            "Monitor symptoms like coughing or throat irritation.",
            "Consider rescheduling outdoor plans.",
        ],
    };      

    const handleLocationSelect = async (location: Location | Location[]) => {
        const loc = Array.isArray(location) ? location[0] : location;
        setSelectedLocation(loc);
    
        try {
            const aqi = await fetchAirQuality(loc.latitude, loc.longitude);
            if (aqi !== null) {
                const level = aqi.aqi;
                setAirQuality(level);
              
                const tips = aqiTips[level];
                if (tips?.length) {
                    const randomIndex = Math.floor(Math.random() * tips.length);
                    setAqiTip(tips[randomIndex]);
                } else {
                    setAqiTip(null);
                }
            }
            
        } catch {
            console.warn('Failed to fetch air quality');
        }
    };
    

    const closeModal = () => setModalVisible(false);

    const navigateToDetails = () => {
        if (!selectedLocation) return;

        const loc = selectedLocation;

        router.push({
            pathname: '/details',
            params: {
                name: loc.name,
                country: loc.country,
                latitude: loc.latitude.toString(),
                longitude: loc.longitude.toString(),
                aqi: airQuality?.toString(),
            },
        });

        closeModal();
    };

    const region = selectedLocation
        ? {
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        }
        : {
            latitude: 14.5995,
            longitude: 120.9842,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };

  return (
        <View style={styles.container}>
            <LocationSearchBar onLocationSelect={handleLocationSelect} />

            <MapView style={styles.map} region={region}>
                {selectedLocation && (
                <Marker
                    coordinate={{
                        latitude: selectedLocation.latitude,
                        longitude: selectedLocation.longitude,
                    }}
                    onPress={() => setModalVisible(true)}
                />
                )}
            </MapView>

            {selectedLocation && (
                <Modal
                    animationType="slide"
                    transparent
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{selectedLocation.name}, {selectedLocation.country}</Text>
                            <Text style={styles.modalText}>
                                {airQuality ? `Air Quality Index: ${airQuality}` : 'Fetching AQI...'}
                            </Text>
                            <Text style={styles.modalText}>
                                Tip: {aqiTip}
                            </Text>
                            <Text> </Text>

                            <View style={styles.buttons}>
                                <TouchableOpacity onPress={navigateToDetails}>
                                    <Text style={styles.buttonText}>More Details</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={closeModal}>
                                    <Text style={styles.buttonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}

        </View>
    );
};

export default Map;
