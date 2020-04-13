import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/auth'
import axios from 'axios';
import ItemList from '../components/ItemList';

const Search = () => {
  const value = useContext(AuthContext);
  const [data, setData] = useState(null);

  const getDataFromAPI = async () => {
    const requestUrl = process.env.REACT_APP_API_URL;
    const result = await axios.get(requestUrl);
    return result;
  }
  useEffect(() => {
    const result = getDataFromAPI?.().then(response => setData(response));
  }, [])
  return (
    <div>
      <p>Search</p>
      <p>{value.currentUser.uid}</p>
      <ItemList
        data={data?.data}
      />
    </div>
  );
}

export default Search;
