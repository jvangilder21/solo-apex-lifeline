import { combineReducers } from 'redux';



const selectedStats = (state = [], action) => {
    switch (action.type) {
      case 'SET_SELECTED_STATS':
        return action.payload;
      default:
        return state;
    }
  };

  //combine reducers
export default combineReducers({
    selectedStats,
  });