import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { DefectsReferenceDataMock } from '../../../assets/data-mocks/reference-data-mocks/defects-data.mock';
import { PreparersDataMock } from '../../../assets/data-mocks/reference-data-mocks/preparers-data.mock';
import { TestStationDataMock } from '../../../assets/data-mocks/reference-data-mocks/test-station-data.mock';
import { TestTypesReferenceDataMock } from '../../../assets/data-mocks/reference-data-mocks/test-types.mock';
import { TechRecordDataMock } from '../../../assets/data-mocks/tech-record-data.mock';
import { TestResultsHistoryDataMock } from '../../../assets/data-mocks/test-results-history-data.mock';

@Injectable()
export class LocalMockInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('assets/offline-stubs')) {
      return of(new HttpResponse({
        status: 200,
        url: request.url,
        body: this.getBody(request.url),
      }));
    }
    return next.handle(request);
  }

  getBody = (url: string) => {
    if (url.includes('defects')) {
      console.info('Calling defects EP - Using stub');
      return DefectsReferenceDataMock.DefectsData;
    }
    else if (url.includes('prepares')) {
      console.info('Calling prepares EP - Using stub');
      return PreparersDataMock.PreparersData;
    }
    else if (url.includes('test-station')) {
      console.info('Calling test-station EP - Using stub');
      return TestStationDataMock.TestStationData;
    }
    else if (url.includes('test-types')) {
      console.info('Calling test-types EP - Using stub');
      return TestTypesReferenceDataMock.TestTypesData;
    }
    else if (url.includes('activities') && !url.includes('testerStaffId')) {
      console.info('Calling activities EP - Using stub');
      return { "id": "some-dummy-guid-xxxxxxx" };
    }
    else if (url.includes('activities/open?testerStaffId')) {
      console.info('Calling activities open EP - Using stub');
      return true;
    }
    else if (url.includes('vehicles')) {
      console.info('Calling vehicle tech record EP - Using stub');
      return [TechRecordDataMock.VehicleTechRecordData];
    }
    else if (url.includes('test-results') && !url.endsWith('test-results')) {
      console.info('Calling test results EP - Using stub');
      return TestResultsHistoryDataMock.TestResultHistoryData;
    }
    else if (url.includes('test-results') && url.endsWith('test-results')) {
      console.info('Calling test history submission EP - Using stub');
      return TestResultsHistoryDataMock.TestResultHistoryData;
    }
    else {
      return null;
    }
  }
}
