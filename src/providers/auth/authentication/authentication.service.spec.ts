import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { PlatformMock, StorageMock } from 'ionic-mocks';
import { Platform } from 'ionic-angular';
import { of } from 'rxjs/observable/of';
import { Storage } from '@ionic/storage';

import { VaultService } from './../vault/vault.service';
import { CommonFunctionsService } from '../../utils/common-functions';
import { AuthenticationService } from './authentication.service';
import { LogsProvider } from './../../../modules/logs/logs.service';
import { AUTH, CONNECTION_STATUS, TESTER_ROLES } from '../../../app/app.enums';
import { NetworkService } from '../../global';

describe('AuthenticationService', () => {
  let platform: Platform;
  let vaultService: VaultService;
  let vaultServiceSpy: any;
  let logProvider: LogsProvider;
  let logProviderSpy: any;
  let commFunc: CommonFunctionsService;
  let commonFuncSpy: any;
  let authenticationService: AuthenticationService;
  let networkService: NetworkService;
  let networkServiceSpy: jasmine.SpyObj<NetworkService>;

  const randomStr = 'xs@o';
  const obsStr = '***-nerd';
  const JWT_TOKEN_MOCK = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSld
  UIEJ1aWxkZXIiLCJpYXQiOjE2MTYwODYyMjMsImV4cCI6MTY0NzYyMjIyMywiYXVkIjoid3d3LmV4YW1wbGUuY29
  tIiwic3ViIjoiZjllNjQwOGUiLCJuYW1lIjoiY3ZzLXRlc3RpbmciLCJlbWFpbCI6ImphbWluZUB0ZXN0LmNvbSIsIn
  JvbGVzIjpbIkNWU0Z1bGxBY2Nlc3MiLCJDVlNQc3ZUZXN0ZXIiXSwiZW1wbG95ZWVJZCI6ImY5ZTY0MDhlLTc1Z
  GYtNDBhZS1hNWJhLTQxNjhhNDgwOGMzNSJ9.zW_4CbBPTbEq-OeV7McuGEXTrZLTwhFYvV6KNMc2cQE`;

  const ID_TOKEN_MOCK = {
    sub: '',
    name: 'A Tester',
    email: 'a.tester@dvsa.gov.uk',
    roles: [
      TESTER_ROLES.FULL_ACCESS,
      TESTER_ROLES.HGV
    ],
    oid: 'dfjfjhjdfgkgghjh',
    employeeid: '123456'
  }

  vaultServiceSpy = {
    ...jasmine.createSpyObj('VaultService', [
      'logout',
      'storeTesterObfuscatedId',
      'setDesiredAuthMode'
    ]),
    lockChanged: of(true)
  } as jasmine.SpyObj<VaultService>;

  logProviderSpy = jasmine.createSpyObj('LogsProvider', {
    dispatchLog: () => true
  });

  commonFuncSpy = jasmine.createSpyObj('CommonFunctionsService', {
    randomString: randomStr,
    getObfuscatedTesterOid: obsStr
  });

  networkServiceSpy = jasmine.createSpyObj('NetworkService', [
    'getNetworkState',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthenticationService,
        { provide: NetworkService, useValue: networkServiceSpy },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: VaultService, useValue: vaultServiceSpy },
        { provide: LogsProvider, useValue: logProviderSpy },
        { provide: CommonFunctionsService, useValue: commonFuncSpy },
        { provide: Storage, useFactory: () => StorageMock.instance() },
      ]
    });

    platform = TestBed.get(Platform);
    vaultService = TestBed.get(VaultService);
    logProvider = TestBed.get(LogsProvider);
    commFunc = TestBed.get(CommonFunctionsService);
    authenticationService = TestBed.get(AuthenticationService);
    networkService = TestBed.get(NetworkService);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  describe('execute', () => {
    let getAuthResponseSpy: jasmine.Spy;
    let getIdTokenSpy: jasmine.Spy;

    beforeEach(() => {
      platform.is = jasmine.createSpy('platform.is').and.returnValue(false);

      getIdTokenSpy = spyOn(authenticationService.auth, 'getIdToken');
      getIdTokenSpy.and.returnValue(Promise.resolve(ID_TOKEN_MOCK));

      getAuthResponseSpy = spyOn(authenticationService.auth, 'getAuthResponse');
      getAuthResponseSpy.and.returnValue(Promise.resolve({ id_token: JWT_TOKEN_MOCK }));
    });

    it('should compile', () => {
      expect(authenticationService).toBeDefined();
    });

    describe('expireTokens', () => {
      it('should call through to ionic auth expire() method', async () => {
        spyOn(authenticationService.auth, 'expire').and.returnValue(Promise.resolve());
        await authenticationService.expireTokens();
        expect(authenticationService.auth.expire).toHaveBeenCalled();
      });
    });

    describe('login', () => {

      it('should call through to ionic auth login() method', async () => {
        spyOn(authenticationService.auth, 'login').and.returnValue(Promise.resolve());
        await authenticationService.login();

        expect(vaultService.logout).toHaveBeenCalled();
        expect(vaultService.setDesiredAuthMode).toHaveBeenCalled();
        expect(authenticationService.auth.login).toHaveBeenCalled();
        expect(vaultService.storeTesterObfuscatedId).toHaveBeenCalledWith(obsStr);
      });
    });

    describe('hasUserRights', () => {
      it('should return truthy if user has access rights', async () => {
        await authenticationService.updateTokenInfo();
        const hasAccess = await authenticationService.hasUserRights([
          TESTER_ROLES.FULL_ACCESS,
          TESTER_ROLES.HGV
        ]);
        expect(hasAccess).toBeTruthy();
      });

      it('should return falsy if user do not have access rights', async () => {
        await authenticationService.updateTokenInfo();
        const hasAccess = await authenticationService.hasUserRights([TESTER_ROLES.TIR]);
        expect(hasAccess).toBeFalsy();
      });
    });

    describe('isUserAuthenticated', () => {
      it('should not attempt a new login when connection status is OFFLINE', async () => {
        networkService.getNetworkState = jasmine
          .createSpy('netWorkService.getNetworkState')
          .and.returnValue(CONNECTION_STATUS.OFFLINE);
        const authResult = await authenticationService.isUserAuthenticated();

        expect(authResult).toEqual({ active: true, action: AUTH.CONTINUE });
      });

      it('should return token status as "re-login" if token is not available via auth isAccessTokenAvailable', async () => {
        spyOn(authenticationService.auth, 'isAccessTokenAvailable').and.returnValue(false);

        const authResult = await authenticationService.isUserAuthenticated();

        expect(authResult).toEqual({ active: false, action: AUTH.RE_LOGIN });
      });

      it(`should return token status as "re-login" if token has expired and cannot be
      refreshed via auth refreshSession`, async () => {
        spyOn(authenticationService.auth, 'isAccessTokenAvailable').and.returnValue(true);
        spyOn(authenticationService, 'isTokenExpired').and.returnValue(Promise.resolve(true));
        spyOn(authenticationService.auth, 'refreshSession').and.throwError('smth');
        const authResult = await authenticationService.isUserAuthenticated();
        expect(authResult).toEqual({ active: false, action: AUTH.RE_LOGIN });
      });

      it(`should return token status as continue if token has not expired`, async () => {
        spyOn(authenticationService.auth, 'isAccessTokenAvailable').and.returnValue(true);
        spyOn(authenticationService, 'isTokenExpired').and.returnValue(Promise.resolve(false));

        const authResult = await authenticationService.isUserAuthenticated();
        expect(authResult).toEqual({ active: true, action: AUTH.CONTINUE });
      });
    });

    describe('checkUserAuthStatus', () => {
      let authStatus: jasmine.Spy;
      beforeEach(() => {
        authStatus = spyOn(authenticationService, 'isUserAuthenticated');
      });

      it('should return falsy on error if user auth status is to "re-login"', fakeAsync(
        async () => {
          spyOn(authenticationService, 'login').and.returnValue(
            Promise.reject(new Error('something'))
          );
          authStatus.and.returnValue({ active: false, action: AUTH.RE_LOGIN });
          try {
            flushMicrotasks();
            await authenticationService.checkUserAuthStatus();
            expect(logProvider.dispatchLog).toHaveBeenCalled();
            flushMicrotasks();
          } catch {}
        }
      ));

      it('should return truthy if user auth status is active', async () => {
        authStatus.and.returnValue({ active: true, action: AUTH.CONTINUE });

        const result = await authenticationService.checkUserAuthStatus();
        expect(result).toBeTruthy();
      });
    });

    describe('isTokenExpired()', () => {
      it('should return true if token is invalid', async() => {
        spyOn(authenticationService.auth, 'isAuthenticated').and.returnValue(Promise.resolve(true));
        getIdTokenSpy.and.returnValue(Promise.resolve(null));
        const isExpired = await authenticationService.isTokenExpired();
        expect(isExpired).toEqual(true);
      });
      it('should return false if token is valid', async() => {
        spyOn(authenticationService.auth, 'isAuthenticated').and.returnValue(Promise.resolve(true));
        getIdTokenSpy.and.returnValue(Promise.resolve({
          exp: 1919506719
        }));
        spyOn(authenticationService.auth, 'refreshSession').and.returnValue(Promise.resolve(true));
        const isExpired = await authenticationService.isTokenExpired();
        expect(isExpired).toEqual(false);
      });
    });
  });
});
