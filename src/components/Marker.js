import React, { Fragment, useState } from "react"
import { makeStyles } from '@material-ui/core/styles'
import { Marker, Popup } from "react-map-gl"
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'

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

    console.log(markers)
    return (
        <Fragment>
        {markers.map((marker, index) => (
            <div key={index}>
                    <Marker
                        offsetTop={-48}
                        offsetLeft={-24}
                        latitude={marker.lngLat[1]}
                        longitude={marker.lngLat[0]}
                    >
                        <img 
                            src="https://img.icons8.com/color/48/000000/marker.png"
                            alt="marker"
                            onClick={() => setMarkerIdPopup(index)}
                        />
                    </Marker>
                    {   markerIdPopup === index ?
                        <Popup
                            closeButton={false}
                            offsetTop={-48}
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

