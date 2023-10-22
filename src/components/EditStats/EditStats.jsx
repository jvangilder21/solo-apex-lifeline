import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function EditStats(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const history = useHistory();

  const [heading, setHeading] = useState('EDIT YOUR STATS');

  const OverallStats = (event) => {
    history.push('/overallStats')
    }

  return (
    <div>
      <h2>{heading}</h2>

      <button className="btnStats">KD</button>
      <button className="btnStats">REVIVES</button>
      <button className="btnStats">WINS</button>
      <button className="btnStats">KNOCKDOWNS</button>
      <br/>
      <br/>
      <button className="btnStats">ASSISTS</button>
      <button className="btnStats">DAMAGE DEALT</button>
      <button className="btnStats">FINISHERS</button>
      <button className="btnStats">HEADSHOTS</button>
      <br/>
      <br/>
      <br/>
      <br/>
      <button className="btn"
      onClick={OverallStats}>BACK</button>
    </div>
  );
}

export default EditStats;
