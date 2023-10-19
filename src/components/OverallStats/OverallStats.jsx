import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.

function OverallStats(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const history = useHistory();

  const [heading, setHeading] = useState('OVERALL STATS');

  const AddStats = (event) => {
    history.push('/AddStats')
    }

  return (
    <div>
      <h2>{heading}</h2>

      <br/>
      <br/>

      <button className="btn"
      onClick={AddStats} >ADD YOUR STATS</button>
      <button className="btn"
      onClick={OverallStats} >EDIT STATS</button>
      <br/>
      <br/>
      <h2>MY STATS</h2>
      <br/>
      <br/>
      
      <p>At some point we will add the functionality for when the stat we choose to 
        add to our page will display here.</p>

    </div>
  );
}

export default OverallStats;
