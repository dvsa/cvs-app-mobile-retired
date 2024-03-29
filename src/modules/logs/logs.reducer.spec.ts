import { initialState, logsReducer } from './logs.reducer';

import * as logsActions from './logs.actions';
import { LogType } from './logs.model';

describe('Logs Reducer', () => {
  describe('undefined action', () => {
    it('should return the existing state', () => {
      const action = { type: 'NOOP' } as any;
      const result = logsReducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe('[GLOBAL] Save Log', () => {
    it('should save a log to state', () => {
      const log = {
        type: LogType.INFO,
        message: 'DE with id: 12345678 - [JournalEffects] Load Journal Success',
        timestamp: Date.now()
      };
      const action = new logsActions.SaveLog(log);

      const result = logsReducer(initialState, action);

      expect(result).toEqual([log]);
    });
  });

  describe('[LogsEffects] Send Logs Success', () => {
    const timestamps = [1551872497881, 1551872497882, 1551872497883];
    const lastLog = {
      type: LogType.WARNING,
      message: 'DE with id: 12345678 - [JournalEffects] Load Journal Silent Failure',
      timestamp: timestamps[2]
    };

    const logs = [
      {
        type: LogType.INFO,
        message: 'DE with id: 12345678 - [JournalEffects] Load Journal Success',
        timestamp: timestamps[0]
      },
      {
        type: LogType.ERROR,
        message: 'DE with id: 12345678 - [JournalEffects] Load Journal Failure',
        timestamp: timestamps[1]
      },
      lastLog
    ];

    it('should delete all logs on success', () => {
      const state = logs;
      const action = new logsActions.SendLogsSuccess();

      const result = logsReducer(state, action);

      expect(result).toEqual([]);
    });
  });
});
