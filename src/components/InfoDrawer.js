import React from 'react'
import Drawer from '@material-ui/core/Drawer';

const InfoDrawer = ({isOpen, closeDrawer}) => {

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }

        closeDrawer()
    }
    return (
        <Drawer anchor='right' open={isOpen} onClose={toggleDrawer(false)}>
            <h4 style={{marginTop: "30px", marginLeft: "20px", marginRight: "20px"}}>
                This is more info about marker
            </h4>
        </Drawer>
    )
}

export default InfoDrawer