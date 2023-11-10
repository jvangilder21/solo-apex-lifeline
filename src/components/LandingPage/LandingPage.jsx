import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome Apex Legends Gamers! ');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid" >
        <div className="grid-col grid-col_8">
          <p>
            Apex Lifeline is your go to app to track your in game stats
            on the go. While also creating and tracking your challenes!
          </p>
          <br/>
          <p>
           Before registering, you will be able to pull your stats. Please 
           make sure that you have at least one of the following trackers set as a 
           tracker on your legend in Apex Legends to correctly pull your stats:
           <ul>
            <li>Kills</li>
            <li>Headshots</li>
            <li>Damage Dealt</li>
            <li>Finishers</li>
            <li>Revives</li>
           </ul>
          </p>

          <p>
           Please register using your Origin username that is affiliated with
           your gamer tag/ username. 
          </p>

          <br/>
          <p>
          Good luck gamer!  
          </p>

        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
