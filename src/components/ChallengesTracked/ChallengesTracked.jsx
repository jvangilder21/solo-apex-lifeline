import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const challengeData = [];

function ChallengesTracked(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Tracked Challenges');

  const [challengeList, setChallengeList] = useState(challengeData);
  const [trackedChallenge, setTrackedChallenge] = useState('');


useEffect(() => {
  fetchTrackedChallenge();
}, []);

const fetchTrackedChallenge = () => {
    axios.get('/api/challenges')
    .then((response) => {
        console.log(reponse.data);
        setChallengeList(response.data);
    })
    .catch((error) => {
        console.log(error);
    })
};


  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default ChallengesTracked;




