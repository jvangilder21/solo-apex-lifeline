import {useEffect, useState} from 'react';
import axios from 'axios';
import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {

  const [heading, setHeading] = useState('RANKED BREAKDOWN');

  // const[theStats, setTheStats] = useState([]);
  const[theStats, setTheStats] = useState({});


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
      <br/>
      <br/>
      <h4><i>STATS LOADING</i></h4>

{/* Are the stats defined? Do they have at least one property? */}

      <div>
        <p>Kills: {theStats?.kills?.value || 'Loading...'}</p>
        <p>Headshots: {theStats?.headshots?.value}</p>
        <p>Damage: {theStats?.damage?.value}</p>
        <p>Executions: {theStats?.executions?.value}</p>
        <p>Revives: {theStats?.revives?.value}</p>
        <p>KD: {theStats?.kd?.value}</p>
      </div>


     
        {/* {theStats.map((stat, index) => (
        <p key={index}>{stat.total}</p>
      ))} */}

    </div>
  ); 
}

export default InfoPage;
