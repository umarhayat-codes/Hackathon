import React from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import ShowDetail from './ShowDetail'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Cart from './Cart'
import UserProfile from './profile/UserProfile'
import Admin from './profile/Admin'
import UpdateProduct from './profile/update'
import User from './profile/User'

export default function Dashboard() {
  const {id} = useParams()
  return (
    <>
    <Header />
    <Routes>
      <Route path='show-detail' element={<ShowDetail />} />  
      <Route path='cart' element={<Cart />} />
      <Route path='profile' element={<UserProfile />} />
      <Route path='admin' element={<Admin />} />
      <Route path='update-dish/:id' element={<UpdateProduct />} />
      <Route path='users' element={<User />} />
    </Routes> 
    <Footer />
    </>
  )
}
