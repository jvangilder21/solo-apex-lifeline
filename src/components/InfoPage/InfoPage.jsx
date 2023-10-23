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
  }, []);

  const fetchStats = () => {
    console.log("Running FetchStats");
    axios.get('/info')
    .then((response) => {
      const apiResponse = response.data;
      const totalData = response.data.total;

      console.log('API response', apiResponse.data)
      console.log('totalData log', totalData)
      setTheStats(apiResponse)
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

      <div>
        <p>Kills: {theStats.total && theStats.total.kills.value}</p>
        <p>Headshots: {theStats.total && theStats.total.headshots.value}</p>
        <p>Damage: {theStats.total &&  theStats.total.damage.value}</p>
        <p>Executions: {theStats.total && theStats.total.executions.value}</p>
        <p>Revives: {theStats.total && theStats.total.revives.value}</p>
        <p>KD: {theStats.total && theStats.total.kd.value}</p>

      </div>
     
        {/* {theStats.map((stat, index) => (
        <p key={index}>{stat.total}</p>
      ))} */}

    </div>
  ); 
}

export default InfoPage;
