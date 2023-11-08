import React, { useEffect, useState } from 'react';
import './AboutPage.css';



// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {

  const [heading, setHeading] = useState('ABOUT APEX LIFELINE');

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="aboutContainer">
      
        <h3>CREATED FOR:</h3>
        <p className="aboutSmallText" id="aboutCreatedFor">This application was created for Apex Legends PC gamers who love to play the game, 
          needing to track their stats and challenges during the game and offline. When 
          registering, the user will enter their Origin gaming username so their Apex stats will
          display on the screen. Users will be able to add and edit stats to their Overall Stats page.
          Stats will update after each game is played. Users will also be able to add any challenge to
          their Challenges page. The user can enter any of the in game week, daily, or event challenges or
          create their own challenges to test they're skills.
        </p>
        <br/>

        <h3>TECHNOLOGIES USED:</h3>
        <ul className="aboutSmallText">
          <ol>CSS</ol>
          <ol>JavaScript</ol>
          <ol>Node</ol>
          <ol>Express</ol>
          <ol>React</ol>
          <ol>Redux</ol>
          <ol>Sagas</ol>
          <ol>PostgreSQL</ol>
          <ol>Passport</ol>
          <ol>Material UI</ol>
          <ol>APEX LEGENDS STATUS API</ol>
        </ul>
        <h3>COMING SOON:</h3>
        <ul className="aboutSmallText">
          <ol>Xbox Tracking</ol>
          <ol>PS4/5 Tracking</ol>
          <ol>Ranked Info & Stats</ol>
          <ol>Friends List</ol>
          <ol>Comparing Stats</ol>
         
        </ul>

      </div>
    </div>
  );
}

export default AboutPage;
