// import { TestBed } from '@angular/core/testing';
// import { Store } from '@ngrx/store';
// import { of } from 'rxjs/observable/of';

// import { Log, LogsModel } from './logs.model';
// import { HTTPService } from '../../providers/global/http.service';
// import { LogsProvider } from './logs.service';
// import { SaveLog } from './logs.actions';
// import { MockStore } from './logs.service.mock';
// import { LOG_TYPES } from '../../app/app.enums';
// // import { AuthenticationService } from '../../providers/auth/authentication/authentication.service';
// import { AuthenticationServiceMock } from '../../../test-config/services-mocks/authentication-service.mock';
// import { StorageService } from '../../providers/natives/storage.service';
// import { StorageServiceMock } from '../../../test-config/services-mocks/storage-service.mock';

// const mockLog = () => {
//   return {
//     type: LOG_TYPES.INFO,
//     message: 'this should log',
//     timestamp: 99338
//   } as Log;
// };

// describe('LogsProvider', () => {
//   let httpServiceSpy: any;
//   let httpService: HTTPService;
//   let logProvider: LogsProvider;
//   // let authenticationService: AuthenticationService;
//   let storageService: StorageService;
//   // let storageServiceSpy: jasmine.SpyObj<StorageService>;

//   const store: MockStore<LogsModel> = new MockStore<LogsModel>();

//   beforeEach(() => {
//     // storageServiceSpy = jasmine.createSpyObj('StorageService', ['read']);
//     httpServiceSpy = jasmine.createSpyObj('HTTPService', {
//       sendAuthenticatedLogs: () => of('authenticated logs sent'),
//       sendUnauthenticatedLogs: () => of('unauthenticated logs sent')
//     });

//     TestBed.configureTestingModule({
//       providers: [
//         LogsProvider,
//         { provide: HTTPService, useValue: httpServiceSpy },
//         { provide: Store, useValue: store },
//         // { provide: AuthenticationService, useClass: AuthenticationServiceMock },
//         // { provide: StorageService, useValue: storageServiceSpy },
//         { provide: StorageService, useClass: StorageServiceMock },
//       ]
//     });

//     httpService = TestBed.get(HTTPService);
//     logProvider = TestBed.get(LogsProvider);
//     // authenticationService = TestBed.get(AuthenticationService);
//     storageService = TestBed.get(StorageService);
//     spyOn(store, 'dispatch');
//   });

//   afterEach(() => {
//     storageService = null;
//   });

//   fdescribe('sendLogs', () => {
//     const appVersion = '3';
//     const employeeId = '1234';
//     it('should send authenticated logs',  () => {
//       spyOn(storageService, 'read').and.returnValue(Promise.resolve(true));

//       // spyOn(storageService, 'read').and.returnValue('1.2.3');
//       const logs: Log[] = [mockLog(), mockLog()];

//       logProvider.sendLogs(logs).subscribe();

//       const r = logs.map((log) => ({ ...log, appVersion, employeeId }));

//       // spy.calls.mostRecent().returnValue.then((res) => { 
//       //   console.log(res);
//       //   expect(httpService.sendAuthenticatedLogs).toHaveBeenCalledWith(r);
//       // });
//     });
//   });

//   describe('sendUnauthLogs', () => {
//     it('should send unauthenticated logs', () => {
//       const unAuthLog: Log = {
//         ...mockLog(),
//         unauthenticated: true
//       };
//       const logs: Log[] = [unAuthLog, mockLog()];

//       logProvider.sendUnauthLogs(logs);

//       expect(httpService.sendUnauthenticatedLogs).toHaveBeenCalledWith([unAuthLog]);
//     });
//   });

//   describe('dispatchLog', () => {
//     it('should dispatch the SaveLog action', () => {
//       logProvider.dispatchLog(mockLog());

//       expect(store.dispatch).toHaveBeenCalledWith(new SaveLog(mockLog()));
//     });
//   });
// });
