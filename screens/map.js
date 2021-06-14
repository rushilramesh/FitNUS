import React, { useState, useEffect} from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions} from "react-native";
import * as Location from 'expo-location'

export default function Map() {
  const [mTop, setMargin] = useState(0)
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  console.log(JSON.stringify(location))
  
  const _onMapReady = () => setMargin(60)

  return (
    <View style={styles.container}>
      <MapView
        style={[styles.map, {marginTop: mTop}]}
        initialRegion={{
          latitude: 1.3702303096151767,
          longitude: 103.94958799677016,
          latitudeDelta: 0.09,
          longitudeDelta: 0.05,
        }}
        provider="google"     
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        onMapReady={_onMapReady}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
