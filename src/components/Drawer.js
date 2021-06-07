import React from 'react'

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader';
import {GiPistolGun, GiMedicines} from 'react-icons/gi'

const CustomDrawer = ({markers, moveToEvent}) => {

    return (
        <Drawer
          variant="permanent"
        >
          <Divider />
          <List subheader={<ListSubheader>Last events</ListSubheader>}>
            {markers.map((marker, index) => (
              <ListItem button 
                        onClick={() => moveToEvent(marker.lngLat)}
                        key={index}>
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
            ))}
          </List>
          <Divider />
        </Drawer>
    )
}

export default CustomDrawer