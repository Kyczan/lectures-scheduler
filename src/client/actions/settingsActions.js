import * as types from './types';

export const fetchSetting = settingName => async dispatch => {
  const rawRes = await fetch(`api/settings/${settingName}`);
  const setting = await rawRes.json();
  return dispatch({
    type: types.FETCH_SETTING,
    payload: setting
  });
};
