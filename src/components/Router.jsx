import React, { Fragment, useContext } from 'react'
import { AuthContext } from '../contexts/auth'

export default ({ renderLogin, renderClyptr }) => {
  const { currentUser } = useContext(AuthContext)

  return (
    <Fragment>
      {currentUser ? renderClyptr() : renderLogin()}
    </Fragment>
  )
}