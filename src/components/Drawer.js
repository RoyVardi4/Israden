import React from 'react'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader';
import {GiPistolGun, GiMedicines} from 'react-icons/gi'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Paper } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  card: {
    marginTop: "10px",
    marginLeft: "5px",
    marginRight: "5px"
  } 
}))

const CustomDrawer = ({markers, moveToEvent}) => {
    const classes = useStyles()
    return (
      <Paper style={{maxHeight: "87vh", backgroundColor:"#F5F5F5", overflow: 'auto'}}>
        <List subheader={<ListSubheader style={{backgroundColor: "#d62828", color: "white"}}>
                            Last 24 hours events
                         </ListSubheader>}
        >
          {markers.map((marker, index) => (
            <Card elevation={5} className={classes.card} key={index}>
              <ListItem button 
                        onClick={() => moveToEvent(marker.lngLat)}
              >
                  <ListItemIcon>{marker.type === "Guns" ? 
                                <GiPistolGun size={25}/> : 
                                <GiMedicines size={25}/>}
                  </ListItemIcon>
                  <ListItemText 
                    primary={marker.type} 
                    secondary={`${new Date(marker.date).toLocaleDateString("he-IL")}
                                ${new Date(marker.date).toLocaleTimeString("he-IL")}`}
                  />
                </ListItem>
              </Card>
          ))}
        </List>
      </Paper>
    )
}

export default CustomDrawer