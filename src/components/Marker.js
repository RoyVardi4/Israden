import React, { Fragment, useState } from "react"
import { makeStyles } from '@material-ui/core/styles'
import { Marker, Popup } from "react-map-gl"
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import MarkerIcon from '@material-ui/icons/Room'

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 1000,
    // maxHeight: 100
  },
}))

const Markers = ({markers}) => {
    const classes = useStyles()
    const [markerIdPopup, setMarkerIdPopup] = useState()

    const handleClose = () => setMarkerIdPopup(null)
    
    const pinStyleGuns = {
      fill: '#d00',
    }
    const pinStyleDrugs = {
      fill: '#d09',
    }
    const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
                  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
                  C20.1,15.8,20.2,15.8,20.2,15.7z`

    return (
        <Fragment>
        {markers.map((marker, index) => (
            <div key={index}>
                    <Marker
                        offsetTop={-20}
                        offsetLeft={-10}
                        latitude={marker.lngLat[1]}
                        longitude={marker.lngLat[0]}
                    >
                      <svg onClick={() => setMarkerIdPopup(index)} height={20} viewBox="0 0 24 24" style={marker.type === "Guns" ? pinStyleGuns : pinStyleDrugs}>
                        <path d={ICON} />
                      </svg>
                      {/* <MarkerIcon  style={{ color: "green" }}/> */}
                        {/* <img 
                            src={marker.type === "Guns" ? "https://img.icons8.com/color/48/000000/marker.png" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOv4nhjHu-MeGF8HtqmCbY0suKjAyFqIiZPg&usqp=CAU"}
                            alt="marker"
                            onClick={() => setMarkerIdPopup(index)}
                        /> */}
                    </Marker>
                    {   markerIdPopup === index ?
                        <Popup
                            closeButton={false}
                            offsetTop={-25}
                            offsetLeft={0}
                            latitude={marker.lngLat[1]}
                            longitude={marker.lngLat[0]}
                        >
                          <Card elevation={6} className={classes.root}>
                            <CardHeader
                              action={
                                <IconButton onClick={handleClose} aria-label="settings">
                                  <CloseIcon/>
                                </IconButton>
                              }
                              subheader={marker.type}
                            />
                          </Card>
                        </Popup> :
                        null
                    }
            </div>
        ))}
        </Fragment>
    )
}

export default Markers

