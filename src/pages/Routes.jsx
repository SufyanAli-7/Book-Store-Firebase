import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Auth from './Auth'
import Dashboard from './Dashboard'
import Frontend from './Frontend'
import ProtectedRoute from '@/components/Misc/ProtectedRoute'
import { useAuth } from '@/context/AuthContext'
import Page404 from '@/components/Misc/Page404'


const Index = () => {
  const {isAuth} = useAuth()
  return (
    <Routes>       
        <Route path="/*" element={<Frontend/>} />
        <Route path="auth/*" element={!isAuth ? <Auth/> : <Navigate to="/" />} />
        <Route path="dashboard/*" element={<ProtectedRoute Component={Dashboard} />} />   
        <Route path="*" element={<Page404 />} />         
    </Routes>
  )
}

export default Index