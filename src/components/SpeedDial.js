import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import EditIcon from '@material-ui/icons/Edit';
import {GiPistolGun, GiMedicines} from 'react-icons/gi'

const useStyles = makeStyles((theme) => ({
  root: {
    // height: 380,
    // transform: 'translateZ(0px)',
    // flexGrow: 1,
  },
  speedDial: {
    position: 'absolute',
    top: theme.spacing(4),
    right: theme.spacing(4),
  },
}));



export default function OpenIconSpeedDial({handleChangeAction}) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)

  const handleClick = (Action) => {
    handleChangeAction(Action)
    handleClose()
  }

  const actions = [
    { icon: <GiPistolGun size={30}/>, name: 'Guns', eventHandler: () => handleClick("Guns") },
    { icon: <GiMedicines size={30} />, name: 'Drugs', eventHandler: () => handleClick("Drugs") },
  ];

  // const handleVisibility = () => {
  //   setHidden((prevHidden) => !prevHidden);
  // };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        hidden={hidden}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="down"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.eventHandler}
          />
        ))}
      </SpeedDial>
    </div>
  );
}