import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Data} from "@angular/router";
import {HTTPService} from "./http.service";

describe(`Provider: HttpService`, () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let testUrl = '';
  let httpService: HTTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HTTPService]
    });

    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    httpService = TestBed.get(HTTPService);
  });

  it('can test HttpClient.get', () => {
    const testData: Data = {name: 'Test Data'};
    httpClient.get<Data>(testUrl).subscribe(data => expect(data).toEqual(testData));
    const req = httpMock.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('can test for network error', () => {
    const emsg = 'simulated network error';
    httpClient.get<Data[]>(testUrl).subscribe(
      () => fail('should have failed with the network error'),
      (error: HttpErrorResponse) => {
        expect(error.error.message).toEqual(emsg, 'message');
      }
    );
    const req = httpMock.expectOne(testUrl);
    const mockError = new ErrorEvent('Network error', {
      message: emsg,
    });
    req.error(mockError);
  });

  afterEach(() => {
    httpMock.verify();
  })

});
