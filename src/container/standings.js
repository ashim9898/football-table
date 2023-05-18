import React from 'react'
import Detail from '../component/detail'
import { setData } from '../redux/reducers/dataSlice'
import {useDispatch} from "react-redux"
const Standings = () => {

  return (
    <div>
      <Detail/>
    </div>
  )
}

export default Standings
