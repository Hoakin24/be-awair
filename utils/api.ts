import axios from 'axios';
import Constants from 'expo-constants';

const { OPENWEATHER_API_KEY } = Constants.expoConfig.extra;

export type Location = {
    name: string;
    latitude: number;
    longitude: number;
    state?: string;
    country?: string;
};

export const fetchCitySuggestions = async (
    query: string,
): Promise<Location[]> => {
    if (!query) return [];

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct`,
            {
                params: {
                    q: query,
                    limit: 5,
                    appid: OPENWEATHER_API_KEY,
                },
            }
        );

        return response.data.map((item: any) => ({
            name: item.name,
            state: item.state,
            country: item.country,
            latitude: item.lat,
            longitude: item.lon,
        }));
    } catch (error) {
        console.error('Failed to fetch suggestions', error);
        return [];
    }
};

export const fetchAirQuality = async (lat: number, lon: number): Promise<any | null> => {
    try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution`, {
            params: {
                lat,
                lon,
                appid: OPENWEATHER_API_KEY,
            },
        });

        console.log('res.data.list[0]',res.data.list[0])

        const data = res.data.list[0];

        return {
            aqi: data.main.aqi,
            components: data.components, // contains pm2_5, pm10, co, no2, o3, so2
        };
    } catch (error) {
        console.error("Failed to fetch air quality:", error);
        return null;
    }
};

