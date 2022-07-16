import React from 'react'
import PhotoGet from './enpoints/PhotoGet'
import PhotoPost from './enpoints/PhotoPost'
import TokenPost from './enpoints/TokenPost'
import UserPost from './enpoints/UserPost'

const Api = () => {
  return (
    <div>
      <UserPost />
      <TokenPost />
      <PhotoPost />
      <PhotoGet />
    </div>
  )
}

export default Api