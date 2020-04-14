import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
  root: {
    width: '100vw',
  },
});

const Footer = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <div style={{ flex: 0 }}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          label="Home"
          icon={<RestoreIcon />}
          component={Link}
          to='/'
        />
        <BottomNavigationAction
          label="Tour"
          icon={<FavoriteIcon />}
          component={Link}
          to='/tour'
        />
        <BottomNavigationAction
          label="Find"
          icon={<LocationOnIcon />}
          component={Link}
          to='/search'
        />
      </BottomNavigation>
    </div>
  );
}

export default Footer;