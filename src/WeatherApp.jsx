import React, { useState, useEffect } from 'react';
import { Card, Spin, Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const WeatherApp = () => {
  const [temperature, setTemperature] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(data);
  useEffect(() => {
    const apiKey = '812b48888f2a14b7a685aa189d028f88ccab259b5feac47a6dfbcec80d622612';
    const inseeCode = '06004';

    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.meteo-concept.com/api/forecast/daily?insee=${inseeCode}&token=${apiKey}`
        );
        const currentTemperature = response.data.forecast[0].tmax;
        setTemperature(currentTemperature);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data', error);
      }
    };

    fetchWeatherData();
  }, []);


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: 300, textAlign: 'center' }}>
        <Spin spinning={loading}>
          <Title level={3}>Weather App</Title>
          <Title level={5}>{data.city.name}</Title>
          {temperature !== null ? (
            <p>Current Temperature: {temperature} °C</p>
          ) : (
            <p>Unable to fetch weather data</p>
          )}
        </Spin>
      </Card>
    </div>
  );
};

export default WeatherApp;
