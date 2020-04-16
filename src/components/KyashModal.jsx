import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import KyashImg from '../img/kyash.png';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    width: '95vw',
    maxWidth: '350px',
    height: '80vh',
    maxHeight: '400px',
  },
}));

const KyashModal = props => {
  const classes = useStyles();

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.modalOpen}
        onClose={props.handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.modalOpen}>
          <Box
            className={classes.paper}
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Typography
              variant="h5"
              component="p"
              color="primary"
              align="center"
            >
              Tap or Scan QR code!
            </Typography>
            <a href="https://kyash.me/payments/xA2VO39dEFg6DQhKfFQQJhxshcba" target="_blank" rel="noopener noreferrer">
              <img src={KyashImg} alt="kyash link" />
            </a>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

export default KyashModal;