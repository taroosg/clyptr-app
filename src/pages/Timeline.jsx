import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth'

const Timeline = () => {
  const value = useContext(AuthContext);
  return (
    <div>
      <p>Timeline</p>
      <p>{value.currentUser.uid}</p>
    </div>
  );
}

export default Timeline;
