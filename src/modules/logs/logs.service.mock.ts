import { Action } from '@ngrx/store';

export class LogsProviderMock {
  sendLogs = jasmine.createSpy('sendLogs');
}

export class MockStore<T> {
  constructor() {}

  dispatch(action: Action) {
    return [];
  }
}
