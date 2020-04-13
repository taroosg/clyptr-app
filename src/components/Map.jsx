import React, { useState } from 'react'
import { GoogleMap, useLoadScript, Marker, StreetViewPanorama } from '@react-google-maps/api'

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
    // zoomControlOptions: {
    //   position: { "lat": 62.92881612345276, "lng": 30.608949216535166 },
    //   // ...otherOptions
    // }
  }

  const streetViewOptions = {
    motionTracking: true,
    motionTrackingControl: true,
    enableCloseButton: false,
    linksControl: false,
    panControl: false,
    fullscreenControl: false,
  }

  const [zIndex, setZIndex] = useState(1);
  const [isStreetView, setIsStreetView] = useState(true);

  const renderMap = () => {

    const mapStyle = {
      width: '100vw',
      height: '70vh',
    };

    const buttonStyle = {
      width: '50vw',
      height: '10vh',
    }
    // const onLoad = useCallback(
    //    mapInstance=> {
    //     // do something with map Instance
    //   }
    // )
    return (
      <div>
        <GoogleMap
          mapContainerStyle={mapStyle}
          options={mapOptions}
        // onLoad={onLoad}
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
        <div>
          <button
            type='button'
            style={buttonStyle}
            onClick={() => StreetViewPanorama()}
          >
            保存
            </button>
          <button
            type='button'
            style={buttonStyle}
            // onClick={() => zIndex === 1 ? setZIndex(-1) : setZIndex(1)}
            onClick={() => isStreetView ? setIsStreetView(false) : setIsStreetView(true)}
          >
            切り替え
            </button>
        </div>
      </div>
    )
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : <p>loading...</p>
}

export default Map;