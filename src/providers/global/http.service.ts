import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppConfig } from "../../../config/app.config";
import { AtfReferenceDataModel } from "../../models/reference-data-models/atf.model";
import { DefectCategoryModel } from "../../models/reference-data-models/defects.model";
import { TestTypesModel } from "../../models/reference-data-models/test-types.model";
import { PreparersModel } from "../../models/reference-data-models/preparers.model";

@Injectable()
export class HTTPService {

  constructor(private http: HttpClient) {
  }

  addTest(body): Observable<any> {
    return
  //   return this.http.post(`${AppConfig.API_URL}${API.POST_TEST_URL}`, body);
  }

  getAtfs(): Observable<AtfReferenceDataModel[]> {
    return this.http.get<AtfReferenceDataModel[]>(AppConfig.BACKEND_URL_ATF);
  }

  getDefects(): Observable<DefectCategoryModel[]> {
    return this.http.get<DefectCategoryModel[]>(AppConfig.BACKEND_URL_DEFECTS)
  }

  getTestTypes(): Observable<TestTypesModel[]> {
    return this.http.get<TestTypesModel[]>(AppConfig.BACKEND_URL_TESTTYPES);
  }

  getPreparers(): Observable<PreparersModel[]> {
    return this.http.get<PreparersModel[]>(AppConfig.BACKEND_URL_PREPARERS);
  }
}
