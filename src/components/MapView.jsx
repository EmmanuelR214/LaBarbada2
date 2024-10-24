import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Tooltip  } from 'react-leaflet';
import L from 'leaflet';
import { renderToString } from 'react-dom/server';
import 'leaflet/dist/leaflet.css';
import { useAuth } from '../routes/context/AuthContext';
import axios from 'axios'; // Importa axios para hacer solicitudes HTTP}
import { useStore } from '../routes/context/StoreContext';
import { Icon } from '@iconify/react';
import { GoogleMap, LoadScriptNext, Marker as GoogleMapMarker  } from '@react-google-maps/api';

//AIzaSyALZU_09a7vbAaQCDh8Q28QL0pXD-FXbWU

const mapContainerStyle = {
  height: '100%',
  width: '100%',
};

const center = {
  lat: 21.13666829845463,
  lng: -98.41226732621229,
};

export const MapViewGoogle = () =>{
  const { setLat, setLng } = useStore();
  const { setCordenadas } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setLat(lat)
    setLng(lng)
    setSelectedLocation({ lat, lng });
    const address = await getAddressFromCoordinates(lat, lng);
    setSelectedAddress(address);
    setCordenadas(address);ma
  };

  const getAddressFromCoordinates = async (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const response = await geocoder.geocode({ location: { lat, lng } });
    if (response.results[0]) {
      return response.results[0].formatted_address;
    } else {
      return 'Dirección no encontrada';
    }
  };

  return (
    <LoadScriptNext googleMapsApiKey="AIzaSyALZU_09a7vbAaQCDh8Q28QL0pXD-FXbWU">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={14}
        onClick={handleMapClick}
      >
        {selectedLocation && (
          <GoogleMapMarker
            position={selectedLocation}
            draggable={true}
            onDragEnd={async (e) => {
              const lat = e.latLng.lat();
              const lng = e.latLng.lng();
              setSelectedLocation({ lat, lng });
              const newAddress = await getAddressFromCoordinates(lat, lng);
              setSelectedAddress(newAddress);
              setCordenadas(newAddress);
            }}
          />
        )}
      </GoogleMap>
      {selectedLocation && (
        <div className="text-white">
          <p>Dirección: {selectedAddress}</p>
        </div>
      )}
    </LoadScriptNext>
  );
}

export const MapView = () => {
  const {setLat, setLng} = useStore()
  const {setCordenadas} = useAuth();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  
  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    setSelectedLocation({ lat, lng });
    const address = await getAddressFromCoordinates({ lat, lng });
    setSelectedAddress(address);
  };

  const GetCurrentLocation = () => {
    useMapEvents({
      click(event) {
        const map = event.target;
        map.locate();
      },
      async locationfound(e) {
        setSelectedLocation(e.target._lastCenter);
        setLat(e.target._lastCenter.lat)
        setLng(e.target._lastCenter.lng)
        const address = await getAddressFromCoordinates(e.target._lastCenter); // Obtiene la dirección para las coordenadas actuales
        setSelectedAddress(address);
        setCordenadas(address)
      },
    });
    return null;
  };

  // Función para obtener la dirección a partir de coordenadas geográficas
  const getAddressFromCoordinates = async (latlng) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`);
    const data = await response.json();
    if (data.display_name) {
      return data.display_name;
    } else {
      return 'Dirección no encontrada';
    }
  };
  
  
  // const huejutlaBounds = [
  //   [21.13338, -98.43152],
  //   [21.16328, -98.39309] 
  // ];maxBounds={huejutlaBounds} maxBoundsViscosity={1.0}
  
  return (
    <div >
      <MapContainer center={[21.13666829845463, -98.41226732621229]} zoom={14} style={{height:'400px',width:'100%'}} onClick={handleMapClick}>
        <GetCurrentLocation />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {selectedLocation && (
          <Marker 
            position={selectedLocation} 
            draggable={true}
            eventHandlers={{
              dragend: async (event) => {
                const marker = event.target;
                const newPosition = marker.getLatLng();
                setSelectedLocation(newPosition);
                const newAddress = await getAddressFromCoordinates(newPosition);
                setSelectedAddress(newAddress);
                setCordenadas(newAddress)
              }
            }}
          >
            <Popup >
              {selectedAddress ? (
                <div >
                  <p>Dirección: {selectedAddress}</p>
                  <button>Seleccionar ubicación</button>
                </div>
              ) : (
                <p>Coordenadas: {selectedLocation.lat}, {selectedLocation.lng}</p>
              )}
            </Popup>
          </Marker>
        )}
      </MapContainer>
      {selectedLocation && (
        <div className='text-white' >
          <p>Dirección: {selectedAddress}</p>
        </div>
      )}
    </div>
  )
}

const createIconUrl = (svgString) => {
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
  return URL.createObjectURL(svgBlob);
};

const iconSVGs = {
  Trabajo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M48 0C21.5 0 0 21.5 0 48L0 464c0 26.5 21.5 48 48 48l96 0 0-80c0-26.5 21.5-48 48-48s48 21.5 48 48l0 80 96 0c26.5 0 48-21.5 48-48l0-416c0-26.5-21.5-48-48-48L48 0zM64 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm112-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM80 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM272 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16z"/></svg>`,
  Casa: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>`,
  Pareja: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>`
};

export const LocationMap = ({ locations }) => {
  const [iconUrls, setIconUrls] = useState({});

  useEffect(() => {
    const urls = {};
    for (const [key, svg] of Object.entries(iconSVGs)) {
      urls[key] = createIconUrl(svg);
    }
    setIconUrls(urls);

    // Limpieza de URLs cuando el componente se desmonta
    return () => {
      Object.values(urls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const center = [21.13999999945463, -98.41226732621229];

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {Object.keys(iconUrls).length > 0 && locations.map((location, index) => (
          <Marker 
            key={index} 
            position={[location.lat, location.lng]} 
            icon={new L.Icon({
              iconUrl: iconUrls[location.apodo],
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41],
            })}
          >
            <Tooltip direction="top" offset={[0, -25]} opacity={1} permanent>
              {location.apodo}
            </Tooltip>
            <Popup>{location.apodo}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
