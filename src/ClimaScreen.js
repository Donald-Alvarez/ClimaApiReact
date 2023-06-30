import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const ClimaScreen = () => {
  const [climaData, setClimaData] = useState(null);
  // Lista de países que deseo mostrar
  const countries = ['Nicaragua', 'Honduras', 'Costa Rica', 'El Salvador', 'Panama',];

  useEffect(() => {
    const fetchClimaData = async () => {
      try {
        const responsePromises = countries.map(country =>
          axios.get(`https://api.weatherapi.com/v1/current.json?key=105307eb1bd949c699a235621232806&q=${country}&lang=es`)
        );
        const responses = await Promise.all(responsePromises);
        const climaDataArray = responses.map(response => response.data);
        setClimaData(climaDataArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClimaData();
  }, []);
  if (!climaData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <View style={styles.container}>
      {climaData.map((clima, index) => (
        <View key={index} style={styles.weatherContainer}>
          <Text style={styles.text}>Ubicación: {clima.location.name}, {clima.location.region}, {clima.location.country} </Text>
          <Text style={styles.text}>Temperatura: {clima.current.temp_c}°C</Text>
          <Text style={styles.text}>Condición: {clima.current.condition.text}</Text>
          <Text style={styles.text}>Humedad: {clima.current.humidity}%</Text>
          <Text style={styles.text}>Presión atmosférica: {clima.current.pressure_mb} mb</Text>
          <Text style={styles.text}>Viento: {clima.current.wind_kph} km/h, dirección {clima.current.wind_dir}</Text>
        </View>
      ))}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
    container: {
        backgroundColor: '#E7FFFE',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
      },
      loadingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555555',
        textAlign: "center",
      },
      weatherContainer: {
        marginBottom: 20,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        elevation: 20,
      },
      text: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333333',
      },
});

export default ClimaScreen;
