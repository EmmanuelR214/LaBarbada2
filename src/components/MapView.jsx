import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuth } from '../routes/context/AuthContext';
import axios from 'axios'; // Importa axios para hacer solicitudes HTTP

const MapView = () => {
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
    <div>
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

export default MapView


/*
_lastCenter
: 
LatLng {lat: 21.14238465678422, lng: -98.41322139719162}


_lastCenter
: 
LatLng {lat: 21.146065336754006, lng: -98.42788056734504}

*/

