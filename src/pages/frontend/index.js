import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PunjabFood from './PunjabFood'
import KPKFood from './KPKFood'
import BalochistanFood from './BalochistanFood'
import SindhFood from './SindhFood'

export default function Frontend() {
  return (
    <>
    <Header />
     <Routes>
        <Route index element={<Home />} />
        <Route path='punjab' element={<PunjabFood />} />
        <Route path='kpk' element={<KPKFood />} />
        <Route path='balochistan' element={<BalochistanFood />} />
        <Route path='sindh' element={<SindhFood />} />
        
      </Routes> 
    <Footer />
      
    </>
  )
}
