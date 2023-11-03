import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './ChallengesTracked.css';

// Material Components
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import { blue, white } from '@mui/material/colors';

const challengeData = [];

function ChallengesTracked(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Tracked Challenges');

  const [challengeList, setChallengeList] = useState(challengeData);
  const [newTrackedChallenge, setNewTrackedChallenge] = useState('');
  const [editingChallenge, setEditingChallenge] = useState({
    id: null,
    text: '',
  });

  const fetchTrackedChallenge = () => {
      axios.get('/api/challengesTracked')
      .then((response) => {
          console.log(response.data);
          setChallengeList(response.data);
      })
      .catch((error) => {
          console.log(error);
      })
  };

  const addTrackedChallenge = (event) => {
    event.preventDefault();
    axios.post(`/api/challengesTracked`, {trackedChallenge: newTrackedChallenge})
    .then((response) => {
      console.log(response);
      fetchTrackedChallenge();
      setNewTrackedChallenge('');
    })
    .catch((error) => {
      console.log(`CLIENT POST FAILED`, error);
    })
  };

  const startEditingChallenge = (id, text) => {
    setEditingChallenge({ id, text });
  };

  const updateTrackedChallenges = (id) => {
    axios.put(`/api/challengesTracked/${id}`, {trackedChallenge: editingChallenge.text})
    .then((response) => {
      console.log(response);
      setEditingChallenge({id: null, text: ''});
      fetchTrackedChallenge();
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const deleteTrackedChallenges = (id) => {
    axios.delete(`/api/challengesTracked/${id}`)
    .then((response) => {
      console.log(response);
      fetchTrackedChallenge();
    })
    .catch((error) => {
      console.log(error);
    });
    setEditingChallenge({ id: null, text: ''});
  }

  useEffect(() => {
    fetchTrackedChallenge();
  }, []);

  return (
    <div>
      <h2>{heading}</h2>

      <form onSubmit={addTrackedChallenge}>
        <div className="addButton">
        <TextField 
        id="outlined-basic" 
        label="New Challenge" 
        variant="outlined" 
        onChange={(event) => setNewTrackedChallenge(event.target.value)}
        value={newTrackedChallenge}
        className="customTextfield"/>
        <button className="buttonTracked" id="add" variant="contained" type="submit">Add</button>
        </div>
      </form>

      <br/>
      <br/>

      <table className="challengesDisplay">
        <thead>
          <tr>
            <div className="tableHeader">
            <th>Challenges</th>
            <th></th>
            <th></th>
            </div>
          </tr>
        </thead>

        <tbody id="list">
          {challengeList.map(challenges => (
              <tr id="rows" key={challenges.id} > 
                  <td id="name">{challenges.id === editingChallenge.id ? (
                    <TextField
                    id={`challenge-text-${challenges.id}`}
                    variant="outlined"
                    value={editingChallenge.text}
                    onChange={(event) => setEditingChallenge({
                      id: editingChallenge.id,
                      text: event.target.value,
                    })
                  } />
                ) : (
                  challenges.trackedChallenge
                )}
                </td>
                <td>
                  {challenges.id === editingChallenge.id ? (
                    <button className="buttonTracked"
                      variant="contained" 
                      onClick={() => updateTrackedChallenges(
                        challenges.id, 
                        editingChallenge.text
                      )}>Save</button>
                  ) : (
                    <button className="buttonTracked"
                      variant="contained" 
                      onClick={() => startEditingChallenge(
                        challenges.id, 
                        editingChallenge.trackedChallenge
                      )}>Edit</button>
                  )}
                </td>
                <td>
                  <button className="buttonTracked"
                    variant="contained" 
                    onClick={() => deleteTrackedChallenges(challenges.id)}>Completed</button>
                </td>
                  
              </tr>
          ))}
        </tbody>
      </table>

    
    </div>
  );
}

export default ChallengesTracked;




