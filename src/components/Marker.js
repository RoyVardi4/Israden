import { Typography } from "@material-ui/core"
import { withStyles } from '@material-ui/core/styles'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import React, { Fragment, useEffect, useState } from "react"
import { Marker, Popup } from "react-map-gl"

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(2),
      top: theme.spacing(1),
      color: theme.palette.grey[750],
    },
  })
  
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    )
  })
  

const Markers = ({markers}) => {
    const [markerIdPopup, setMarkerIdPopup] = useState()

    const handleClose = () => setMarkerIdPopup(null)

    return (
        <Fragment>
        {markers.map((marker, index) => (
            <div key={index}>
                    <Marker
                        offsetTop={-48}
                        offsetLeft={-24}
                        latitude={marker[1]}
                        longitude={marker[0]}
                    >
                        <img 
                            src="https://img.icons8.com/color/48/000000/marker.png"
                            onClick={() => setMarkerIdPopup(index)}
                        />
                    </Marker>
                    {   markerIdPopup === index ?
                        <Popup
                            styles="absolute"
                            closeButton={false}
                            offsetTop={-48}
                            offsetLeft={0}
                            latitude={marker[1]}
                            longitude={marker[0]}
                        >
                            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                <Typography variant="h6">Marker number {markerIdPopup}</Typography>
                            </DialogTitle>
                        </Popup> :
                        null
                    }
            </div>
        ))}
        </Fragment>
    )
}

export default Markers

