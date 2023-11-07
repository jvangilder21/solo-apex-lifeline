import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import './OverallStats.css';
import logger from 'redux-logger';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.

function OverallStats(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const history = useHistory();

  const [heading, setHeading] = useState('OVERALL STATS');

  const selectedStats = useSelector((store) => store.selectedStatsReducer.selectedStats); 
  
  console.log(selectedStats);

  const AddStats = (event) => {
    history.push('/AddStats')
    }
  const EditStats = (event) => {
    history.push('/EditStats')
    }

  return (
    <div>
      <h2>{heading}</h2>

      <br/>
      <br/>

      <button className="btnOverallStats"
      onClick={AddStats} >ADD YOUR STATS</button>
      <button className="btnOverallStats"
      onClick={EditStats} >EDIT STATS</button>
      <br/>
      <br/>
      <h2>MY STATS</h2>
      <br/>
      <br/>

      <p className="statDisplay"> 
      
        {selectedStats && selectedStats.length > 0 ? (
          // This will display selected stats if there are any.
          <div>
            <p className="selectedStatsHeader">Selected Stats:</p>
            <div className="statNameValue">
            {selectedStats.map((stat, index) => (
              <p key={index}>{stat.name}: {stat.value}</p>
            ))}
            </div>
          </div>
         ) : (
          // Message if not stats are selected
          <p className="selectedStatsHeader">Please select Add Stats to add stats to this page!</p>
        )} 
      </p>

    </div>
  );
}

export default OverallStats;
