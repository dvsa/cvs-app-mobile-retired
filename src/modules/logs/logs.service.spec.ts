import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';

import { Log, LogsModel } from './logs.model';
import { HTTPService } from '../../providers/global/http.service';
import { LogsProvider } from './logs.service';
import { SaveLog } from './logs.actions';
import { MockStore } from './logs.service.mock';
import { LOG_TYPES } from '../../app/app.enums';

const mockLog = () => {
  return {
    type: LOG_TYPES.INFO,
    message: 'this should log',
    timestamp: 99338
  } as Log;
};

describe('LogsProvider', () => {
  let httpServiceSpy: any;
  let httpService: HTTPService;
  let logProvider: LogsProvider;
  const store: MockStore<LogsModel> = new MockStore<LogsModel>();

  beforeEach(() => {
    httpServiceSpy = jasmine.createSpyObj('HTTPService', {
      sendAuthenticatedLogs: () => of('authenticated logs sent'),
      sendUnauthenticatedLogs: () => of('unauthenticated logs sent')
    });

    TestBed.configureTestingModule({
      providers: [
        LogsProvider,
        { provide: HTTPService, useValue: httpServiceSpy },
        { provide: Store, useValue: store }
      ]
    });

    httpService = TestBed.get(HTTPService);
    logProvider = TestBed.get(LogsProvider);
    spyOn(store, 'dispatch');
  });

  describe('sendLogs', () => {
    it('should send authenticated logs', () => {
      const logs: Log[] = [mockLog(), mockLog()];

      logProvider.sendLogs(logs);

      expect(httpService.sendAuthenticatedLogs).toHaveBeenCalledWith(logs);
    });
  });

  describe('sendUnauthLogs', () => {
    it('should send unauthenticated logs', () => {
      const unAuthLog: Log = {
        ...mockLog(),
        unauthenticated: true
      };
      const logs: Log[] = [unAuthLog, mockLog()];

      logProvider.sendUnauthLogs(logs);

      expect(httpService.sendUnauthenticatedLogs).toHaveBeenCalledWith([unAuthLog]);
    });
  });

  describe('dispatchLog', () => {
    it('should dispatch the SaveLog action', () => {
      logProvider.dispatchLog(mockLog());

      expect(store.dispatch).toHaveBeenCalledWith(new SaveLog(mockLog()));
    });
  });
});
