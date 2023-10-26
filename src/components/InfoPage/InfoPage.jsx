import {useEffect, useState} from 'react';
import axios from 'axios';
import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {

  const [heading, setHeading] = useState('RANKED BREAKDOWN');

  return (
    <div className="container">
      <h2>{heading}</h2>
     


    </div>
  ); 
}

export default InfoPage;
