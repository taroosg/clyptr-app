import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth'
import Map from '../components/Map';
import LoadingOverlay from 'react-loading-overlay';
import { GoogleMap, useLoadScript, StreetViewService } from '@react-google-maps/api';


const Tour = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
  })
  const [position, setPosition] = useState(null)
  const [svs, setSvs] = useState(null);

  const latArray = [...new Array(180).keys()].map(x => x - 90)
  const lngArray = [...new Array(360).keys()].map(x => x - 180)

  const generateRndomLatLng = () => {
    return {
      lat: latArray[~~Math.floor(Math.random() * latArray.length + 1)] + Math.random(),
      lng: lngArray[~~Math.floor(Math.random() * lngArray.length + 1)] + Math.random(),
    };
  }



  const serchStreetView = streetViewService => {
    setPosition(null);
    setSvs(streetViewService);
    const randomLatlng = generateRndomLatLng();
    // const svs = new google.maps.StreetViewService();
    streetViewService.getPanoramaByLocation(randomLatlng, 5000, (result, status) => {
      console.log(result)
      // setResult({ result: result, status: status })
      if (status === 'OK') {
        //ストリートビューがあれば座標を設定
        setPosition(result.location.latLng);
        console.log('done');
      } else {
        // なければやり直し
        console.log('ng');
        serchStreetView(streetViewService);
      }
    })
  }
  // serchStreetView();





  const value = useContext(AuthContext);
  return (
    <div>
      <p onClick={() => serchStreetView(svs)}>Tour</p>
      {/* <p>{value.currentUser.uid}</p> */}
      {
        isLoaded
          ?
          <StreetViewService
            onLoad={serchStreetView}
          />
          : <p>loading...</p>
      }
      {
        !position
          ? <LoadingOverlay
            active={true}
            spinner
            text='Loading...'
          />
          : <Map
            latlng={position}
          />
      }
    </div>
  );
}

export default Tour;
