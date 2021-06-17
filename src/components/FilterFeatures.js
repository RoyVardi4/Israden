import React, {useState} from 'react'
import Drawer from '@material-ui/core/Drawer'
import { Checkbox } from '@material-ui/core'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const FilterDrawer = ({filterData, onChangeFilterData}) => {

    const [state, setState] = useState({
        guns: filterData.guns,
        drugs: filterData.drugs
    })
    
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }

        onChangeFilterData({
            isOpen: false,
            guns: guns,
            drugs: drugs
        })
    }

    const {guns, drugs} = state

    return (
        <Drawer anchor='left' open={filterData.isOpen} onClose={toggleDrawer(false)}>
            <div style={{margin: "20px"}}>
                <h4>
                    This is a Filter Component
                </h4>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={guns} onChange={handleChange} name="guns"/>}
                        label="Guns"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={drugs} onChange={handleChange} name="drugs"/>}
                        label="Drugs"
                    />
                </FormGroup>
            </div>
            
            

        </Drawer>
    )
}

export default FilterDrawer