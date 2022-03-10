import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import GetLocation from 'react-native-get-location';
import LinearGradient from 'react-native-linear-gradient';

enum WeatherClass {
  Clear = 0,
  Clouds = 1,
  Rain = 2,
  Snow = 3,
  Storm = 4,
  Fog = 5,
  Night = 6,
}

const API_KEY = 'REDACTED';
const WEATHER_ICONS = [
  '\uf00d',
  '\uf041',
  '\uf015',
  '\uf076',
  '\uf01d',
  '\uf021',
  '\uf02e',
];

const GRADIENTS = {
  Clear: ['#34aeeb', '#a1deff'],
  Clouds: ['#a3a3a3', '#c9c9c9'],
  //Night: ['#090924', '#090924', '#45458a', '#1b1a52'],
  Night: ['#090924', '#1b1a52'],
};

type Weather = {
  name: string;
  dt: number;
  weather: {
    main: string;
    description: string;
    icon: string;
    id: number;
  }[];
  sys: {
    sunrise: number;
    sunset: number;
  };
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
};

function isNight(weather: Weather): boolean {
  if (weather.dt > weather.sys.sunset || weather.dt < weather.sys.sunrise) {
    return true;
  }
  return false;
}

function getWeatherClass(weather: Weather | undefined): WeatherClass {
  if (!weather) {
    return WeatherClass.Clear;
  }

  const id = weather.weather[0].id;
  const nighttime = isNight(weather);

  if (id > 800) {
    return WeatherClass.Clouds;
  } else
    switch (id / 100) {
      case 2:
        return WeatherClass.Storm;
      case 3:
      case 5:
        return WeatherClass.Rain;
      case 6:
        return WeatherClass.Snow;
      case 7:
        return WeatherClass.Fog;
      case 8:
        return nighttime ? WeatherClass.Night : WeatherClass.Clear;
      default:
        return WeatherClass.Clear;
    }
}

function getGradient(weather: Weather | undefined) {
  if (weather && isNight(weather)) {
    return GRADIENTS.Night;
  }

  switch (getWeatherClass(weather)) {
    case WeatherClass.Clear:
      return GRADIENTS.Clear;
    case WeatherClass.Night:
      return GRADIENTS.Night;
    default:
      return GRADIENTS.Clouds;
  }
}

function WeatherWidget() {
  const [location, setLocation] = useState<GetLocation.Location>();
  const [weather, setWeather] = useState<Weather>();

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((l) => {
        setLocation(l);
      })
      .catch((error) => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  useEffect(() => {
    if (location) {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&APPID=${API_KEY}&units=imperial`,
      )
        .then((res) => res.json())
        .then((json) => {
          setWeather(json);
        })
        .catch((reason) => {
          console.error(`Unable to featch weather data ${reason}`);
          setWeather(undefined);
        });
    }
  }, [location]);

  return (
    <LinearGradient colors={getGradient(weather)} style={styles.view}>
      <Text style={styles.name}>{weather?.name}</Text>
      <Text style={styles.temperature}>
        {weather ? Math.round(weather!!.main.temp) + 'º' : '...'}
      </Text>
      <Text style={styles.weather}>
        {WEATHER_ICONS[getWeatherClass(weather)]}
      </Text>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  weather: {
    fontFamily: 'Weather Icons',
    fontSize: 44,
    fontWeight: '100',
    color: 'white',
    paddingTop: 24,
  },
  temperature: {
    fontSize: 72,
    fontWeight: '300',
    color: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: '500',
    color: 'white',
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
});
export default WeatherWidget;
