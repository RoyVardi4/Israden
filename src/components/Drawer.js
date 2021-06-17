import React from 'react'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText'
import {GiPistolGun, GiMedicines} from 'react-icons/gi'
import { makeStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core';
import {ImFilter} from 'react-icons/im'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "10px",
    marginLeft: "5px",
    marginRight: "5px"
  },
}))

const CustomDrawer = ({markers, moveToEvent, openFilter}) => {
    const classes = useStyles()
    return (
      <Card style={{maxHeight: "87vh", backgroundColor:"#F5F5F5", overflow: 'auto'}}>     
        <List>
          <ListSubheader>
            <CardContent>
              <Typography variant="h8" component="h2">Last 24 hours events</Typography>
            </CardContent>
            <CardActions>
              <Button onClick={openFilter} startIcon={<ImFilter/>} size="small" color="primary"/>
            </CardActions>
          </ListSubheader>
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
      </Card>
    )
}

export default CustomDrawer