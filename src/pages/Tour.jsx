import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth'

const Tour = () => {
  const value = useContext(AuthContext);
  return (
    <div>
      <p>Tour</p>
      <p>{value.currentUser.uid}</p>
    </div>
  );
}

export default Tour;
