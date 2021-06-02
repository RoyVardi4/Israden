import React, { useState, useRef, useCallback } from 'react'
import Markers from '../Marker'
import ReactMapGL from "react-map-gl"
import SpeedDial from '../../components/SpeedDial'
// import Snackbar from '@material-ui/core/Snackbar'
// import Alert from '../Alert/Alert'

import {Editor, DrawPolygonMode, EditingMode, DrawPointMode, DrawLineStringMode} from 'react-map-gl-draw'
import {getFeatureStyle, getEditHandleStyle} from './style'
import ControlPanel from '../ControlPanel/controlPanel'

import './Map.css'

const Map = () => {
    const [markers, setMarkers] = useState([])
    const [action, setAction] = useState("")
    // const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
    const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false)
    const [mode, setMode] = useState(null)
    const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(null)
    const editorRef = useRef(null)

    const [mapViewport, setMapViewport] = useState({
      height: "100vh",
      width: "100wh",
      longitude: 34.798983937307526, 
      latitude: 31.99309730831267,
      zoom: 7,
      maxZoom: 141
    })

    const handleChangeAction = (newAction) => {
      setAction(newAction)
      switch (newAction) {
        case "EditLayer":
          setMode(new EditingMode())
          break
        case "Layer": 
          setMode(new DrawPolygonMode())
          break
        case "Guns":
        case "Drugs":     
          setMode(new DrawPointMode())
          break
        default: break
      }
    }

    // const handleCloseAlert = () => {
    //   setIsSnackbarOpen(false)
    //   setIsSpeedDialOpen(false)
    // }

    const onSelect = (options) => {
      if (mode.constructor.name === "DrawPointMode") return   
      setSelectedFeatureIndex(options && options.selectedFeatureIndex) 
    }

    const onDelete = useCallback(() => {
      if (selectedFeatureIndex !== null && selectedFeatureIndex >= 0) {
        editorRef.current.deleteFeatures(selectedFeatureIndex)
        setSelectedFeatureIndex(null)
      }
    }, [selectedFeatureIndex]);

    const onUpdate = (e) => {
      const {editType, data} = e

      if(action === "Guns" || action === "Drugs") {
        // add new Marker to markers list
        const newMarkers = [
          ...markers,
          {
            type: action,
            lngLat: data[data.length - 1].geometry.coordinates
          }
        ]  
        setMarkers(newMarkers)
        setAction("")
      }
      
      if (editType === 'addFeature') {
        setMode(null)
      }
    }

    const drawTools = (
      <SpeedDial isSpeedDialOpen={isSpeedDialOpen} 
                 setIsSpeedDialOpen={(isOpen) => setIsSpeedDialOpen(isOpen)}
                 handleChangeAction={handleChangeAction}/>
    )

    const features = editorRef.current && editorRef.current.getFeatures()
    const selectedFeature =
      features && (features[selectedFeatureIndex] || features[features.length - 1])

  return (
    <div>
      <ReactMapGL mapboxApiAccessToken="pk.eyJ1Ijoicm95dmFyZGk0IiwiYSI6ImNraWRqYWVvYzA1dmgyc282YTg0aW16NGkifQ.7jEGmT-pezL7_nbkY186Dw"
                  mapStyle='mapbox://styles/mapbox/satellite-streets-v11'      
                  onViewportChange={setMapViewport} 
                  {...mapViewport}
      >
        <Editor
            ref={editorRef}
            style={{width: '100%', height: '100%'}}
            clickRadius={12}
            mode={mode}
            onSelect={onSelect}
            onUpdate={onUpdate}
            editHandleShape={'circle'}
            featureStyle={getFeatureStyle}
            editHandleStyle={getEditHandleStyle}
        />
        {drawTools}
        <Markers id="markers" markers={markers}/>
        {/* <Snackbar anchorOrigin={{vertical: "top", horizontal: "center"}} open={isSnackbarOpen} autoHideDuration={3000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="warning">
            Please choose event type first
          </Alert>
        </Snackbar> */}
      </ReactMapGL>
      {
        selectedFeatureIndex !== null && selectedFeatureIndex >= 0 ? 
        <ControlPanel deletePoly={onDelete} poly={selectedFeature} /> 
        :
        null
      }
    </div>
  )
}

export default Map