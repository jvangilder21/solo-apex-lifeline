import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

// const setSelectedStats = (selectedStats) => ({
//   type: 'SET_SELECTED_STATS',
//   payload: selectedStats,
// });


//saga function to diplay stats in overall using db
function* selectedStats(action) {
  const stats = action.payload;
  console.log(stats);
    // try {
    //     const apiResponse =
        // yield axios.get(`/api/AddStats`);
    //     console.log('API response data:', apiResponse.total);x
        // yield put({ type: 'ADD_SELECTED_STATS', payload: apiResponse.data.total});
    // } catch (error) {
    //     console.log(error);
    // }
  }



function* selectedStatsSaga() {
    yield takeEvery('SUBMIT_SELECTED_STATS', selectedStats);
    // yield takeEvery('FETCH_SELECTED_STATS', selectedStats);

  }
  export default selectedStatsSaga;