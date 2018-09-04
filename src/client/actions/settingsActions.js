import * as types from './types';

export const fetchSetting = settingName => dispatch => {
  fetch(`api/settings/${settingName}`)
    .then(res => res.json())
    .then(setting =>
      dispatch({
        type: types.FETCH_SETTING,
        payload: setting
      })
    );
};
