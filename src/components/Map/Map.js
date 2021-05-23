import React, { useState } from 'react'
import Markers from '../Marker'
import ReactMapGL from "react-map-gl"
import SpeedDial from '../../components/SpeedDial'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '../Alert/Alert'

import './Map.css'

const Map = () => {
    const [markers, setMarkers] = useState([])
    const [action, setAction] = useState("")
    const [actionChosen, setActionChosen] = useState(false)
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

    const [mapViewport, setMapViewport] = useState({
      height: "100vh",
      width: "100wh",
      longitude: 34.798983937307526, 
      latitude: 31.99309730831267,
      zoom: 7
    })

    const handleChangeAction = (newAction) => {
      setActionChosen(true)
      setAction(newAction)
    }

    const addMarker = (e) => {
      console.log("action: " +action)
      console.log("Chosen: " +actionChosen)

      if(action) {
        if(!actionChosen) {
          setMarkers([...markers, e.lngLat])
          setAction("")
        } else {
          setActionChosen(false)
        }
      } else {
        setIsSnackbarOpen(true)
      }
    }

  return (
    <ReactMapGL mapboxApiAccessToken="pk.eyJ1Ijoicm95dmFyZGk0IiwiYSI6ImNraWRqYWVvYzA1dmgyc282YTg0aW16NGkifQ.7jEGmT-pezL7_nbkY186Dw"
                mapStyle='mapbox://styles/mapbox/satellite-streets-v11'      
                onViewportChange={setMapViewport} 
                onClick={addMarker}
                {...mapViewport}
    >
      <SpeedDial handleChangeAction={handleChangeAction}/>
      <Markers id="markers" markers={markers}/>
      <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={() => setIsSnackbarOpen(false)}>
        <Alert onClose={() => setIsSnackbarOpen(false)} severity="warning">
          Please choose event type first
        </Alert>
      </Snackbar>
    </ReactMapGL>
  )
};

export default Map