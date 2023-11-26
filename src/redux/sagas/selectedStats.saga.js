import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

//saga function to diplay stats in overall using db
function* selectedStats(action) {
  const stats = action.payload;
  console.log(stats);
  }



function* selectedStatsSaga() {
    yield takeEvery('SUBMIT_SELECTED_STATS', selectedStats);
  }
  export default selectedStatsSaga;