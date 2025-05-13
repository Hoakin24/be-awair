import { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text, Card } from '@rneui/themed';

import LocationSearchBar from '@/components/location-search-bar/LocationSearchBar';
import { useColorScheme } from '@/components/useColorScheme';
import { fetchAirQuality } from '@/utils/api';

import styles from '../tabStyles.style';

type Location = {
    name: string;
    latitude: number;
    longitude: number;
    state?: string;
    country?: string;
};

type AirQualityInfo = {
    location: Location;
    aqi: number;
    components: {
        co: number,
        no: number,
        no2: number,
        o3: number,
        so2: number,
        pm2_5: number,
        pm10: number,
        nh3: number,
    };
};

const DEFAULT_LOCATIONS: Location[] = [
    { name: 'Manila', latitude: 14.5995, longitude: 120.9842, country: 'PH' },
    { name: 'Cebu City', latitude: 10.3157, longitude: 123.8854, country: 'PH' },
    { name: 'Davao City', latitude: 7.1907, longitude: 125.4553, country: 'PH' },
    { name: 'Baguio', latitude: 16.4023, longitude: 120.596, country: 'PH' },
    { name: 'Iloilo City', latitude: 10.7202, longitude: 122.5621, country: 'PH' },
    { name: 'Zamboanga City', latitude: 6.9214, longitude: 122.079, country: 'PH' },
    { name: 'Cagayan de Oro', latitude: 8.4542, longitude: 124.6319, country: 'PH' },
    { name: 'General Santos', latitude: 6.1164, longitude: 125.1717, country: 'PH' },
    { name: 'Taguig', latitude: 14.5176, longitude: 121.0509, country: 'PH' },
    { name: 'Quezon City', latitude: 14.676, longitude: 121.0437, country: 'PH' },
];

const DetailsTab = () => {
    const [locations, setLocations] = useState<Location[]>(DEFAULT_LOCATIONS);
    const [airData, setAirData] = useState<AirQualityInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const theme = useColorScheme();

    const { name, country, latitude, longitude, aqi } = useLocalSearchParams<{
        name: string;
        country: string;
        latitude: string;
        longitude: string;
        aqi?: string;
    }>();

    useEffect(() => {
        if (!latitude && !longitude && !name) {
            const fetchDefaultData = async () => {
                setLocations(DEFAULT_LOCATIONS);
                await loadAirData(DEFAULT_LOCATIONS);
            };
            fetchDefaultData();
        }
    }, []);

    useEffect(() => {
        if (latitude && longitude && name) {
            const loc: Location = {
                name,
                country,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
            };

            const load = async () => {
                setLoading(true);
                const data = await fetchAirQuality(loc.latitude, loc.longitude);
                setAirData([
                    {
                        location: loc,
                        aqi: data.aqi,
                        components: data.components,
                    },
                ]);
                setLoading(false);
            };

            load();
        }
    }, [latitude, longitude, name]);

    const loadAirData = async (locationsToLoad = locations) => {
        setLoading(true);
        const results: AirQualityInfo[] = [];

        for (const loc of locationsToLoad) {
            try {
                const { aqi, components } = await fetchAirQuality(loc.latitude, loc.longitude);
                results.push({ location: loc, aqi, components });
            } catch (e) {
                console.warn(`Failed to fetch AQI for ${loc.name}`);
            }
        }

        setAirData(results);
        setLoading(false);
    };

    const handleSearch = (incoming: Location | Location[]) => {
        const updated = Array.isArray(incoming) ? incoming : [incoming];
        setLocations(updated);
        loadAirData(updated);
    };

    const getAQIDescription = (aqi: number) => {
        const levels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
        return levels[aqi - 1] ?? 'Unknown';
    };

    const pollutantDescriptions: Record<keyof AirQualityInfo["components"], string> = {
        co: 'Carbon monoxide — toxic gas from cars and fires.',
        no: 'Nitrogen monoxide — forms smog, from engines.',
        no2: 'Nitrogen dioxide — irritates lungs, from traffic.',
        o3: 'Ozone — can cause breathing issues at ground level.',
        so2: 'Sulphur dioxide — from burning fuel, causes irritation.',
        pm2_5: 'PM2.5 — fine dust that enters the lungs deeply.',
        pm10: 'PM10 — larger dust, affects breathing and visibility.',
        nh3: 'Ammonia — from agriculture and waste, causes irritation.',
    };

    return (
        <View style={[styles.container, { backgroundColor: theme === 'light' ? '#fff' : '#121212' }]}>
            <LocationSearchBar
                onLocationSelect={handleSearch}
                placeholder="Search for city..."
                disableSuggestions
                returnAllMatches
                showDefaultOnEmptySubmit
                defaultLocations={DEFAULT_LOCATIONS}
            />

            {loading ? (
                <ActivityIndicator size="large" style={{ marginTop: 32 }} />
            ) : (
                <ScrollView contentContainerStyle={styles.cardContainer}>
                    {airData.map(({ location, aqi, components }, index) => (
                        <Card key={index} containerStyle={styles.card}>
                            <Card.Title>{location.name}{location.state ? `, ${location.state}` : ''}, {location.country}</Card.Title>
                            <Card.Divider />
                            <Text style={styles.bold}>AQI: {aqi} ({getAQIDescription(aqi)})</Text>

                            {Object.entries(components).map(([key, value]) => (
                                <View key={key} style={styles.pollutantRow}>
                                    <Text style={styles.pollutantName}>{pollutantDescriptions[key as keyof typeof pollutantDescriptions]}</Text>
                                    <Text style={styles.pollutantDesc}>
                                        {key.toUpperCase()} - {value.toFixed(1)} µg/m³
                                    </Text>
                                </View>
                            ))}
                        </Card>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export default DetailsTab;