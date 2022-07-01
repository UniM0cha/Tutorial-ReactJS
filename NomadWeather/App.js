import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ActivityIndicator,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const API_KEY = 'c293b9d4202002fc37c144ca1732b867';

export default function App() {
    const [city, setCity] = useState('Loading...');
    const [days, setDays] = useState([]);
    const [ok, setOk] = useState(false);

    const getWeather = async () => {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
            setOk(false);
        }
        const {
            coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({
            accuracy: 5,
        });
        const location = await Location.reverseGeocodeAsync(
            { latitude, longitude },
            { useGoogleMaps: false }
        );
        setCity(location[0].city);
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
        );
        const json = await response.json();
        setDays(json.daily);
    };

    useEffect(() => {
        getWeather();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="light"></StatusBar>
            <View style={styles.city}>
                <Text style={styles.cityName}>{city}</Text>
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                contentContainerStyle={styles.weather}
            >
                {days.length == 0 ? (
                    <View style={styles.day}>
                        <ActivityIndicator
                            color="white"
                            size="large"
                            style={{ marginTop: 10 }}
                        />
                    </View>
                ) : (
                    days.map((day, index) => (
                        <View key={index} style={styles.day}>
                            <Text style={styles.temp}>
                                {parseFloat(day.temp.day).toFixed(1)}
                            </Text>
                            <Text style={styles.description}>
                                {day.weather[0].main}
                            </Text>
                            <Text style={styles.tinyText}>
                                {day.weather[0].description}
                            </Text>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#2b2b2b' },

    city: {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cityName: {
        color: 'white',
        fontSize: 68,
        fontWeight: '500',
    },

    weather: {
        // backgroundColor: 'blue',
    },

    day: {
        width: SCREEN_WIDTH,
        alignItems: 'center',
    },

    temp: {
        marginTop: 50,
        fontSize: 178,
        color: 'white',
    },

    description: {
        marginTop: -30,
        fontSize: 60,
        color: 'white',
    },

    tinyText: {
        fontSize: 20,
        color: 'white',
    },
});
