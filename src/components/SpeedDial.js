import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import EditIcon from '@material-ui/icons/Edit'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import {GiPistolGun, GiMedicines} from 'react-icons/gi'

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'absolute',
    top: theme.spacing(4),
    right: theme.spacing(4),
  },
  action: {
    // backgroundColor: "red"
  }
}))

export default function OpenIconSpeedDial({handleChangeAction, isSpeedDialOpen, setIsSpeedDialOpen}) {
  const classes = useStyles()

  const [open, setOpen] = [isSpeedDialOpen, setIsSpeedDialOpen]

  const handleClick = (Action) => {
    handleChangeAction(Action)
    // handleClose()
  }

  const actions = [
    { icon: <GiPistolGun size={30}/>, name: 'Guns', eventHandler: () => handleClick("Guns") },
    { icon: <GiMedicines size={30} />, name: 'Drugs', eventHandler: () => handleClick("Drugs") },
    { icon: <EditIcon size={30} />, name: 'Add Layer', eventHandler: () => handleClick("Layer")},

  ]
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <SpeedDial
        ariaLabel="Event SpeedDial"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="down"
      >
        {actions.map((action) => (
          <SpeedDialAction
            className={classes.action}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.eventHandler}
          />
        ))}
      </SpeedDial>
  );
}