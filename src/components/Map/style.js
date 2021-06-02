import {RENDER_STATE} from 'react-map-gl-draw';

export function getEditHandleStyle({feature, state}) {
  let styleEdit
  switch (state) {
    case RENDER_STATE.SELECTED:
    case RENDER_STATE.HOVERED:
    case RENDER_STATE.UNCOMMITTED:
      styleEdit = {
        fill: 'rgb(251, 176, 59)',
        fillOpacity: 0.1,
        stroke: 'rgb(255, 255, 255)',
        strokeWidth: 2,
        r: 7
      }
      break
      
      default:
        styleEdit = {
          fill: 'rgb(251, 176, 59)',
          fillOpacity: 1,
          stroke: 'rgb(255, 255, 255)',
          strokeWidth: 2,
          r: 7
        }
        break
  }
  return styleEdit
}
    
export function getFeatureStyle({feature, index, state}) {
  let style
  switch (state) {
    // case RENDER_STATE.HOVERED:
    case RENDER_STATE.SELECTED:
    case RENDER_STATE.UNCOMMITTED:
    case RENDER_STATE.CLOSING:
      style = {
        stroke: 'rgb(251, 176, 59)',
        strokeWidth: 2,
        fill: 'rgb(251, 176, 59)',
        fillOpacity: 0.3,
        strokeDasharray: '4,2'
      }
      break

    default:
      style = {
        stroke: 'rgb(60, 178, 208)',
        strokeWidth: 2,
        fill: 'rgb(60, 178, 208)',
        fillOpacity: 0
      }
      break
  }
  return style
}