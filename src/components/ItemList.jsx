import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth';
import axios from 'axios';
import Loading from './Loading';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import Icon from '@material-ui/core/Icon';
import MapModal from './MapModal';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [requestPosition, setRequestPosition] = useState(false);

  const handleModalOpen = position => {
    setRequestPosition(position)
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

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


  const deleteData = async (index, docId) => {
    setIsLoading(true);
    const requestUrl = process.env.REACT_APP_API_URL;
    const result = await axios.delete(`${requestUrl}/${docId}`);
    const newDataArray = [...props.data].filter((x, i) => i !== index);
    props.setData(newDataArray);
    alert('Deleted Successfly!');
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
                  // actionIcon={
                  //   <IconButton aria-label={`info about ${x.data.title}`} className={classes.icon}>
                  //     <EditIcon />
                  //   </IconButton>
                  // }
                  />
                </GridListTile>
            }
            {props.data?.map((x, index) => (
              <GridListTile cols={1} key={index} style={{ height: 300 }} >
                <img
                  src={`https://maps.googleapis.com/maps/api/streetview?size=640x640&location=${x.data.position.lat},${x.data.position.lng}&key=${process.env.REACT_APP_MAP_API_KEY}`}
                  alt={x.data.title}
                  onClick={() => { handleModalOpen(x.data.position) }}
                />
                <GridListTileBar
                  title={x.data.title}
                  subtitle={<span>by: {x.data.user}</span>}
                  actionIcon={
                    x.data.user !== value.currentUser.uid
                      ? ''
                      :
                      <div>
                        <IconButton
                          aria-label={`info about ${x.data.title}`}
                          className={classes.icon}
                          onClick={e => {
                            const inputText = prompt("Input New Title!", x.data.title);
                            if (inputText === null || inputText === '') {
                              return false
                            } else {
                              console.log(inputText)
                              requestUpdate(index, x.id, inputText)
                            }
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label={`info about ${x.data.title}`}
                          className={classes.icon}
                          onClick={() => window.confirm('Delete Item??') ? deleteData(index, x.id) : false}
                        >
                          <ClearIcon />
                        </IconButton>
                      </div>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>








        // <ul>
        //   {props.data?.map((x, index) =>
        //     <li key={index}>
        //       <ul>
        //         <li onClick={() => {
        //           const inputText = prompt("Input New Title!", x.data.title);
        //           if (inputText === null || inputText === '') {
        //             return false
        //           } else {
        //             console.log(inputText)
        //             requestUpdate(index, x.id, inputText)
        //           }
        //         }
        //         }>edit</li>
        //         <li onClick={() => window.confirm('Delete Item??') ? deleteData(index, x.id) : false}>
        //           delete
        //         </li>
        //         <li>{x.data.user}</li>
        //         <li>{x.id}</li>
        //         <li>{x.data.timestamp._seconds}</li>
        //         <li>{x.data.title}</li>
        //         {/* <li>{JSON.stringify(x.data.position)}</li> */}
        //         <li><img src={`https://maps.googleapis.com/maps/api/streetview?size=640x640&location=${x.data.position.lat},${x.data.position.lng}&key=AIzaSyA1Xd3oiuXW_0dQxAi46m1GBzqnDnw8Xvo`} alt="" /></li>
        //         <li>{x.data.address}</li>
        //       </ul>
        //     </li>
        //   )}
        // </ul>
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
