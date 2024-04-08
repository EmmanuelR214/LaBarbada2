import React,{useState} from 'react'
import { motion } from "framer-motion";

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Circle } from 'ol/style';
import { Control } from 'ol/control';
import { defaults as defaultControls } from 'ol/control';
import { ButtonBasic } from './Buttons';

export const ModalVentas = ({ children, onClose }) => {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: { scale: 1, zIndex: 50 },
    hidden: { scale: 0, zIndex: -1 },
  };

  return (
    <motion.div initial="hidden" animate="visible" exit="hidden">
      {/* Fondo del modal */}
      <motion.div
        variants={backdropVariants}
        className=" w-full h-screen flex justify-center items-center fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-75 px-4 md:px-8 transition duration-300 ease-in-out"
      >
        {/* Modal */}
        <motion.div
          variants={modalVariants}
          className=" w-2/4 h-2/5 space-y-4 bg-white rounded-3xl flex flex-col justify-center items-center"
        >
          <img src="/img/warning.png" alt="" className=' w-2/5 h-auto' />
          <p className='text-black font-bold' >¡Hola! Estamos trabajando para poder traer esta función.</p>
          <ButtonBasic click={onClose} text='Cerrar' color='bg-red-400' hovColor='hover:bg-red-500' width='w-1/2'   />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export const MyMap = ({ onSelectLocation }) => {
  const [map, setMap] = useState(null);

  // Function to handle map click
  const handleMapClick = (event) => {
    const coordinate = event.coordinate;
    const lonLat = fromLonLat(coordinate);
    onSelectLocation(lonLat);
  };

  // Initialize map on first render
  React.useEffect(() => {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
      controls: defaultControls({ attribution: false }),
    });

    // Add click event listener to the map
    map.on('click', handleMapClick);

    setMap(map);

    // Cleanup on component unmount
    return () => {
      map.dispose();
    };
  }, []);

  // Render map container
  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
}