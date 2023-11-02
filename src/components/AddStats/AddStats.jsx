import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function AddStats(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const history = useHistory();
  const dispatch = useDispatch();
  

  const [heading, setHeading] = useState('CHOOSE YOUR STATS');
  const [theStats, setTheStats] = useState({});
  const [selectedStats, setSelectedStats] = useState([]);


  const backToOverallStats = (event) => {
    history.push('/overallStats')
  }

  const saveToOverallStats = () => {
    // const selectedStatsValues = selectedStats.map((stat) => stat.value);
    // console.log(selectedStatsValues);

    // dispatching the selectedStats to the redux store.
    dispatch({type: 'SET_SELECTED_STATS', payload: selectedStats})
    // console.log('THIS IS OUR selectedStats', preStat);.

    // Making a POST reqeust to save the selected Stats in the database
    console.log('logging the savedStats', savedStats);
    // axios.post('/api/OverallStats', {statsData: selectedStatsValues})
    axios.post(`/api/OverallStats`, savedStats)
    .then((response) => {
      console.log('Stats saved to the database!!');
    })
    .catch((error) => {
      console.log('POSTaxios: Error saving stats:', error);
    })
    // // Pushing the user back to the overallStats page
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
      
      // if (selectedStats.includes(stat)) {
      //   setSelectedStats(selectedStats.filter((selectedStat) => selectedStat !== stat));
      // } else {
      //   setSelectedStats([...selectedStats, stat]);
      //   console.log(selectedStats);
      // }
  };

  useEffect(() => {
    fetchStats();
    // dispatch({type: 'FETCH_SELECTED_STATS'});
    // fetchOrder();
  }, []);

  // const fetchOrder = () => {
  //   axios.get('/stats').then((response) => {
  //     if (response.data.length > 0) {
  //       fetchStats();
  //     } else {
  //       alert('Please select stats!');
  //     }
  //   })
  // }

   const fetchStats = () => {
    console.log("Running FetchStats");
    axios.get('/api/AddStats')
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


      <button className="btnStats" onClick={() => handleStatSelection({name: 'KILLS', value: theStats?.kills?.value})}>KILLS <br/>{theStats?.kills?.value || 'Loading...'}</button>
      <button className="btnStats" onClick={() => handleStatSelection({name: 'HEADSHOTS', value: theStats?.headshots?.value})}>HEADSHOTS <br/>{theStats?.headshots?.value || 'Loading...'}</button>
      <button className="btnStats" onClick={() => handleStatSelection({name: 'DAMAGE', value: theStats?.damage?.value})}>DAMAGE <br/>{theStats?.damage?.value || 'Loading...'}<br/></button>
      <br/>
      <br/>
      <button className="btnStats" onClick={() => handleStatSelection({name: 'FINISHERS', value: theStats?.executions?.value})}>FINISHERS <br/>{theStats?.executions?.value || 'Loading...'}</button>
      <button className="btnStats" onClick={() => handleStatSelection({name: 'REVIVES', value: theStats?.revives?.value})}>REVIVES <br/>{theStats?.revives?.value || 'Loading...'}</button>
      <button className="btnStats" onClick={() => handleStatSelection({name: 'KD', value: theStats?.kd?.value})}>KD <br/>{theStats?.kd?.value || 'Loading...'}<br/></button>

      {/* <button className="btnStats" onClick={() => handleStatSelection(setKills(theStats?.kills?.value))}>KILLS <br/>{theStats?.kills?.value || 'Loading...'}</button> */}
      {/* <button className="btnStats" onClick={() => setHeadshots(theStats?.headshots?.value)}>HEADSHOTS <br/>{theStats?.headshots?.value || 'Loading...'}</button>
      <button className="btnStats" onClick={() => setDamage(theStats?.damage?.value)}>DAMAGE <br/>{theStats?.damage?.value || 'Loading...'}<br/></button>
      <br/>
      <br/>
      <button className="btnStats" onClick={() => setExecutions(theStats?.executions?.value)}>EXECUTIONS <br/>{theStats?.executions?.value || 'Loading...'}</button>
      <button className="btnStats" onClick={() => setRevives(theStats?.revives?.value)}>REVIVES <br/>{theStats?.revives?.value || 'Loading...'}</button> */}
      {/* <button className="btnStats" onClick={() => setKd(theStats?.kd?.value)}>KD <br/>{theStats?.kd?.value || 'Loading...'}<br/></button> */}

      <br/>
      <br/>
      <br/>
      <br/>

      <button className="btn" onClick={backToOverallStats}>BACK</button>

      <br/>
      <br/>
      <h4><i>SELECTED STATS:</i></h4>
      {/* {JSON.stringify(selectedStats[0])} */}
     
        {selectedStats.map((stat) => (
        <p key={stat.name}>{stat.name} : {stat.value}</p>
        ))}

     <button className="btn" onClick={saveToOverallStats}>SAVE</button>

      <br/>
      <br/>
      {/* <h4><i>STATS LOADING</i></h4> */}


      {/* <div>
          <p>Kills: {theStats?.kills?.value || 'Loading...'}</p>
          <p>Headshots: {theStats?.headshots?.value || 'Loading...'}</p>
          <p>Damage: {theStats?.damage?.value || 'Loading...'}</p>
          <p>Executions: {theStats?.executions?.value || 'Loading...'}</p>
          <p>Revives: {theStats?.revives?.value || 'Loading...'}</p>
          <p>KD: {theStats?.kd?.value || 'Loading...'}</p>
      </div> */}


  </div>


  );
}

export default AddStats;
