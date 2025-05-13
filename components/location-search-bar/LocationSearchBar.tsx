import { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
} from 'react-native';
import { SearchBar, ListItem, Text, Icon } from '@rneui/themed';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import axios from 'axios';
import debounce from 'lodash/debounce';

import { fetchCitySuggestions } from '@/utils/api';
import { useColorScheme } from '@/components/useColorScheme';
import styles from './locationSearchBar.style';

type Location = {
    name: string;
    latitude: number;
    longitude: number;
    state?: string;
    country?: string;
};

type Props = {
    onLocationSelect: (location: Location | Location[]) => void;
    placeholder?: string;
    disableSuggestions?: boolean;
    returnAllMatches?: boolean;
    showDefaultOnEmptySubmit?: boolean;
    defaultLocations?: Location[];
};

const LocationSearchBar = ({
    onLocationSelect,
    placeholder = 'Search city...',
    disableSuggestions = false,
    returnAllMatches = false,
    showDefaultOnEmptySubmit = false,
    defaultLocations = [],
}: Props) => {
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState<Location[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const theme = useColorScheme();
    const { OPENWEATHER_API_KEY } = Constants.expoConfig.extra;

    const isLight = theme === 'light';
    const textColor = isLight ? '#000' : '#fff';
    const backgroundColor = isLight ? '#fff' : '#121212';

    const fetchSuggestions = async (query: string) => {
        const results = await fetchCitySuggestions(query);
        handleSelect(results)
        setSuggestions(results);
    };

    const debouncedFetch = debounce(fetchSuggestions, 300);

    useEffect(() => {
        console.log("called")
        console.log("search.trim()", search.trim())
        if (search.trim()) {
            console.log("reached")
            debouncedFetch(search);
        } else {
            setSuggestions([]);
        }
        return () => debouncedFetch.cancel();
    }, [search]);

    const handleSelect = (location: Location | Location[]) => {
        const selected = Array.isArray(location) ? location[0] : location;
        // setSearch(selected.name);
        setSuggestions([]);
        onLocationSelect(location);
    };

    const handleUseCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.warn('Permission to access location was denied');
                return;
            }

            const { coords } = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = coords;

            const { data } = await axios.get('https://api.openweathermap.org/geo/1.0/reverse', {
                params: {
                    lat: latitude,
                    lon: longitude,
                    limit: 1,
                    appid: OPENWEATHER_API_KEY,
                },
            });

            const loc = data[0];
            if (loc) {
                const location: Location = {
                    name: loc.name,
                    state: loc.state,
                    country: loc.country,
                    latitude: loc.lat,
                    longitude: loc.lon,
                };
                handleSelect(location);
            }
        } catch (error) {
            console.error('Error getting current location', error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <SearchBar
                    placeholder={placeholder}
                    onChangeText={setSearch}
                    value={search}
                    round
                    platform="default"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    lightTheme={isLight}
                    onSubmitEditing={() => {
                        if (search.trim() === '') {
                            if (showDefaultOnEmptySubmit && defaultLocations?.length) {
                                handleSelect(returnAllMatches ? defaultLocations : defaultLocations[0]);
                                setSearch("")
                            }
                        } else if (suggestions.length > 0) {
                            handleSelect(returnAllMatches ? suggestions : suggestions[0]);
                        }
                        Keyboard.dismiss();
                    }}
                    
                />

                <TouchableOpacity onPress={handleUseCurrentLocation} style={styles.currentLocationButton}>
                    <Icon name="my-location" type="material" color={textColor} size={20} />
                    <Text style={{ color: textColor, marginLeft: 8 }}>Use Current Location</Text>
                </TouchableOpacity>

                {!disableSuggestions && isFocused && suggestions.length > 0 && (
                    <FlatList
                        data={suggestions}
                        keyExtractor={(item, index) => `${item.name}-${index}`}
                        keyboardShouldPersistTaps="handled"
                        style={styles.suggestionList}
                        renderItem={({ item }) => (
                            <ListItem onPress={() => handleSelect(item)} bottomDivider containerStyle={{ backgroundColor }}>
                                <ListItem.Content>
                                <ListItem.Title style={{ color: textColor }}>
                                    {item.name}
                                    {item.state ? `, ${item.state}` : ''}, {item.country}
                                </ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        )}
                    />
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default LocationSearchBar;
