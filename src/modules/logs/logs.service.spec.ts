import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';

import { Log, LogsModel } from './logs.model';
import { HTTPService } from '../../providers/global';
import { LogsProvider } from './logs.service';
import { SaveLog } from './logs.actions';
import { MockStore } from './logs.service.mock';
import { LOG_TYPES } from '../../app/app.enums';
// import { AuthenticationService } from '../../providers/auth/authentication/authentication.service';
import { AuthenticationServiceMock } from '../../../test-config/services-mocks/authentication-service.mock';
import { StorageService } from '../../providers/natives/storage.service';
import { StorageServiceMock } from '../../../test-config/services-mocks/storage-service.mock';
import { Storage } from '@ionic/storage';

const mockLog = () => {
  return {
    type: LOG_TYPES.INFO,
    message: 'this should log',
    timestamp: 99338
  } as Log;
};


describe('LogsProvider', () => {
  let httpServiceSpy: jasmine.SpyObj<HTTPService>;
  let httpService: HTTPService;
  let logProvider: LogsProvider;
  let storageService: Storage;
  let storageServiceSpy: jasmine.SpyObj<Storage>;
  const store: MockStore<LogsModel> = new MockStore<LogsModel>();
  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['read']);
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['get']);
    httpServiceSpy = jasmine.createSpyObj('HTTPService', {
      sendAuthenticatedLogs: () => of('authenticated logs sent'),
      sendUnauthenticatedLogs: () => of('unauthenticated logs sent')
    });
    TestBed.configureTestingModule({
      providers: [LogsProvider, {
        provide: HTTPService,
        useValue: httpServiceSpy
      }, { provide: Store, useValue: store }, { provide: Storage, useValue: storageServiceSpy }]
    });
    httpService = TestBed.get(HTTPService);
    logProvider = TestBed.get(LogsProvider);
    spyOn(store, 'dispatch');
  });
  afterEach(() => {
    storageService = null;
  });


  describe('sendLogs', () => {
    // const appVersion = '3';
    // const employeeId = '1234';
    // it('should send authenticated logs', () => {
    //   spyOn(storageService, 'get').and.returnValue('1.2.3');
    //   const logs: Log[] = [mockLog(), mockLog()];



      // spyOn(storageService, 'read').and.returnValue(Promise.resolve(true));
      //
      // // spyOn(storageService, 'read').and.returnValue('1.2.3');
      // const logs: Log[] = [mockLog(), mockLog()];
      //
      // logProvider.sendLogs(logs).subscribe();
      //
      // const r = logs.map((log) => ({ ...log, appVersion, employeeId }));

      // spy.calls.mostRecent().returnValue.then((res) => {
      //   console.log(res);
      //   expect(httpService.sendAuthenticatedLogs).toHaveBeenCalledWith(r);
      // });
    // });
  });

  describe('sendUnauthLogs', () => {
    // it('should send unauthenticated logs', () => {
    //   const unAuthLog: Log = {
    //     ...mockLog(),
    //     unauthenticated: true
    //   };
    //   const logs: Log[] = [unAuthLog, mockLog()];
    //
    //   logProvider.sendUnauthLogs(logs);
    //
    //   expect(httpService.sendUnauthenticatedLogs).toHaveBeenCalledWith([unAuthLog]);
    // });
  });

  describe('dispatchLog', () => {
    it('should dispatch the SaveLog action', () => {
      logProvider.dispatchLog(mockLog());
      expect(store.dispatch).toHaveBeenCalledWith(new SaveLog(mockLog()));
    });
  });
});
