import { Routes, Route } from 'react-router-dom'

import React from 'react'
import GettingStarted from '../container/gettingStarted'
import CalulationStanding from '../container/calulationStanding'
import TeamPage from '../container/teamPage'
const AllRoutes = () => {
  return (
 
    <div>
      <Routes>
        <Route path="/" element={<GettingStarted/>}/>
        <Route path="/cal" element={<CalulationStanding/>}/>
        <Route path="/team/:id" element={<TeamPage/>} />
      </Routes>
    </div>
   
  )
}

export default AllRoutes
