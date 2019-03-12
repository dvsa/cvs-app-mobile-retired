import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { LOCAL_STORAGE } from "../../app/app.enums";
import { MSAdal } from "@ionic-native/ms-adal";
import { Platform } from "ionic-angular";
import { CommonFunctionsService } from "../utils/common-functions";

describe(`AuthService`, () => {
  let authService: AuthService;

  // dummy hand crafted jwt token for testing purpose only
  const JWT_TOKEN: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvaWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwidXBuIjoidGVzdEBlbWFpbC5jb20ifQ.BlL6ll8xB4iGqDn_KB2mezWRFMHRqbRu-NxDB3443s0';
  const JWT_TOKEN_EMPTY: string = '';

  // var AppConfigMock = function () {
  //   function AppConfig() {
  //   }
  //
  //   Object.defineProperty(AppConfig, "STAFF_ID_KEY", {
  //     get: function () {
  //       return 'StaffId';
  //     },
  //     enumerable: true,
  //     configurable: true
  //   });
  //
  //   return AppConfig;
  // };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthService,
        CommonFunctionsService,
        Platform,
        MSAdal
      ],
    });

    authService = TestBed.get(AuthService);
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
});
