import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { TestStationReferenceDataModel } from '../../src/models/reference-data-models/test-station.model';
import { DefectItemReferenceDataModel } from '../../src/models/reference-data-models/defects.reference-model';
import { TestTypesReferenceDataModel } from '../../src/models/reference-data-models/test-types.model';
import { PreparersReferenceDataModel } from '../../src/models/reference-data-models/preparers.model';
import { LatestVersionModel } from '../../src/models/latest-version.model';
import { HTTPService } from '../../src/providers/global';
import { ActivityModel } from '../../src/models/visit/activity.model';
import { Log } from '../../src/modules/logs/logs.model';
import { VehicleTechRecordModel } from '../../src/models/vehicle/tech-record.model';
import { TestResultModel } from '../../src/models/tests/test-result.model';

export class HttpServiceMock extends HTTPService {
  readonly TIMEOUT: number;

  getAtfs(): Observable<HttpResponse<TestStationReferenceDataModel[]>> {
    return of();
  }

  getDefects(): Observable<HttpResponse<DefectItemReferenceDataModel[]>> {
    return of();
  }

  getTestTypes(): Observable<HttpResponse<TestTypesReferenceDataModel[]>> {
    return of();
  }

  getPreparers(): Observable<HttpResponse<PreparersReferenceDataModel[]>> {
    return of();
  }

  getApplicationVersion(): Promise<HttpResponse<LatestVersionModel>> {
    return of({} as HttpResponse<LatestVersionModel>).toPromise();
  }

  endVisit(visitID: string): Observable<HttpResponse<any>> {
    return of();
  }

  getOpenVisitCheck(testerStaffId: string): Observable<HttpResponse<boolean>> {
    return of();
  }

  getTechRecords(param: string, searchCriteria: string): Observable<HttpResponse<VehicleTechRecordModel[]>> {
    return of();
  }

  getTestResultsHistory(systemNumber: string): Observable<HttpResponse<TestResultModel[]>> {
    return of();
  }

  postActivity(activities: ActivityModel): Observable<HttpResponse<any>> {
    return of();
  }

  postTestResult(body): Observable<HttpResponse<any>> {
    return of();
  }

  saveSignature(staffId: string, signatureString: string): Observable<HttpResponse<any>> {
    return of();
  }

  sendAuthenticatedLogs(logs: Log[]): Observable<HttpResponse<any>> {
    return of();
  }

  sendUnauthenticatedLogs(logs: Log[]): Observable<HttpResponse<any>> {
    return of();
  }

  startVisit(activities: ActivityModel): Observable<HttpResponse<any>> {
    return of();
  }

  updateActivity(activities): Observable<HttpResponse<any>> {
    return of();
  }
}
