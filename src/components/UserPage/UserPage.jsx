import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

import './UserPage.css';


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();

  const OverallStats = (event) => {
    history.push('/overallStats')
    }
  const TrackedChallenges = (event) => {
    history.push('/challenges')
    }

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <br/>

      <div className="userDisplay">
        <h3>
          Welcome Apex Legends player! 
        </h3>
        <br/>
        <p>
          Apex Lifeline is your lifeline to track in game stats and track challenges in the game or create your own. 
          <br/>
          <br/>
          Giving you the ability to see all your tracked challenges even in the middle of the game.
        </p>
      </div>
      <br/>
      <br/>

      <br/>
      <br/>
      <div className="userButtons">
      <button className="btnOverallTracked" onClick={OverallStats} >OVERALL STATS</button>

      <button className="btnOverallTracked" onClick={TrackedChallenges} >TRACKED CHALLENGES</button>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <LogOutButton className="btnLogout" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
