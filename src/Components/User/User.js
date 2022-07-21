import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Head from '../../Helper/Head'
import NotFound from '../../NotFound'
import { UserContext } from '../../UserContext'
import Feed from '../Feed/Feed'
import UserHeader from './UserHeader'
import UserPhotoPost from './UserPhotoPost'
import UserStats from './UserStats'

const User = () => {

  const {user} = React.useContext(UserContext);

  return (
    <section className='container'>
      <Head title="Minha conta" />
      <UserHeader />
      <Routes>
        <Route path='/' element={<Feed user={user && user.id} />} />
        <Route path='postar' element={<UserPhotoPost />} />
        <Route path='estatisticas' element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  )
}

export default User