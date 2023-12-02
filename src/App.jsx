import React from 'react';
import WeatherApp from './WeatherApp';
//import 'antd/dist/antd.css';

const App = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <WeatherApp />
    </div>
  );
};

export default App;
