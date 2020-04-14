import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/auth'
import axios from 'axios';
import ItemList from '../components/ItemList';
import Loading from '../components/Loading';

const Search = () => {
  const value = useContext(AuthContext);
  const [data, setData] = useState(null);

  const getDataFromAPI = async () => {
    const requestUrl = process.env.REACT_APP_API_URL;
    const result = await axios.get(requestUrl);
    return result;
  }
  useEffect(() => {
    const result = getDataFromAPI?.().then(response => setData(response.data));
  }, [])
  return (
    <div>
      {
        !data
          ? <Loading
            text='Now Loading...'
          />
          : <ItemList
            data={data}
            setData={setData}
          />
      }
    </div>
  );
}

export default Search;
