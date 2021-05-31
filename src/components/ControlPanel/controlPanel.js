import React from 'react'
import area from '@turf/area'
import './controlPanel.css'

const ControlPanel = ({poly, deletePoly}) => {
  const polygon = poly
  const polygonArea = polygon && area(polygon);
  return (
    <div className="control-panel">
      <h3>Draw Polygon</h3>
      {polygon && (
        <p>
          {polygonArea} <br />
          square meters
        </p>
      )}
      <button onClick={deletePoly}>Delete</button>
    </div>
  );
}

export default React.memo(ControlPanel);