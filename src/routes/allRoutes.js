import { Routes, Route } from 'react-router-dom'

import React from 'react'
import GettingStarted from '../container/gettingStarted'
import CalulationStanding from '../container/calulationStanding'
const AllRoutes = () => {
  return (
 
    <div>
      <Routes>
        <Route path="/" element={<GettingStarted/>}/>
        <Route path="/cal" element={<CalulationStanding/>}/>
      </Routes>
    </div>
   
  )
}

export default AllRoutes
