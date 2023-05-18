import { Routes, Route } from 'react-router-dom'

import React from 'react'
import Standings from '../container/standings'
const AllRoutes = () => {
  return (
 
    <div>
      <Routes>
        <Route path="/" element={<Standings/>}/>
      </Routes>
    </div>
   
  )
}

export default AllRoutes
