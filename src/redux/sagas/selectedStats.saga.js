import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';


//saga function to diplay posters in archive using db
function* selectedStats(action) {
    try {
        const apiResponse =
        yield axios.get(`/api/AddStats`);
        yield put({ type: 'SET_SELECTED_STATS', payload: apiResponse.data});
    } catch (error) {
        console.log(error);
    }
  }


function* selectedStatsSaga() {
    yield takeEvery('FETCH_SELECTED_STATS', selectedStats);
 
  }
  export default selectedStatsSaga;