import {useEffect, useState} from 'react';
import axios from 'axios';
import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {

  const [heading, setHeading] = useState('RANKED BREAKDOWN');

  const[theStats, setTheStats] = useState([]);

  useEffect(() => {
    fetchStats()

  }, [])

  const fetchStats = () => {
    console.log("Running FetchStats");
    axios.get('/info')
    .then((response) => {
      const apiResponse = response.data;
      console.log('API response', apiResponse)
      setTheStats(apiResponse.data)
    }).catch((error) => {
      console.log('axios get error', error);
    })
  }

  return (
    <div className="container">
      <h2>{heading}</h2>
      <br/>
      <br/>
      <h4><i>APIS</i></h4>

      {/* {theStats.map((stat) => {
          return <img key={stat.id} src={stat.images.fixed_height.url} alt={stat.title}/> 
        })} */}

    </div>
  );
}

export default InfoPage;
