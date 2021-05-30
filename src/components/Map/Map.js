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
    
    const [layerCount, setLayerCount] = useState(5)
    const [layerPoints, setLayerPoint] = useState([])

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
      
      if(action === "Layer") {
        setLayerCount((prevState) => --prevState)
        
        // insert also first point as last point to close the polygon on last click
        if(layerCount === 0) {
          setLayerPoint([
            ...layerPoints, 
            e.lngLat,
            layerPoints[0]
          ])
          setAction("")
        } else {
          setLayerPoint([
            ...layerPoints, 
            e.lngLat
          ])
        }
        return
      } 
      
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
            'coordinates': [
                // [
                  layerPoints
                  // [35.391929, 30.870275],
                  // [35.227490, 30.879548],
                  // [35.242942, 30.713106],
                  // [35.344224, 30.715841],
                  // [35.371389, 30.788716],
                  // [35.391929, 30.870275], 
                // ]
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
          "fill-opacity": 0.3
          // "line-width" : 2
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