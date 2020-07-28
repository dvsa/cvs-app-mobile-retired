import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { AuthInterceptor } from "./auth.interceptor";
import { HTTPService } from "../global/http.service";
import { Data } from "@angular/router";
import { AuthService } from "../global/auth.service";
import { of } from "rxjs/observable/of";
import { Store } from "@ngrx/store";
import { AuthServiceMock } from "../../../test-config/services-mocks/auth-service.mock";

export class TestStore {
  dispatch() {}
}

describe(`AuthHttpInterceptor`, () => {
  let httpClient: HttpClient;
  let HttpService: HTTPService;
  let authServiceSpy: any;
  let httpMock: HttpTestingController;
  const TEST_URL: string = "";
  // dummy hand crafted jwt token for testing purpose only
  const JWT_TOKEN: string =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvaWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwidXBuIjoidGVzdEBlbWFpbC5jb20ifQ.BlL6ll8xB4iGqDn_KB2mezWRFMHRqbRu-NxDB3443s0";
  let store;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj("AuthService", {
      getJWTToken: of(JWT_TOKEN),
    });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HTTPService,
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Store, useClass: TestStore },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    httpClient = TestBed.get(HttpClient);
    HttpService = TestBed.get(HTTPService);
    authServiceSpy = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    store = TestBed.get(Store);
  });

  afterEach(() => {
    httpClient = null;
    HttpService = null;
    authServiceSpy = null;
    httpMock = null;
  });

  it("should add an Authentication header", () => {
    const testData: Data = { name: "Test Data" };
    spyOn(store, "dispatch");
    httpClient.get<Data>(TEST_URL).subscribe((data) => {
      expect(data).toEqual(testData);
      const httpRequest = httpMock.expectOne(TEST_URL);
      expect(httpRequest.request.headers.has("Authorization")).toBeTruthy();
    });

    expect(store.dispatch).toHaveBeenCalled();
  });
});
