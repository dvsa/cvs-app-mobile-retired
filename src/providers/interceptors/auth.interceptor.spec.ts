import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {AuthInterceptor} from "./auth.interceptor";
import {HTTPService} from "../global/http.service";
import {AUTH} from "../../../config/config.enums";
import {Data} from "@angular/router";

describe(`AuthHttpInterceptor`, () => {
  let httpClient: HttpClient;
  let service: HTTPService;
  let httpMock: HttpTestingController;
  let testUrl: string = '';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HTTPService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    httpClient = TestBed.get(HttpClient);
    service = TestBed.get(HTTPService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should add an Authentication header', () => {
    const testData: Data = {name: 'Test Data'};
    httpClient.get<Data>(testUrl).subscribe(
      data => {
        expect(data).toEqual(testData)
      });
    const httpRequest = httpMock.expectOne(testUrl);
    expect(httpRequest.request.headers.has(`${AUTH.HEADERS}`)).toEqual(true);
  });

});
