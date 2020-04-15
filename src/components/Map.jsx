import React, { useState } from 'react'
import { GoogleMap, useLoadScript, Marker, StreetViewPanorama } from '@react-google-maps/api'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

import MapIcon from '@material-ui/icons/Map';
import StreetviewIcon from '@material-ui/icons/Streetview';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


const Map = props => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
  })

  const mapOptions = {
    // center: { "lat": 43.9332315, "lng": 39.91355580000004 },
    center: props.latlng,
    zoom: 6,
    mapTypeId: 'terrain',
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    scaleControl: true,
  }

  const streetViewOptions = {
    motionTracking: true,
    motionTrackingControl: true,
    enableCloseButton: false,
    linksControl: false,
    panControlOptions: false,
    fullscreenControl: false,
    zoomControl: false,
    zoom: 0,
    showRoadLabels: false,
    clickToGo: false,
    addressControl: false,
    addressControlOptions: false,
  }

  const [isStreetView, setIsStreetView] = useState(true);

  const renderMap = () => {

    const containerStyle = {
      height: props.height,
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
    }

    const mapStyle = {
      width: '100%',
      height: '100%',
    };

    const buttonStyle = {
      position: 'absolute',
      bottom: '5%',
      zIndex: 100,
    }

    return (
      <div style={containerStyle}>
        <GoogleMap
          mapContainerStyle={mapStyle}
          options={mapOptions}
        >
          <Marker
            position={mapOptions.center}
          />
          <StreetViewPanorama
            position={mapOptions.center}
            visible={isStreetView}
            options={streetViewOptions}
          />
        </GoogleMap>
        <Fab
          color="primary"
          aria-label="add"
          style={buttonStyle}
          onClick={() => isStreetView ? setIsStreetView(false) : setIsStreetView(true)}
        >
          {isStreetView
            ? <MapIcon />
            : <StreetviewIcon />
          }
        </Fab>
        {/* <div>
          <button
            type='button'
            style={buttonStyle}
            onClick={() => isStreetView ? setIsStreetView(false) : setIsStreetView(true)}
          >
            切り替え
            </button>
        </div> */}
      </div>
    )
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : <p>loading...</p>
}

export default Map;