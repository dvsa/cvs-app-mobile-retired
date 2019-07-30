import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { FIREBASE_AUTH, LOCAL_STORAGE, TESTER_ROLES } from "../../app/app.enums";
import { MSAdal } from "@ionic-native/ms-adal";
import { Platform } from "ionic-angular";
import { CommonFunctionsService } from "../utils/common-functions";
import { FirebaseLogsService } from "../firebase-logs/firebase-logs.service";
import { Firebase } from "@ionic-native/firebase";
import { Store } from "@ngrx/store";
import { TestStore } from "../interceptors/auth.interceptor.spec";
import { FirebaseLogsServiceMock } from "../../../test-config/services-mocks/firebaseLogsService.mock";
import { AppConfig } from "../../../config/app.config";

describe(`AuthService`, () => {
  let authService: AuthService;
  let firebaseService: FirebaseLogsService;

  // dummy hand crafted jwt token for testing purpose only
  const JWT_TOKEN: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvaWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwidXBuIjoidGVzdEBlbWFpbC5jb20iLCJyb2xlcyI6WyJDVlNQc3ZUZXN0ZXIiXSwidGlkIjoiMTIzNDU2Nzg5MCJ9.9prTaDS-toi8z6HUbuhm5es1IcRp-BHVAqxjuu7C7-k';
  const JWT_TOKEN_EMPTY: string = '';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthService,
        CommonFunctionsService,
        Platform,
        MSAdal,
        {provide: FirebaseLogsService, useClass: FirebaseLogsServiceMock},
        {provide: Store, useClass: TestStore},
        {provide: Firebase, useValue: jasmine.createSpyObj<Firebase>(['logEvent'])}
      ],
    });

    authService = TestBed.get(AuthService);
    firebaseService = TestBed.get(FirebaseLogsService);
  });

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    authService = null;
    firebaseService = null;
    localStorage.clear();
  });

  it('should not add the JWT Token into localstorage', () => {
    expect(localStorage.getItem(LOCAL_STORAGE.JWT_TOKEN)).toBeFalsy();
    authService.setJWTToken(JWT_TOKEN_EMPTY);
    expect(localStorage.getItem(LOCAL_STORAGE.JWT_TOKEN)).toBeFalsy();
  });

  it('should add the JWT Token into localstorage', () => {
    expect(localStorage.getItem(LOCAL_STORAGE.JWT_TOKEN)).toBeFalsy();
    authService.setJWTToken(JWT_TOKEN);
    expect(localStorage.getItem(LOCAL_STORAGE.JWT_TOKEN)).toBeTruthy();
  });

  it('should get the JWT Token', () => {
    expect(localStorage.getItem(LOCAL_STORAGE.JWT_TOKEN)).toBeFalsy();
    authService.setJWTToken(JWT_TOKEN);
    expect(localStorage.getItem(LOCAL_STORAGE.JWT_TOKEN)).toBeTruthy();
    expect(authService.getJWTToken()).toBe(JWT_TOKEN);
  });

  it('should decode the token', () => {
    let decodedToken;
    expect(decodedToken).toBeUndefined();
    decodedToken = authService.decodeJWT(JWT_TOKEN);
    expect(decodedToken).toBeTruthy();
  });

  it('should set the default tester details', () => {
    let details;
    expect(details).toBeUndefined();
    details = authService.setTesterDetails(null);
    expect(details).toBeTruthy();
  });

  it('should check if user has rights', () => {
    let userRoles = [TESTER_ROLES.FULL_ACCESS];
    let neededRoles = [TESTER_ROLES.PSV, TESTER_ROLES.FULL_ACCESS];
    let hasRights = authService.hasRights(userRoles, neededRoles);
    expect(hasRights).toBeTruthy();

    userRoles = [];
    neededRoles = [TESTER_ROLES.PSV, TESTER_ROLES.FULL_ACCESS];
    hasRights = authService.hasRights(userRoles, neededRoles);
    expect(hasRights).toBeFalsy();
  });

  it('should set default tester details with no authResponse', () => {
    let result = authService.setTesterDetails(null);
    expect(result.testerId).toBeTruthy();
    expect(result.testerEmail).toBeTruthy();
    expect(result.testerName).toBeTruthy();
    expect(result.testerRoles[0]).toBe(TESTER_ROLES.FULL_ACCESS);
  });

  it('should set default tester details with authResponse', () => {
    let authResponse = {
      accessToken: JWT_TOKEN,
    };

    let result = authService.setTesterDetails(authResponse);
    expect(result.testerId).toBeTruthy();
    expect(result.testerEmail).toBeTruthy();
    expect(result.testerName).toBeTruthy();
    expect(result.testerRoles[0]).toBe(TESTER_ROLES.PSV);
  });

  it('should set the tenantId with authResponse', () => {
    authService.setTesterDetails({accessToken: JWT_TOKEN});
    expect(authService.tenantId).toBe('1234567890');
  });

  it('should set the tester details in localStorage', () => {
    authService.setTesterDetails({accessToken: JWT_TOKEN});
    expect(localStorage.getItem('tester-details')).toEqual(JSON.stringify({
      testerName: "John Doe",
      testerId: "1234567890",
      testerEmail: "test@email.com",
      testerRoles: [TESTER_ROLES.PSV]
    }));
  });

  it('should test if it is valid token', () => {
    expect(authService.isValidToken(JWT_TOKEN)).toBeTruthy();
    expect(authService.isValidToken(null)).toBeFalsy();
  });

  it('should log a login attempt', () => {
    spyOn(firebaseService, 'logEvent');
    authService.logFirebaseLoginAttempt(false);
    expect(firebaseService.logEvent).toHaveBeenCalledWith(FIREBASE_AUTH.LOGIN_ATTEMPT, FIREBASE_AUTH.CLIENT_ID, AppConfig.MSAL_CLIENT_ID,
      FIREBASE_AUTH.REDIRECT_URL, AppConfig.MSAL_REDIRECT_URL,
      FIREBASE_AUTH.RESOURCE_URL, AppConfig.MSAL_RESOURCE_URL);
  });

  it('should log a silent login attempt', () => {
    spyOn(firebaseService, 'logEvent');
    authService.logFirebaseLoginAttempt(true);
    expect(firebaseService.logEvent).toHaveBeenCalledWith(FIREBASE_AUTH.LOGIN_ATTEMPT,
      FIREBASE_AUTH.CLIENT_ID, AppConfig.MSAL_CLIENT_ID,
      FIREBASE_AUTH.RESOURCE_URL, AppConfig.MSAL_RESOURCE_URL);
  });

  it('should log a successful login', () => {
    spyOn(firebaseService, 'logEvent');
    authService.logFirebaseLoginSuccessful();
    expect(firebaseService.logEvent).toHaveBeenCalledWith(FIREBASE_AUTH.LOGIN_SUCCESSFUL,
      FIREBASE_AUTH.CLIENT_ID, AppConfig.MSAL_CLIENT_ID,
      FIREBASE_AUTH.TENANT_ID, authService.tenantId,
      FIREBASE_AUTH.OID, authService.testerDetails.testerId,
      FIREBASE_AUTH.USER_ROLES, authService.userRoles.toString());
  });

  it('should log an unsuccessful login', () => {
    spyOn(firebaseService, 'logEvent');
    authService.logFirebaseLoginUnsuccessful('error');
    expect(firebaseService.logEvent).toHaveBeenCalledWith(FIREBASE_AUTH.LOGIN_UNSUCCESSFUL,
      FIREBASE_AUTH.ERROR_MESSAGE, 'error',
      FIREBASE_AUTH.CLIENT_ID, AppConfig.MSAL_CLIENT_ID);
  });
});
