import React from 'react'
import Drawer from '@material-ui/core/Drawer';

const FilterDrawer = ({filterData, onChangeFilterData}) => {

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }

        onChangeFilterData({isOpen: false})

    }
    return (
        <Drawer anchor='left' open={filterData.isOpen} onClose={toggleDrawer(false)}>
            <h4 style={{marginTop: "30px", marginLeft: "20px", marginRight: "20px"}}>
                This is a Filter Component
            </h4>
        </Drawer>
    )
}

export default FilterDrawer