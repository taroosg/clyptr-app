import React from 'react';
import LoadingOverlay from 'react-loading-overlay';

const Loading = props => {
  return (
    <LoadingOverlay
      active={true}
      spinner
      text={props.text}
      styles={{
        wrapper: (base) => ({
          ...base,
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: '0',
          left: '0',
          zIndex: '10000',
        }),
        // overlay: (base) => ({
        //   ...base,
        //   width: '100vw',
        //   height: '100vh',
        //   top: '0',
        //   left: '0',
        // })
      }}
    />
  )
}

export default Loading;