import React from 'react'
import {  useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
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
import ArsenalFCLogo from '../teamLogos/arsenal_fc.png'
import WestHamLogo from '../teamLogos/westham_fc.png'
import NewcastleUnitedLogo from '../teamLogos/newcastle.png'
import LeedsUnitedLogo from '../teamLogos/leeds_united_fc.png'
import ManchesterUnitedLogo from '../teamLogos/manu.png'
import BrightonLogo from '../teamLogos/brighton.png'
import FulhamLogo from '../teamLogos/fulham.png'
import WestBromLogo from '../teamLogos/westbrom.png'
import Burnley from '../teamLogos/burnley.png'
import ShieffieldFcLogo from '../teamLogos/sheffield.png'

const TeamPage = () => {
  const { id } = useParams();
  const {scoreUpdate} = useSelector(state => state.score);
  const requiredKey = Object.keys(scoreUpdate)[id];
  const teamData = scoreUpdate[requiredKey];
  
 

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
    'Arsenal FC':ArsenalFCLogo,
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
  
  return (
    <div>
  <div className="box">
    <div className="logo">
      <img src={teamLogos[teamData.name]} alt={teamData.name} className='teampage' />
    </div>
    <div className="name">
      {teamData.name}
      <br/>
      <span>a</span>
    </div>
    <div className="last-matches">{teamData.GD}</div>
    
  </div>
</div>
  );
};

export default TeamPage;