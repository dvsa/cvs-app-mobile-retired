import {TestBed} from "@angular/core/testing";
import {AuthService} from "./auth.service";
import {LOCAL_STORAGE, TESTER_ROLES} from "../../app/app.enums";
import {MSAdal} from "@ionic-native/ms-adal";
import {Platform} from "ionic-angular";
import {CommonFunctionsService} from "../utils/common-functions";
import {NetworkStateProvider} from "../../modules/logs/network-state.service";
import {NetworkStateProviderMock} from "../../modules/logs/network-state.service.mock";
import {AuthServiceMock} from "../../../test-config/services-mocks/auth-service.mock";
import {FirebaseLogsService} from "../firebase-logs/firebase-logs.service";
import {Firebase} from "@ionic-native/firebase";

describe(`AuthService`, () => {
  let authService: AuthService;

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
        {provide: NetworkStateProvider, useClass: NetworkStateProviderMock},
        FirebaseLogsService,
        {provide: Firebase, useValue: jasmine.createSpyObj<Firebase>(['logEvent'])}
      ],
    });

    authService = TestBed.get(AuthService);
  });

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    authService = null;
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
});
