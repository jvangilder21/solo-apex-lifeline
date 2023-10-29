import { combineReducers } from 'redux';


const selectedStats = (state = {}, action) => {
    switch (action.type) {
      case 'SET_SELECTED_STATS':
        return action.payload;
      default:
        return state;
    }
  };

// const selectedStats = (state = [], action) => {
//     switch (action.type) {
//       case 'ADD_SELECTED_STATS':
//         return {
//             ...state, 
//             selectedStats: action.payload,
//         };
//       case 'UNSET_SELECTED_STATS':
//         return {
//             ...state, 
//             selectedStats: [],
//         };
//       default:
//         return state;
//     }
//   };



  //combine reducers
export default combineReducers({
    selectedStats,
  });