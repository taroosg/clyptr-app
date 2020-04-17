import React from 'react';
import firebase from '../firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    // firebase.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
}
const defaultProps = {
  // bgcolor: 'background.paper',
  m: 1,
  style: {
    width: '100vw',
    // height: '5rem',
    margin: 0,
  },
  borderColor: 'text.primary',
};

const Signin = props => {
  return (
    <Box
      {...defaultProps}
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      alignItems="center"
      height="100vh"
    >
      <Box
      >
        <Box
          {...defaultProps}
          borderColor="primary.main"
          textAlign="center"
        >
          <Typography
            variant="h2"
            component="h1"
            color="primary"
            borderBottom={1}
          // gutterBottom
          >
            CLYPTR
      </Typography>
          <Typography
            variant="h4"
            component="h2"
            color="primary"
            gutterBottom
          >
            - Clip Cryptic Tour -
      </Typography>
        </Box>
      </Box>
      <Box
        textAlign="center"
      >
        <Typography
          variant="h5"
          component="p"
          color="primary"
          gutterBottom
        >
          Let's Sign in with ...
      </Typography>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </Box>
    </Box>
  );
}

export default Signin;
