import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MapScreen = () => {
  const [initialRegion, setInitialRegion] = useState(null);
  const [hospitals, setHospitals] = useState([
    {
      name: 'Hospital A',
      latitude: 24.56897907200166 + 0.002,
      longitude: 73.69445656543496 + 0.001,
    },
    {
      name: 'Hospital B',
      latitude: 24.56897907200166 + 0.001,
      longitude: 73.69445656543496 + 0.001,
    },
    {
      name: 'Hospital C',
      latitude: 24.56897907200166 + 0.001,
      longitude: 73.69445656543496,
    },
    {
      name: 'Hospital D',
      latitude: 24.56897907200166 + 0.003,
      longitude: 73.69445656543496,
    },
  ]);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation();
          } else {
            console.log('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        getCurrentLocation();
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);

          const {latitude, longitude} = position.coords;
          setInitialRegion({
            latitude,
            longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        },
        error => console.log(error),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      {initialRegion && (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={true}
          showsMyLocationButton={true}>
          <Marker coordinate={initialRegion} title="Your Location" />
          {hospitals.map(hospital => (
            <Marker
              pinColor="blue"
              key={hospital.name}
              coordinate={{
                latitude: hospital.latitude,
                longitude: hospital.longitude,
              }}
              title={hospital.name}
            />
          ))}
        </MapView>
      )}
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: 'blue',
            borderRadius: 12,
            padding: 10,
            width: '90%',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
            LogOut
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
