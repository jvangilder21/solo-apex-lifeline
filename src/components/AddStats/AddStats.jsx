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

  const OverallStats = (event) => {
    history.push('/overallStats')
    }

  useEffect(() => {
    fetchStats();
    // fetchOrder();
  }, []);

  const fetchOrder = () => {
    axios.get('/stats').then((response) => {
      if (response.data.length > 0) {
        fetchStats();
      } else {
        alert('Please select stats!');
      }
    })
  }

   const fetchStats = () => {
    console.log("Running FetchStats");
    axios.get('/info')
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

      <button className="btnStats">KD</button>
      <button className="btnStats">REVIVES</button>
      <button className="btnStats">WINS</button>
      <button className="btnStats">KNOCKDOWNS</button>
      <br/>
      <br/>
      <button className="btnStats">ASSISTS</button>
      <button className="btnStats">DAMAGE DEALT</button>
      <button className="btnStats">FINISHERS</button>
      <button className="btnStats">HEADSHOTS</button>
      <br/>
      <br/>
      <br/>
      <br/>

      <button className="btn" onClick={OverallStats}>BACK</button>

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


      
      {/* {theStats.map((stat, index) => (
        <p key={index}>{stat.total}</p>
        ))} */}

  </div>


  );
}

export default AddStats;
