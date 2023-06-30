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



}
export default ClimaScreen;