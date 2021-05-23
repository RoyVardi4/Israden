// import React, { useRef, useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import Marker from './components/Marker';
// import mapboxgl from 'mapbox-gl';
// import MapboxGLSpeedDialControl from './components/SpeedDialLayer'

// import './App.css';


// mapboxgl.accessToken = "pk.eyJ1Ijoicm95dmFyZGk0IiwiYSI6ImNraWRqYWVvYzA1dmgyc282YTg0aW16NGkifQ.7jEGmT-pezL7_nbkY186Dw";

import Map from './components/Map/Map'
const App = () => {
  return <Map/>
  // const mapContainerRef = useRef(null);

  // // initialize map when component mounts
  // useEffect(() => {
  //   const map = new mapboxgl.Map({
  //     container: mapContainerRef.current,
  //     // See style options here: https://docs.mapbox.com/api/maps/#styles
  //     style: 'mapbox://styles/mapbox/satellite-streets-v11',
  //     center: [34.798983937307526, 31.99309730831267],
  //     zoom: 7,
  //   });

  //   map.on('click', async (e) => {      
  //     // create marker node
  //     const markerNode = document.createElement('div');
  //     ReactDOM.render(<Marker id="marker" />, markerNode);
      
  //     // add marker to map
  //     new mapboxgl.Marker({
  //       draggable: true
  //     })
  //       .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>")) 
  //       // .setLngLat(geometry.coordinates)
  //       .setLngLat(e.lngLat)
  //       .addTo(map);
  //   })

  //   const ctrlSpeedDial = new MapboxGLSpeedDialControl();
  //   map.addControl(ctrlSpeedDial, 'bottom-left')

  //   // add navigation control (the +/- zoom buttons)
  //   map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

  //   // clean up on unmount
  //   return () => map.remove();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // return <div className="map-container" ref={mapContainerRef} />
};

export default App;