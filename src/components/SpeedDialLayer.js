import SpeedDial from './SpeedDial'
import ReactDOM from 'react-dom';
class MapboxGLSpeedDialControl {

    constructor(setMarkerType) {
      this._setMarkerType = setMarkerType 
    }
  
    onAdd(map) {
      this._container = document.createElement("div");
      ReactDOM.render(<SpeedDial setMarkerType={this._setMarkerType}/>, this._container);
      return this._container;
    }
  
    onRemove(map) {
      // map.parentNode.removeChild(this._container);
      // this._map = undefined;
    }
  }

  export default MapboxGLSpeedDialControl