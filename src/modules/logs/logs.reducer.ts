import { createFeatureSelector } from '@ngrx/store';

import { LogsModel } from './logs.model';
import * as logsActions from './logs.actions';

export const initialState: LogsModel = [];

export function logsReducer(state = initialState, action: logsActions.Types) {
  switch (action.type) {
    case logsActions.SAVE_LOG:
      return [...state, action.payload];
    case logsActions.SEND_LOGS_SUCCESS:
      return initialState;
    case logsActions.LOAD_LOG_STATE:
      return [...state, ...action.payload];
    default:
      return state;
  }
}

export const getLogsState = createFeatureSelector<LogsModel>('logs');
