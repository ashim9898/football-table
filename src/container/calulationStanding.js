import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setScore } from '../redux/reducers/scoreSlice';
import ChelseaFcLogo from '../teamLogos/Chelsea_fc.png'
import LeicesterCityLogo from '../teamLogos/leicester_city.png'
import AstonVillaLogo from '../teamLogos/astonvilla.png'
import LiverpoolLogo from '../teamLogos/liverpool_fc.png'
import SpursLogo from '../teamLogos/spurs.png'
import SouthhamptonLogo from '../teamLogos/southhampton.png'
import EvertonLogo from '../teamLogos/everton_fc.png'
import CrystalPalaceLogo from '../teamLogos/crystalpalace_fc.png'
import WolverhamptonLogo from '../teamLogos/wolverhampton_fc.png'
import ManchesterCityLogo from '../teamLogos/manchesterCity.png'
import ArsenalFcLogo from '../teamLogos/arsenal_fc.png'
import WestHamLogo from '../teamLogos/westham_fc.png'
import NewcastleUnitedLogo from '../teamLogos/newcastle.png'
import LeedsUnitedLogo from '../teamLogos/leeds_united_fc.png'
import ManchesterUnitedLogo from '../teamLogos/manu.png'
import BrightonLogo from '../teamLogos/brighton.png'
import FulhamLogo from '../teamLogos/fulham.png'
import WestBromLogo from '../teamLogos/westbrom.png'
import Burnley from '../teamLogos/burnley.png'
import ShieffieldFcLogo from '../teamLogos/sheffield.png'
import "../App.css"
import { Link } from 'react-router-dom';

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

  const teamLogos = {
    'Chelsea FC': ChelseaFcLogo,
    'Leicester City FC':LeicesterCityLogo,
    'Tottenham Hotspur FC':SpursLogo,
    'Liverpool FC':LiverpoolLogo,
    'Southampton FC':SouthhamptonLogo,
    'Aston Villa FC':AstonVillaLogo,
    'Everton FC':EvertonLogo,
    'Wolverhampton Wanderers FC':WolverhamptonLogo,
    'Crystal Palace FC':CrystalPalaceLogo,
    'Manchester City FC':ManchesterCityLogo,
    'Arsenal':ArsenalFcLogo,
    'West Ham United FC':WestHamLogo,
    'Newcastle United FC': NewcastleUnitedLogo,
    'Leeds United FC':LeedsUnitedLogo,
    'Manchester United FC':ManchesterUnitedLogo,
    'Brighton & Hove Albion FC':BrightonLogo,
    'Fulham FC':FulhamLogo,
    'West Bromwich Albion FC':WestBromLogo,
    'Burnley FC':Burnley,
    'Sheffield United FC':ShieffieldFcLogo,

  }

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


  // State to manage the visibility of the popup and selected team
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Function to handle the click event on team name
  const handleTeamClick = (team) => {
    setSelectedTeam(team);
    setShowPopup(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
    setSelectedTeam(null);
  };

  

  return (
    
    <div className='table-center'>
      
    <table>
      
  <thead>
    <tr className='heading-color'>
      <th>Position</th>
      <th className='start'>Team</th>
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
    const position = id + 1; // Add 1 to offset the index
    return (
      <tr key={id}>
        <td>{position}</td>
    

        <td className='start' style={{ display: "flex", alignItems: 'center' }}>
                <img src={teamLogos[item.teamName]} alt={item.teamName} className='team-logo' />
                {/* Add onClick event handler to the team name */}
                <span onClick={() => handleTeamClick(item)} className='team-name'>
                  {item.teamName}
                </span>
              </td>
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
                color= '#1dcf32'
                break;
              case 'L':
                color='red'
                break;
              default:
                color="grey"
                break;
            }
           return <span key={index} className="bubble-letter" style={{backgroundColor: color, color:"white"}}>{letter}</span>
          })}
          
        {/* {item.form.split('').map((letter, index) => (
          <span key={index} className="bubble-letter">{letter}</span>
        ))} */}
      </td>
    </tr>
    )
  })}
   
  </tbody>
{/* Popup */}
{showPopup && selectedTeam && (
        <div className="popup">
          <div className="popup-content">
            {/* Display the selected team information */}
            <img src={teamLogos[selectedTeam.teamName]} alt={selectedTeam.teamName} style={{height:"80px",width:'80px'}} className='team-logo' />
            <h2>{selectedTeam.teamName}</h2>
            <div className="team-details">
              <div className="detail-item">
                <span>Played:</span>
                <span>{selectedTeam.matchPlayed}</span>
              </div>
              <div className="detail-item">
                <span>Won:</span>
                <span>{selectedTeam.won}</span>
              </div>
              <div className="detail-item">
                <span>Drawn:</span>
                <span>{selectedTeam.drawn}</span>
              </div>
              <div className="detail-item">
                <span>Lost:</span>
                <span>{selectedTeam.lost}</span>
              </div>
              <div className="detail-item">
                <span>GF:</span>
                <span>{selectedTeam.GF}</span>
              </div>
              <div className="detail-item">
                <span>GA:</span>
                <span>{selectedTeam.GA}</span>
              </div>
              <div className="detail-item">
                <span>GD:</span>
                <span>{selectedTeam.GD}</span>
              </div>
              <div className="detail-item">
                <span>Points:</span>
                <span>{selectedTeam.points}</span>
              </div>
              <br/>
              <h3>Form In Last 5 Games</h3>
              <br/>
              <div className="detail-item">
              
              
              {selectedTeam.form.split('').map((letter, index) => {
            let color;
            switch(letter){
              case 'W':
                color= '#1dcf32'
                break;
              case 'L':
                color='red'
                break;
              default:
                color="grey"
                break;
            }
            <br/>
           return <span key={index} className="bubble-popup" style={{backgroundColor: color, color:"white", justifyContent:"start"}}>{letter}</span>
          })}
             </div>
              {/* ... other team details */}
            </div>
            <button onClick={closePopup} style={{backgroundColor:"#2196f3", color:"white"}}>Close</button>
          </div>
        </div>
      )}
       
</table>
    </div>
  );
};

export default CalculationStanding;