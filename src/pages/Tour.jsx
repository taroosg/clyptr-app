import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth'
import axios from 'axios';
import Map from '../components/Map';
import { useLoadScript, StreetViewService } from '@react-google-maps/api';
import Loading from '../components/Loading';

import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';

const Tour = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
  })
  const [position, setPosition] = useState(null);
  const [svs, setSvs] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ランダム座標生成
  const generateRndomLatLng = () => {
    const latArray = [...new Array(180).keys()].map(x => x - 90)
    const lngArray = [...new Array(360).keys()].map(x => x - 180)
    return {
      lat: latArray[~~(Math.random() * latArray.length + 1)] + Math.random(),
      lng: lngArray[~~(Math.random() * lngArray.length + 1)] + Math.random(),
    };
  }

  // ストリートビューを探して見つけたらstateに保存
  const serchStreetView = streetViewService => {
    setPosition(null);
    setSvs(streetViewService);
    const randomLatlng = generateRndomLatLng();
    streetViewService.getPanoramaByLocation(randomLatlng, 5000, (result, status) => {
      if (status === 'OK') {
        //ストリートビューがあれば座標を設定
        setPosition(result.location.latLng);
      } else {
        // なければやり直し
        serchStreetView(streetViewService);
      }
    })
  }

  // 座標保存
  const savePosition = async position => {
    const inputText = prompt("Input Title!");
    if (inputText === null || inputText === '') {
      return false
    } else {
      setIsLoading(true);
      const requestUrl = process.env.REACT_APP_API_URL;
      const postdata = {
        user: value.currentUser.uid,
        position: position,
        title: inputText,
      }
      const result = await axios.post(requestUrl, postdata);
      alert('Saved Successfly!');
      setIsLoading(false);
    }
  }

  // ユーザ
  const value = useContext(AuthContext);

  // ボタンcss
  const fabStyle = {
    margin: '0 15%',
    zIndex: 50,
  }

  const buttonContainerStyle = {
    position: 'absolute',
    bottom: '5%',
    display: 'flex',
    justifyContent: 'center',
    width: '100vw',
  }

  return (
    <div style={{ height: '100%' }}>
      {/* <p onClick={() => serchStreetView(svs)}>Tour</p> */}
      {/* <p>{value.currentUser.uid}</p> */}
      {
        isLoaded
          ?
          <StreetViewService
            onLoad={serchStreetView}
          />
          : <Loading
            text='Now Loading...'
          />
      }
      {
        !position
          ? <Loading
            text='Now Loading...'
          />
          :
          <div style={{ height: '100%', position: 'relative' }}>
            <Map
              latlng={position}
              height={'100%'}
            />
            <div style={buttonContainerStyle}>
              <Fab
                size="medium"
                color="secondary"
                aria-label="takeoff"
                style={fabStyle}
                onClick={() => window.confirm('Go to next??') ? serchStreetView(svs) : false}
              >
                <FlightTakeoffIcon />
              </Fab>
              <Fab
                size="medium"
                color="secondary"
                aria-label="save"
                style={fabStyle}
                onClick={() => savePosition(position)}
              >
                <SaveIcon />
              </Fab>
            </div>
          </div>
      }
      {
        !isLoading
          ? ''
          : <Loading
            text='Now Loading...'
          />
      }
    </div>
  );
}

export default Tour;
