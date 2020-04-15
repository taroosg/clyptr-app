import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton'

const Mymenu = props => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  // const { data } = props;
  return (
    <React.Fragment>
      <IconButton
        aria-label={`info about ${props.x.data.title}`}
        className={props.classes.icon}
        onClick={handleClick}
      >
        <EditIcon />
      </IconButton>
      <Menu
        id="card-actions-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            const inputText = prompt("Input new title!", props.x.data.title);
            if (inputText !== null && inputText !== '') {
              console.log(inputText)
              props.requestUpdate(props.index, props.x.id, inputText)
            }
            handleClose();
          }}
        >
          Edit
    </MenuItem>
        <MenuItem
          onClick={() => {
            if (window.confirm('Delete item??')) {
              props.deleteData(props.index, props.x.id)
            }
            handleClose();
          }}
        >
          Delete
    </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default Mymenu;