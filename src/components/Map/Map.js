import React, { useState } from 'react'
import Markers from '../Marker'
import ReactMapGL, {Source, Layer} from "react-map-gl"
import SpeedDial from '../../components/SpeedDial'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '../Alert/Alert'

import './Map.css'

const Map = () => {
    const [markers, setMarkers] = useState([])
    const [action, setAction] = useState("")
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
    const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false)

    const [mapViewport, setMapViewport] = useState({
      height: "100vh",
      width: "100wh",
      longitude: 34.798983937307526, 
      latitude: 31.99309730831267,
      zoom: 7,
      maxZoom: 14
    })

    const handleChangeAction = (newAction) => {
      setAction(newAction)
    }

    const addMarker = (e) => { 
      // The user didn't acutally clicked on map (layers)    
      if(e.srcEvent.path[0].className !== "overlays") return  
      
      if(action) {
        const newMaker = {
          lngLat: e.lngLat,
          type: action
        }   
        setMarkers([...markers, newMaker])
        setAction("")
      } else {
        // Open Alert
        setIsSnackbarOpen(true)

        // Open Speed Dial
        setIsSpeedDialOpen(true)
      }
    }

    const handleCloseAlert = () => {
      setIsSnackbarOpen(false)
      setIsSpeedDialOpen(false)
    }

  return (
    <ReactMapGL mapboxApiAccessToken="pk.eyJ1Ijoicm95dmFyZGk0IiwiYSI6ImNraWRqYWVvYzA1dmgyc282YTg0aW16NGkifQ.7jEGmT-pezL7_nbkY186Dw"
                mapStyle='mapbox://styles/mapbox/satellite-streets-v11'      
                onViewportChange={setMapViewport} 
                onClick={addMarker}
                {...mapViewport}
    >
      <Source
        id="orgonjson"
        type="geojson"
        data={
          {
            'type': 'Feature',
            'geometry': {
            'type': 'Polygon',
            // These coordinates outline Maine.
            'coordinates': [
            [
            [-67.13734, 45.13745],
            [-66.96466, 44.8097],
            [-68.03252, 44.3252],
            [-69.06, 43.98],
            [-70.11617, 43.68405],
            [-70.64573, 43.09008],
            [-70.75102, 43.08003],
            [-70.79761, 43.21973],
            [-70.98176, 43.36789],
            [-70.94416, 43.46633],
            [-71.08482, 45.30524],
            [-70.66002, 45.46022],
            [-70.30495, 45.91479],
            [-70.00014, 46.69317],
            [-69.23708, 47.44777],
            [-68.90478, 47.18479],
            [-68.2343, 47.35462],
            [-67.79035, 47.06624],
            [-67.79141, 45.70258],
            [-67.13734, 45.13745]
            ]
            ]
            }
          }
        }
      />
      <Layer
        id="anything"
        type="fill"
        source="orgonjson"
        paint={{
          "fill-color": "red",
          "fill-opacity": 0.6
        }} 
      />
      <SpeedDial 
          isSpeedDialOpen={isSpeedDialOpen} 
          setIsSpeedDialOpen={(isOpen) => setIsSpeedDialOpen(isOpen)}
          handleChangeAction={handleChangeAction}/>
      <Markers id="markers" markers={markers}/>
      <Snackbar anchorOrigin={{vertical: "top", horizontal: "center"}} open={isSnackbarOpen} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="warning">
          Please choose event type first
        </Alert>
      </Snackbar>
    </ReactMapGL>
  )
};

export default Map