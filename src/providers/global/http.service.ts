import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppConfig } from "../../../config/app.config";
import { AtfReferenceDataModel } from "../../models/reference-data-models/atf.model";
import { DefectCategoryModel } from "../../models/reference-data-models/defects.model";
import { TestTypesReferenceDataModel } from "../../models/reference-data-models/test-types.model";
import { PreparersModel } from "../../models/reference-data-models/preparers.model";
import { PATHS } from "../../app/app.enums";
import { of } from "rxjs/observable/of";
import { TestResultsDataMock } from "../../assets/data-mocks/test-results-data.mock";
import { TestResultModel } from "../../models/tests/test-result.model";
import { VehicleModel } from "../../models/vehicle/vehicle.model";
import { AlertController, LoadingController } from "ionic-angular";
import { map, tap } from "rxjs/operators";

@Injectable()
export class HTTPService {

  constructor(private http: HttpClient) {
  }

  getAtfs(): Observable<AtfReferenceDataModel[]> {
    return this.http.get<AtfReferenceDataModel[]>(AppConfig.BACKEND_URL_ATF)
  }

  getDefects(): Observable<DefectCategoryModel[]> {
    return this.http.get<DefectCategoryModel[]>(AppConfig.BACKEND_URL_DEFECTS)
  }

  getTestTypes(): Observable<TestTypesReferenceDataModel[]> {
    return this.http.get<TestTypesReferenceDataModel[]>(AppConfig.BACKEND_URL_TESTTYPES);
  }

  getPreparers(): Observable<PreparersModel[]> {
    return this.http.get<PreparersModel[]>(AppConfig.BACKEND_URL_PREPARERS);
  }

  getTechRecords(param): Observable<VehicleModel> {
    return this.http.get<VehicleModel>(`${AppConfig.BACKEND_URL_TECHRECORDS}/${param}/${PATHS.TECH_RECORDS}/current`)
  }

  getTestResultsHistory(vin: string): Observable<TestResultModel[]> {
    return this.http.get<TestResultModel[]>(`${AppConfig.BACKEND_URL_GET_TEST_RESULTS}/${vin}`)
  }

}
