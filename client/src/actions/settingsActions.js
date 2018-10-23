import * as types from './types';
import axios from 'axios';

export const fetchSetting = settingName => dispatch =>
  axios.get(`api/settings/${settingName}`).then(res =>
    dispatch({
      type: types.FETCH_SETTING,
      payload: res.data
    })
  );
