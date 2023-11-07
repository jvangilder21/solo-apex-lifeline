import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './EditStats.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function EditStats(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();


  const [heading, setHeading] = useState('EDIT YOUR STATS');
  const [theStats, setTheStats] = useState({});
  const [editSelectedStats, setEditSelectedStats] = useState([]);

  const selectedStats = useSelector((store) => store.selectedStatsReducer.selectedStats); 


  const OverallStats = (event) => {
    history.push('/overallStats')
    }

  const saveToOverallStats = (id) => {
    dispatch({type: 'SET_SELECTED_STATS', payload: editSelectedStats});
    axios.post(`/api/OverallStats}`, savedStats)
    .then((response) => {
      console.log('Stats saved to the database!!');
    })
    .catch((error) => {
      console.log('PUTaxios: Error saving stats:', error);
    })
    history.push('/overallStats')
  }

  // const saveToOverallStats = (id) => {
  //   dispatch({type: 'SET_SELECTED_STATS', payload: editSelectedStats});
  //   axios.post(`/api/OverallStats}`, savedStats,{
  //     params: {
  //       username: user.username,
  //     }
  //   })
  //   .then((response) => {
  //     console.log('Stats saved to the database!!');
  //   })
  //   .catch((error) => {
  //     console.log('PUTaxios: Error saving stats:', error);
  //   })
  //   history.push('/overallStats')
  // }

  const handleStatSelection = (stat) => {
    console.log('THIS IS OUR STAT', stat);

    if (editSelectedStats.some((editSelectedStat) => editSelectedStat.name === stat.name)) {
      setEditSelectedStats(editSelectedStats.filter((editSelectedStat) => editSelectedStat.name !== stat.name));
    } else {
      setEditSelectedStats([...editSelectedStats, stat]);
      console.log(editSelectedStats);
    }
};

useEffect(() => {
  fetchStats();
  // dispatch({type: 'FETCH_SELECTED_STATS'});
  // fetchOrder();
}, []);

// const fetchStats = () => {
//   console.log("Running FetchStats");
//   axios.get('/api/AddStats')
//   .then((response) => {
//     const totalData = response.data.total;
   
//     console.log('totalData log', totalData)
//     setTheStats(totalData)
//   }).catch((error) => {
//     console.log('GETaxios get error', error);
//   })
// }

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

  return (
    <div>
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

      {/* <br/>
      <br/>
      <br/>
      <br/> */}

      <div className="selectedStatsContainer statDisplay">
      <p> 
            
        {editSelectedStats && editSelectedStats.length > 0 ? (
          // This will display selected stats if there are any.
          <div>
            <p className="editStatHeader">New Selected Stats:</p>
            <div className="editStatSelectedDisplay">
            {editSelectedStats.map((stat, index) => (
              <p key={index}>{stat.name}: {stat.value}</p>
            ))}
            </div>
          </div>
        ) : (
          // Message if not stats are selected
          <p className="editStatHeader">Select Stats above to compare and save new stats order!</p>
        )} 
        <br/>
        <br/>
        <br/>
          <p className="editStatHeader">Current Selected Stats:</p>
          <div className="editStatSelectedDisplay">
          {selectedStats.map((stat) => (
          <p key={stat.name}>{stat.name} : {stat.value}</p>
          ))}
          </div>
      </p>
      </div>

      <br/>
      <br/>
      
      <div className="backAndSaveContainer">
      <button className="btn" id="backBtn" onClick={OverallStats}>BACK</button>
      <button className="btn" id="saveBtn" onClick={saveToOverallStats}>SAVE</button>
      </div>
    </div>
  );
}

export default EditStats;
