import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppConfig } from "../../../config/app.config";
import { API } from "../../../config/config.enums";
import { AtfReferenceDataModel } from "../../models/reference-data-models/atf.model";
import { DefectCategoryModel } from "../../models/reference-data-models/defects.model";
import { TestTypesModel } from "../../models/reference-data-models/test-types.model";
import { PreparersModel } from "../../models/reference-data-models/preparers.model";

@Injectable()
export class HTTPService {

  constructor(private http: HttpClient) {
  }

  addTest(body): Observable<any> {
    return this.http.post(`${AppConfig.API_URL}${API.POST_TEST_URL}`, body);
  }

  getAtfs(): Observable<AtfReferenceDataModel[]> {
    return this.http.get<AtfReferenceDataModel[]>(`${AppConfig.API_URL}${API.GET_ATFS}`);
  }

  getDefects(): Observable<DefectCategoryModel[]> {
    return this.http.get<DefectCategoryModel[]>(`${AppConfig.API_URL}${API.GET_DEFECTS}`)
  }

  getTestTypes(): Observable<TestTypesModel[]> {
    return this.http.get<TestTypesModel[]>(`${AppConfig.API_URL}${API.GET_TESTTYPES}`);
  }

  getPreparers(): Observable<PreparersModel[]> {
    return this.http.get<PreparersModel[]>(`${AppConfig.API_URL}${API.GET_PREPARERS}`);
  }
}
