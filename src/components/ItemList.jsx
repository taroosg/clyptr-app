import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/auth';
import axios from 'axios';
import Loading from './Loading';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import MapModal from './MapModal';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Mymenu from './Mymenu';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const useStyles = makeStyles((theme) => ({
  root: {
    // height: '85vh',
    width: '100vw',
    // maxWidth: 1280,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  gridList: {
    width: '100%',
    height: '100%',
    // maxWidth: 1024,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  activeIcon: {
    color: '#F39800',
  },
}));


const ItemList = props => {

  const classes = useStyles();

  const getGridListCols = () => {
    if (isWidthUp('xl', props.width)) {
      return 6;
    }
    if (isWidthUp('lg', props.width)) {
      return 4;
    }
    if (isWidthUp('md', props.width)) {
      return 3;
    }
    if (isWidthUp('sm', props.width)) {
      return 2;
    }
    return 1;
  }

  const value = useContext(AuthContext);
  // value.currentUser.uid
  // console.log(value)
  const [isLoading, setIsLoading] = useState(false);
  const [requestPosition, setRequestPosition] = useState(null);

  // モーダル管理
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = position => {
    setRequestPosition(position)
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // データ更新関数
  const requestUpdate = async (index, docId, newData) => {
    setIsLoading(true);
    const requestUrl = process.env.REACT_APP_API_URL;
    const result = await axios.put(`${requestUrl}/${docId}`, { title: newData });
    const newDataArray = [...props.data]
    newDataArray[index] = {
      ...newDataArray[index],
      ...{ data: result.data.data },
    }
    props.setData(newDataArray);
    alert('Updated Successfly!');
    setIsLoading(false);
  }

  // データ削除関数
  const deleteData = async (index, docId) => {
    setIsLoading(true);
    const requestUrl = process.env.REACT_APP_API_URL;
    const result = await axios.delete(`${requestUrl}/${docId}`);
    const newDataArray = [...props.data].filter((x, i) => i !== index);
    props.setData(newDataArray);
    alert('Deleted Successfly!');
    setIsLoading(false);
  }

  // フォロー処理関連
  // フォローリスト取得関数
  const [followList, setFollowList] = useState([]);
  const getFollowListFromApi = async uid => {
    const requestUrl = process.env.REACT_APP_API_URL;
    const result = await axios.get(`${requestUrl}/followlist/${uid}`);
    setFollowList(result.data)
  }
  useEffect(() => {
    const result = getFollowListFromApi(value.currentUser.uid);
  }, [])

  // フォローリクエスト
  const requestFollow = async userId => {
    setIsLoading(true);
    const users = {
      follow: value.currentUser.uid,
      follower: userId
    }
    const requestUrl = process.env.REACT_APP_API_URL;
    const result = await axios.post(`${requestUrl}/follow/`, users);
    setFollowList([...followList, userId]);
    setIsLoading(false);
  }

  // アンフォローリクエスト
  const requestUnfollow = async userId => {
    setIsLoading(true);
    const users = {
      follow: value.currentUser.uid,
      follower: userId
    }
    const requestUrl = process.env.REACT_APP_API_URL;
    const result = await axios.post(`${requestUrl}/unfollow/`, users);
    setFollowList([...followList].filter(x => x !== userId));
    setIsLoading(false);
  }

  return (
    <div>
      {
        props.data
        &&
        <div className={classes.root}>
          <GridList cellHeight={200} cols={getGridListCols()} className={classes.gridList}>
            {
              !props.mypage
                ? ''
                : <GridListTile key="Subheader" cols={getGridListCols()} style={{ height: 200 }}>
                  <img
                    style={{
                      objectFit: 'contain',
                      width: '100%',
                      height: '100%',
                    }}
                    src={`${value.currentUser.photoURL}`}
                    alt="profile_img"
                  />
                  <GridListTileBar
                    title={`Name:${value.currentUser.displayName}`}
                    subtitle={<span>iD: {value.currentUser.uid}</span>}
                  />
                </GridListTile>
            }
            {props.data?.map((x, index) => (
              <GridListTile cols={1} key={index} style={{ height: 300 }} >
                {/* <img
                    src={`https://maps.googleapis.com/maps/api/streetview?size=640x640&location=${x.data.position.lat},${x.data.position.lng}&key=${process.env.REACT_APP_MAP_API_KEY}`}
                    alt={x.data.title}
                    onClick={() => { handleModalOpen(x.data.position) }}
                  /> */}
                <LazyLoadImage
                  src={`https://maps.googleapis.com/maps/api/streetview?size=600x600&location=${x.data.position.lat},${x.data.position.lng}&key=${process.env.REACT_APP_MAP_API_KEY}`}
                  alt={x.data.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  onClick={() => { handleModalOpen(x.data.position) }}
                />
                <GridListTileBar
                  title={x.data.title}
                  subtitle={<span>by: {x.data.user}</span>}
                  actionIcon={
                    x.data.user !== value.currentUser.uid
                      ? followList.includes?.(x.data.user)
                        ? <IconButton
                          className={classes.activeIcon}
                          onClick={() => window.confirm('Unfollow this user??') ? requestUnfollow(x.data.user) : false}
                        >
                          <StarRoundedIcon />
                        </IconButton>
                        : <IconButton
                          className={classes.icon}
                          onClick={() => window.confirm('Follow this user??') ? requestFollow(x.data.user) : false}
                        >
                          <StarBorderRoundedIcon />
                        </IconButton>
                      :
                      <Mymenu
                        classes={classes}
                        x={x}
                        index={index}
                        requestUpdate={requestUpdate}
                        deleteData={deleteData}
                      />
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      }
      <MapModal
        modalOpen={modalOpen}
        handleModalOpen={handleModalOpen}
        handleModalClose={handleModalClose}
        requestPosition={requestPosition}
      />
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

export default withWidth()(ItemList);
