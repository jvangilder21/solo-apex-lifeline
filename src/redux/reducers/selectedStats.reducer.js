import { combineReducers } from 'redux';
// const initialState = {
//     selectedStats: [],
// };


const selectedStats = (state = [], action) => {
    switch (action.type) {
      case 'SET_SELECTED_STATS':
        return action.payload;
      case 'UNSET_SELECTED_STATS':
        return [];
      default:
        return state;
    }
  };

  //combine reducers
export default combineReducers({
    selectedStats,
  });