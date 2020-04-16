import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import KyashModal from '../components/KyashModal';

const defaultProps = {
  m: 1,
  style: {
    width: '100vw',
    margin: 0,
  },
  borderColor: 'text.primary',
};

const Coffee = props => {
  const coffeeButtonStyle = {
    width: '180px',
  }

  // モーダル管理
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Box
      {...defaultProps}
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      alignItems="center"
      height="100%"
    >
      <Box
      >
        <Box
          {...defaultProps}
          borderColor="primary.main"
          textAlign="center"
          height="50%"
        >
          <Typography
            variant="h4"
            component="h2"
            color="primary"
            gutterBottom
          >
            if you enjoyed,
      </Typography>
          <Typography
            variant="h4"
            component="h2"
            color="primary"
            gutterBottom
          >
            buy me a <span role="img" aria-label="coffee">☕</span>...??
      </Typography>
        </Box>
      </Box>
      <Box
        textAlign="center"
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        height="25vh"
      >
        <a href="https://www.buymeacoffee.com/Bt1hreN" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style={coffeeButtonStyle} />
        </a>
        <Button
          variant="outlined"
          color="primary"
          width="180px"
          onClick={handleModalOpen}
        >
          Or via Kyash
      </Button>
      </Box>
      <KyashModal
        modalOpen={modalOpen}
        handleModalOpen={handleModalOpen}
        handleModalClose={handleModalClose}
      />
    </Box>
  );
}

export default Coffee;
