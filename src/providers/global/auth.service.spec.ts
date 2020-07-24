import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { LOCAL_STORAGE, TESTER_ROLES } from "../../app/app.enums";
import { MSAdal } from "@ionic-native/ms-adal";
import { Platform } from "ionic-angular";
import { CommonFunctionsService } from "../utils/common-functions";
import { Store } from "@ngrx/store";
import { TestStore } from "../interceptors/auth.interceptor.spec";

describe(`AuthService`, () => {
  let authService: AuthService;

  // dummy hand crafted jwt token for testing purpose only
  const JWT_TOKEN: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvaWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwidXBuIjoidGVzdEBlbWFpbC5jb20iLCJyb2xlcyI6WyJDVlNQc3ZUZXN0ZXIiXSwidGlkIjoiMTIzNDU2Nzg5MCIsImVtcGxveWVlaWQiOiIwOTg3NjU0MzIxIn0.Qwu_-GoMkgxGnyMfIDQlVak0dQAUX27lYSnX0P4Htq0';
  const JWT_TOKEN_EMPLOYEEID_EMPTY: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvaWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwidXBuIjoidGVzdEBlbWFpbC5jb20iLCJyb2xlcyI6WyJDVlNQc3ZUZXN0ZXIiXSwidGlkIjoiMTIzNDU2Nzg5MCIsImVtcGxveWVlaWQiOiIifQ.8gWAj1UNgfbj-MTmT3u21rW7VTVnnHsXl3pVSxzroQ0';
  const JWT_TOKEN_EMPLOYEEID_MISSING: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvaWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwidXBuIjoidGVzdEBlbWFpbC5jb20iLCJyb2xlcyI6WyJDVlNQc3ZUZXN0ZXIiXSwidGlkIjoiMTIzNDU2Nzg5MCJ9.9prTaDS-toi8z6HUbuhm5es1IcRp-BHVAqxjuu7C7-k';
  const JWT_TOKEN_EMPTY: string = '';
  const EMPLOYEEID = '0987654321';
  const OID = '1234567890';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthService,
        CommonFunctionsService,
        Platform,
        MSAdal,
        {provide: Store, useClass: TestStore}
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
    let result = authService.setTesterDetails({accessToken: JWT_TOKEN});
    expect(result.testerId).toBeTruthy();
    expect(result.testerEmail).toBeTruthy();
    expect(result.testerName).toBeTruthy();
    expect(result.testerRoles[0]).toBe(TESTER_ROLES.PSV);
  });

  it('should set testerID to employeeid if both OID and employeeid are present', () => {
    let result = authService.setTesterDetails({accessToken: JWT_TOKEN});
    expect(result.testerId).toBe(EMPLOYEEID);
    expect(result.testerId).not.toBe(OID);
  });

  it('should set testerID to OID if employeeid is missing', () => {
    let result = authService.setTesterDetails({accessToken: JWT_TOKEN_EMPLOYEEID_MISSING});
    expect(result.testerId).toBeTruthy();
    expect(result.testerId).toBe(OID);
    expect(result.testerId).not.toBe(EMPLOYEEID);
  });

  it('should set testerID to OID if employeeid is empty', () => {
    let result = authService.setTesterDetails({accessToken: JWT_TOKEN_EMPLOYEEID_EMPTY});
    expect(result.testerId).toBeTruthy();
    expect(result.testerId).toBe(OID);
    expect(result.testerId).not.toBe(EMPLOYEEID);
  });

  it('should set the tenantId with authResponse', () => {
    authService.setTesterDetails({accessToken: JWT_TOKEN});
    expect(authService.tenantId).toBe('1234567890');
  });



  it('should set the tester details in localStorage', () => {//this fails
    authService.setTesterDetails({accessToken: JWT_TOKEN});
    expect(localStorage.getItem('tester-details')).toEqual(JSON.stringify({
      testerName: "John Doe",
      testerId: "0987654321",
      testerEmail: "test@email.com",
      testerRoles: [TESTER_ROLES.PSV]
    }));
  });

  it('should test if it is valid token', () => {
    expect(authService.isValidToken(JWT_TOKEN)).toBeTruthy();
    expect(authService.isValidToken(null)).toBeFalsy();
  });
});
