import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
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

  const [heading, setHeading] = useState('CHOOSE YOUR STATS');

    // const[theStats, setTheStats] = useState([]);
  const[theStats, setTheStats] = useState({});
  const [selectedStats, setSelectedStats] = useState([]);

  const backToOverallStats = (event) => {
    history.push('/overallStats')
  }

  const saveToOverallStats = () => {
    history.push('/overallStats', {selectedStats})
  }
  

  const handleStatSelection = (stat) => {
    // setSelectedStats((prevSelectedStats) => {
      if (selectedStats.includes(stat)) {
        setSelectedStats(selectedStats.filter((selectedStat) => selectedStat !== stat));
      } else {
        setSelectedStats([...selectedStats, stat]);
      }
  };

  useEffect(() => {
    fetchStats();
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
    axios.get('/AddStats')
    .then((response) => {
      const apiResponse = response.data;
      const totalData = response.data.total;
     
      console.log('API response', apiResponse.data)
      console.log('totalData log', totalData)
      setTheStats(totalData)
      // setTheStats(totalData);
      // console.log();
    }).catch((error) => {
      console.log('axios get error', error);
    })
  }

  console.log('theStats log', theStats);

  return (
    <div className="container">
      <h2>{heading}</h2>


      <button className="btnStats" onClick={() => handleStatSelection('KILLS')}>KILLS</button>
      <button className="btnStats" onClick={() => handleStatSelection('HEADSHOTS')}>HEADSHOTS</button>
      <button className="btnStats" onClick={() => handleStatSelection('DAMAGE')}>DAMAGE</button>
      <br/>
      <br/>
      <button className="btnStats" onClick={() => handleStatSelection('EXECUTIONS')}>EXECUTIONS</button>
      <button className="btnStats" onClick={() => handleStatSelection('REVIVES')}>REVIVES</button>
      <button className="btnStats" onClick={() => handleStatSelection('KD')}>KD</button>

      <br/>
      <br/>

      <button className="btn" onClick={backToOverallStats}>BACK</button>

      <br/>
      <br/>
      <h4><i>SELECTED STATS:</i></h4>

        {selectedStats.map((stat) => (
        <p key={stat}>{stat}</p>
        ))}

      <button className="btn" onClick={saveToOverallStats}>SAVE</button>

      <br/>
      <br/>
      <h4><i>STATS LOADING</i></h4>

      {/* Are the stats defined? Do they have at least one property? */}

      <div>
          <p>Kills: {theStats?.kills?.value || 'Loading...'}</p>
          <p>Headshots: {theStats?.headshots?.value || 'Loading...'}</p>
          <p>Damage: {theStats?.damage?.value || 'Loading...'}</p>
          <p>Executions: {theStats?.executions?.value || 'Loading...'}</p>
          <p>Revives: {theStats?.revives?.value || 'Loading...'}</p>
          <p>KD: {theStats?.kd?.value || 'Loading...'}</p>
      </div>


  </div>


  );
}

export default AddStats;
