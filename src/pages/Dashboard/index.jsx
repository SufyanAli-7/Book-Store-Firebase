import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Hero from '../Frontend/Home/Hero'
import Page404 from '@/components/Misc/Page404'

const Dashboard = () => {
    return (
        <Routes>
            <Route path="/" element={<Hero />} />
            <Route path='*' element={<Page404 />} />
        </Routes>
    )
}

export default Dashboard