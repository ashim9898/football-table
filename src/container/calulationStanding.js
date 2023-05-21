import React from 'react'
import { useSelector } from 'react-redux'
const CalulationStanding = () => {
    const {dataOfTeams} = useSelector(state=>state.data)
    const teamState = {}
  return (
    <div>
      
        {dataOfTeams.matches.map((item,id)=>{
            const {team1, team2, score} = item
            if(score.ft){
                const team1Score = score.ft[0]
                const team2Score = score.ft[1]
            }
        })}
    </div>
  )
}
    
    
export default CalulationStanding
