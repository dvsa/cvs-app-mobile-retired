import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppConfig } from "../../../config/app.config";
import { TestStationReferenceDataModel } from "../../models/reference-data-models/test-station.model";
import { TestTypesReferenceDataModel } from "../../models/reference-data-models/test-types.model";
import { PreparersReferenceDataModel } from "../../models/reference-data-models/preparers.model";
import { PATHS } from "../../app/app.enums";
import { TestResultModel } from "../../models/tests/test-result.model";
import { DefectItemReferenceDataModel } from "../../models/reference-data-models/defects.reference-model";
import { VehicleTechRecordModel } from "../../models/vehicle/tech-record.model";

@Injectable()
export class HTTPService {

  constructor(private http: HttpClient) {
  }

  getAtfs(): Observable<TestStationReferenceDataModel[]> {
    return this.http.get<TestStationReferenceDataModel[]>(AppConfig.BACKEND_URL_TEST_STATIONS)
  }

  getDefects(): Observable<DefectItemReferenceDataModel[]> {
    return this.http.get<DefectItemReferenceDataModel[]>(AppConfig.BACKEND_URL_DEFECTS)
  }

  getTestTypes(): Observable<TestTypesReferenceDataModel[]> {
    return this.http.get<TestTypesReferenceDataModel[]>(AppConfig.BACKEND_URL_TESTTYPES);
  }

  getPreparers(): Observable<PreparersReferenceDataModel[]> {
    return this.http.get<PreparersReferenceDataModel[]>(AppConfig.BACKEND_URL_PREPARERS);
  }

  getTechRecords(param): Observable<VehicleTechRecordModel> {
    return this.http.get<VehicleTechRecordModel>(`${AppConfig.BACKEND_URL_TECHRECORDS}/${param}/${PATHS.TECH_RECORDS}/?status=current`);
  }

  getTestResultsHistory(vin: string): Observable<TestResultModel[]> {
    return this.http.get<TestResultModel[]>(`${AppConfig.BACKEND_URL_TEST_RESULTS}/${vin}`)
  }

  postTestResult(body): Observable<any>{
    return this.http.post<TestResultModel>(AppConfig.BACKEND_URL_TEST_RESULTS, body)
  }

}
