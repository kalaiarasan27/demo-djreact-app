import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationDisplay = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    address: null,
    error: null,
    permissionStatus: null
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(prevState => ({
        ...prevState,
        error: 'Geolocation is not supported by this browser.',
        permissionStatus: 'unsupported'
      }));
      return;
    }

    const geoSuccess = async (position) => {
      const { latitude, longitude } = position.coords;
      setLocation(prevState => ({
        ...prevState,
        latitude,
        longitude,
        error: null,
        permissionStatus: 'granted'
      }));

      try {
        const apiKey = 'AIzaSyAGq_s2CMIolPCBdHuRKW8l9Ry9lI75ofI'; 
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            latlng: `${latitude},${longitude}`,
            key: apiKey
          }
        });

        console.log('Geocoding API response:', response.data); 

        if (response.data.status === 'OK') {
          const address = response.data.results[0]?.formatted_address || 'Address not found';
          setLocation(prevState => ({
            ...prevState,
            address
          }));
        } else {
          setLocation(prevState => ({
            ...prevState,
            error: 'Failed to fetch address'
          }));
        }
      } catch (error) {
        console.error('Error fetching address:', error); 
        setLocation(prevState => ({
          ...prevState,
          error: 'Error fetching address'
        }));
      }
    };

    const geoError = (error) => {
      console.error('Geolocation error:', error); 
      if (error.code === error.PERMISSION_DENIED) {
        setLocation({
          latitude: null, 
          longitude: null,
          address: null,
          error: 'Permission denied. Please enable location access in your browser settings.',
          permissionStatus: 'denied'
        });
      } else {
        setLocation({
          latitude: null,
          longitude: null,
          address: null,
          error: error.message,
          permissionStatus: 'error'
        });
      }
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  }, []);

  const { latitude, longitude, address, error, permissionStatus } = location;

  return (
    <div>
      {permissionStatus === 'unsupported' && <p>{error}</p>}
      {permissionStatus === 'denied' && (
        <p>
          {error} <br />
          <a href="https://www.google.com/search?q=enable+location+access">Click here</a> for instructions on enabling location access.
        </p>
      )}
      {permissionStatus === 'error' && <p>Error: {error}</p>}
      {permissionStatus === 'granted' ? (
        <>
          <p>Latitude: {latitude}, Longitude: {longitude}</p>
          {address ? (
            <p>Address: {address}</p>
          ) : (
            <p>Fetching address...</p>
          )}
        </>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default LocationDisplay;
