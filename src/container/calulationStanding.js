import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setScore } from '../redux/reducers/scoreSlice';
import "../App.css"

const CalculationStanding = () => {
  const { dataOfTeams } = useSelector(state => state.data);
  const {scoreUpdate} = useSelector(state=>state.score);
  console.log(scoreUpdate)

  const dispatch = useDispatch();

  useEffect(() => {
    const teamState = {};

    // Loop through the matches in dataOfTeams
    dataOfTeams.matches.map((item, id) => {
      const { team1, team2, score } = item;

      // Check if score exists and is an array
      if (score && score.ft && Array.isArray(score.ft)) {
        const team1Score = score.ft[0];
        const team2Score = score.ft[1];

        // Check if team1 is already present in teamState
        if (!teamState[team1]) {
          teamState[team1] = {
            name: team1,
            matchPlayed: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            points: 0,
            GF: 0,
            GA: 0,
            GD: 0,
            form:'',
          };
        }

        // Check if team2 is already present in teamState
        if (!teamState[team2]) {
          teamState[team2] = {
            name: team2,
            matchPlayed: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            points: 0,
            GF: 0,
            GA: 0,
            GD: 0,
            form: '',
          };
        }

        // Update goalsFor (GF) and goalsAgainst (GA) for both teams
        teamState[team1].GF += team1Score;
        teamState[team1].GA += team2Score;
        teamState[team2].GF += team2Score;
        teamState[team2].GA += team1Score;

        teamState[team1].matchPlayed++
        teamState[team2].matchPlayed++

        teamState[team1].GD = teamState[team1].GF-teamState[team1].GA 
        teamState[team2].GD = teamState[team2].GF-teamState[team2].GA 


      
        // Update points based on the match result
        if (team1Score > team2Score) {
          teamState[team1].points += 3;
          teamState[team1].won++
          teamState[team2].lost++
          teamState[team1].form += 'W'
          teamState[team2].form += 'L'
        } else if (team1Score === team2Score) {
          teamState[team1].points += 1;
          teamState[team2].points += 1;
          teamState[team1].drawn++
          teamState[team2].drawn++
          teamState[team1].form += 'D'
          teamState[team2].form += 'D'
        } else {
          teamState[team2].points += 3;
          teamState[team2].won++
          teamState[team1].lost++
          teamState[team2].form += 'W'
          teamState[team1].form += 'L'
        }
      }
    });

    // Dispatch the teamState to update the score in the Redux store

    dispatch(setScore(teamState));
  }, [dataOfTeams]);

  const resultArray = [];
  for (let item in scoreUpdate) {
    
    resultArray.push({
      teamName: item,
      matchPlayed: scoreUpdate[item].matchPlayed,
      won: scoreUpdate[item].won,
      drawn: scoreUpdate[item].drawn,
      lost: scoreUpdate[item].lost,
      points: scoreUpdate[item].points,
      GF: scoreUpdate[item].GF,
      GA: scoreUpdate[item].GA,
      GD: scoreUpdate[item].GD,
      form: scoreUpdate[item].form.slice(0,5),
    })
  }

  console.log("this is skanda object")
  console.log(resultArray)
  const sortedArray = resultArray.sort((a,b)=>{
    if(a.points===b.points){
      return b.GF-a.GF
    }else {
      // Otherwise, compare by points
      return b.points - a.points;
    }
  });
  

  return (
    <div className='table-center'>
    <table>
  <thead>
    <tr className='heading-color'>
      <th>Position</th>
      <th>Team</th>
      <th>Played</th>
      <th>Won</th>
      <th>Drawn</th>
      <th>Lost</th>
      <th>GF</th>
      <th>GA</th>
      <th>GD</th>
      <th>Points</th>
      <th>Form</th>
    </tr>
  </thead>
  <tbody>
  {sortedArray.map((item,id)=>{
    return(
    <tr key={id}>
        <td>{id+1}</td>
        <td>{item.teamName}</td>
        <td>{item.matchPlayed}</td>
        <td>{item.won}</td>
        <td>{item.drawn}</td>
        <td>{item.lost}</td>
        <td>{item.GF}</td>
        <td>{item.GA}</td>
        <td>{item.GD}</td>
        <td>{item.points}</td>
        <td>
          {item.form.split('').map((letter, index) => {
            let color;
            switch(letter){
              case 'W':
                color= '#52CC7A'
                break;
              case 'L':
                color='red'
                break;
              default:
                color="grey"
                break;
            }
           return <span key={index} className="bubble-letter" style={{backgroundColor: color}}>{letter}</span>
          })}
          
        {/* {item.form.split('').map((letter, index) => (
          <span key={index} className="bubble-letter">{letter}</span>
        ))} */}
      </td>
    </tr>
    )
  })}
   
  </tbody>
</table>
    </div>
  );
};

export default CalculationStanding;