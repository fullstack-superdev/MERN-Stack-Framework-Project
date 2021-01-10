/*
 *
 * GlobalSetting actions
 *
 */

import * as types from './constants';

export const loadWithdrawRequest = payload => ({
  type: types.LOAD_WITHDRAW_REQUEST,
  payload,
});
export const loadWithdrawSuccess = payload => ({
  type: types.LOAD_WITHDRAW_SUCCESS,
  payload,
});
export const loadWithdrawFailure = payload => ({
  type: types.LOAD_WITHDRAW_FAILURE,
  payload,
});

export const setOneValue = payload => ({
  type: types.SET_ONE_VALUE,
  payload,
});

export const setQueryValue = payload => ({
  type: types.SET_QUERY_VALUE,
  payload,
});

export const clearOne = payload => ({
  type: types.CLEAR_ONE,
  payload,
});

export const loadOneRequest = payload => ({
  type: types.LOAD_ONE_REQUEST,
  payload,
});
export const loadOneSuccess = payload => ({
  type: types.LOAD_ONE_SUCCESS,
  payload,
});
export const loadOneFailure = payload => ({
  type: types.LOAD_ONE_FAILURE,
  payload,
});

export const saveRequest = payload => ({
  type: types.SAVE_REQUEST,
  payload,
});
export const saveSuccess = payload => ({
  type: types.SAVE_SUCCESS,
  payload,
});
export const saveFailure = payload => ({
  type: types.SAVE_FAILURE,
  payload,
});
