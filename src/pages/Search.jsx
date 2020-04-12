import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth'

const Search = () => {
  const value = useContext(AuthContext);

  return (
    <div>
      <p>Search</p>
      <p>{value.currentUser.uid}</p>
    </div>
  );
}

export default Search;
