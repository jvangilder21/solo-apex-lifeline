import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './AddStats.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function AddStats(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();
  

  const [heading, setHeading] = useState('CHOOSE YOUR STATS');
  const [theStats, setTheStats] = useState({});
  const [selectedStats, setSelectedStats] = useState([]);


  const backToOverallStats = (event) => {
    history.push('/overallStats')
  }

  const saveToOverallStats = () => {

    // dispatching the selectedStats to the redux store.
    dispatch({type: 'SET_SELECTED_STATS', payload: selectedStats})

    // Making a POST reqeust to save the selected Stats in the database
    console.log('logging the savedStats', savedStats);
    axios.post(`/api/OverallStats`, savedStats)
    .then((response) => {
      console.log('Stats saved to the database!!');
    })
    .catch((error) => {
      console.log('POSTaxios: Error saving stats:', error);
    })
    // Pushing the user back to the overallStats page
    history.push('/EditStats')
    history.push('/overallStats')
    
  }
  

  const handleStatSelection = (stat) => {
      console.log('THIS IS OUR STAT', stat);

      if (selectedStats.some((selectedStat) => selectedStat.name === stat.name)) {
        setSelectedStats(selectedStats.filter((selectedStat) => selectedStat.name !== stat.name));
      } else {
        setSelectedStats([...selectedStats, stat]);
        console.log(selectedStats);
      }
  };

  useEffect(() => {
    fetchStats();
  }, []);


  const fetchStats = () => {
    console.log("Running FetchStats");
    axios.get('/api/AddStats', {
      params: {
        username: user.username,
      }
    })
    .then((response) => {
      const totalData = response.data.total;
     
      console.log('totalData log', totalData)
      setTheStats(totalData)
    }).catch((error) => {
      console.log('GETaxios get error', error);
    })
  }

  const [kills, setKills] = useState([]);
  const [headshots, setHeadshots] = useState([]);
  const [damage, setDamage] = useState([]);
  const [executions, setExecutions] = useState([]);
  const [revives, setRevives] = useState([]);
  const [kd, setKd] = useState([]);

  const savedStats = {
    kills: theStats?.kills?.value,
    headshots: theStats?.headshots?.value,
    damage: theStats?.damage?.value,
    executions: theStats?.executions?.value,
    revives: theStats?.revives?.value,
    kd: theStats?.kd?.value
  }

  console.log('theStats log', theStats);

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="buttonContainer">
      <button className="btnStats" onClick={() => handleStatSelection({name: 'KILLS', value: theStats?.kills?.value})}>KILLS <br/>{theStats?.kills?.value || 'Loading...'}</button>
      <button className="btnStats" onClick={() => handleStatSelection({name: 'HEADSHOTS', value: theStats?.headshots?.value})}>HEADSHOTS <br/>{theStats?.headshots?.value || 'Loading...'}</button>
      <button className="btnStats" onClick={() => handleStatSelection({name: 'DAMAGE', value: theStats?.damage?.value})}>DAMAGE <br/>{theStats?.damage?.value || 'Loading...'}<br/></button>
      <br/>
      <br/>
      <button className="btnStats" onClick={() => handleStatSelection({name: 'FINISHERS', value: theStats?.executions?.value})}>FINISHERS <br/>{theStats?.executions?.value || 'Loading...'}</button>
      <button className="btnStats" onClick={() => handleStatSelection({name: 'REVIVES', value: theStats?.revives?.value})}>REVIVES <br/>{theStats?.revives?.value || 'Loading...'}</button>
      <button className="btnStats" onClick={() => handleStatSelection({name: 'KD', value: theStats?.kd?.value})}>KD <br/>{theStats?.kd?.value || 'Loading...'}<br/></button>
      </div>
  
      <br/>
      <br/>
      <div className="selectedStatsContainer statDisplay">
      <h4><i>SELECTED STATS:</i></h4>
        <div className="statSelectedDisplay">
        {selectedStats.map((stat) => (
        <p key={stat.name}>{stat.name} : {stat.value}</p>
        ))}
        </div>
      </div>

      <div className="backAndSaveContainer">
      <button className="btn" id="backBtn" onClick={backToOverallStats}>BACK</button>
      <button className="btn" id="saveBtn" onClick={saveToOverallStats}>SAVE</button>
      </div>

      <br/>
      <br/>

  </div>

  );
}

export default AddStats;
