import React, {useState} from 'react'

import { ButtonBasic } from '../components/Buttons'
import { Accordion } from '../components/Cards'
import { MyMap } from '../components/Modal'

const Finalizepurchase = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const handleSelectLocation = (lonLat) => {
    setSelectedLocation(lonLat);
  };

  return (
    <main className=' w-full h-screen flex flex-col justify-center items-center' >
      <div>Finalizepurchase</div>
      <Accordion title="Sección 1">
        <h2>Elige tu ubicación</h2>
        <MyMap onSelectLocation={handleSelectLocation} />
        {selectedLocation && (
          <p>Ubicación seleccionada: {selectedLocation}</p>
        )}
      </Accordion>
      <h2>Juasn </h2>
    </main>
  )
}

export default Finalizepurchase