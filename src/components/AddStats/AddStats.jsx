import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function AddStats(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const history = useHistory();

  const [heading, setHeading] = useState('CHOOSE YOUR STATS');

  const OverallStats = (event) => {
    history.push('/overallStats')
    }

  return (
    <div>
      <h2>{heading}</h2>

      <button className="btn">KD</button>
      <button className="btn">REVIVES</button>
      <button className="btn">WINS</button>
      <button className="btn">KNOCKDOWNS</button>
      <br/>
      <br/>
      <button className="btn">ASSISTS</button>
      <button className="btn">DAMAGE DEALT</button>
      <button className="btn">FINISHERS</button>
      <button className="btn">HEADSHOTS</button>
      <br/>
      <br/>
      <br/>
      <br/>
      <button className="btn"
      onClick={OverallStats}>BACK</button>
    </div>
  );
}

export default AddStats;
