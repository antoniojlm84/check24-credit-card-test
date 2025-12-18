import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  blank: function (state, _action) {
    if (state == null) state = [];
    return state;
  }
});
