import React, { useState, useRef, useCallback, useEffect } from 'react'
import Markers from '../Marker'
import Alert from '../Alert/Alert'
import Drawer from '../Drawer'
import ReactMapGL, {FlyToInterpolator} from "react-map-gl"
import SpeedDial from '../../components/SpeedDial'
import Snackbar from '@material-ui/core/Snackbar'
import Grid from '@material-ui/core/Grid'

import {Editor, DrawPolygonMode, EditingMode, DrawPointMode} from 'react-map-gl-draw'
import {getFeatureStyle, getEditHandleStyle} from './style'
import ControlPanel from '../ControlPanel/controlPanel'

import ServerAPI from '../../ServerAPI'

import './Map.css'

const Map = () => {
    const [markers, setMarkers] = useState([])
    const [action, setAction] = useState("")
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
      maxZoom: 18,
      minZoom: 5
    })

    const [isNewFeature, setIsNewFeature] = useState(false)
    const [isMeAddedFeature, setIsMeAddedFeature] = useState(false)
    const [listening, setListening] = useState(false)

    useEffect(() => {
      if (!listening) {
        const events = new EventSource('http://localhost:5000/marker/events');

        events.onmessage = (event) => {
          const parsedData = JSON.parse(event.data);
          if(parsedData.type) {
            setMarkers(prevMarkers => [...prevMarkers, parsedData])
            setIsMeAddedFeature(prevStatus => {
              if(!prevStatus) setIsNewFeature(true)
              return false
            })
          }
        }

        const getData = async () => {
          const data = await ServerAPI.getAllMarkers()
          setMarkers(prevMarkers => [...prevMarkers, ...data])
          const dataLayers = await ServerAPI.getAllLayers()
          editorRef.current.addFeatures(dataLayers)
        }
        getData()
        setListening(true)
      }
    }, [listening, markers, isMeAddedFeature]);

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

    const handleCloseAlert = () => {
      setIsNewFeature(false)
    }

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
        ServerAPI.addMarker({
          type: action,
          lngLat: data[data.length - 1].geometry.coordinates
        })  
        setIsMeAddedFeature(true)
        setAction("")
      }
      
      if (editType === 'addFeature') {
        if(action === "Layer") {
          ServerAPI.addLayer(data[data.length - 1])
        }
        setMode(null)
      }
    }

    const moveToEvent = (lngLat) => {
      const [lng, lat] = lngLat
      setMapViewport({
        height: "100vh",
        width: "100wh",
        longitude: lng, 
        latitude: lat,
        zoom: 14,
        maxZoom: 18,
        transitionInterpolator: new FlyToInterpolator({speed: 1.2}),
        transitionDuration: 'auto'
      })
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
      <Grid container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
      >
          <Grid item md={2} >
            <Drawer moveToEvent={moveToEvent} markers={markers}/> 
          </Grid>
          <Grid item md={10}>
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
              <Snackbar anchorOrigin={{vertical: "top", horizontal: "center"}} open={isNewFeature} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error">
                  שים לב! אירוע חדש נוסף
                </Alert>
              </Snackbar>
            </ReactMapGL>
            {
              selectedFeatureIndex !== null && selectedFeatureIndex >= 0 ? 
              <ControlPanel deletePoly={onDelete} poly={selectedFeature} /> 
              :
              null
            }
          </Grid>
      </Grid>
  )
}

export default Map