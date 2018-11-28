import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppConfig } from "../../../config/app.config";
import { API } from "../../../config/config.enums";
import { AtfModel } from "../../models/atf.model";
import { DefectsModel } from "../../models/defects/defects.model";
import {TestTypeModel} from "../../models/test-types/test-type.model";
import {PreparersModel} from "../../models/preparers/preparers.model";

@Injectable()
export class HTTPService {

  constructor(private http: HttpClient) {
  }

  addTest(body): Observable<any> {
    return this.http.post(`${AppConfig.API_URL}${API.POST_TEST_URL}`, body);
  }

  getAtfs(): Observable<AtfModel[]> {
    return this.http.get<AtfModel[]>(`${AppConfig.API_URL}${API.GET_ATFS}`);
  }

  getDefects(): Observable<DefectsModel[]> {
    return this.http.get<DefectsModel[]>(`${AppConfig.API_URL}${API.GET_DEFECTS}`);
  }

  getTestTypes(): Observable<TestTypeModel[]> {
    return this.http.get<TestTypeModel[]>(`${AppConfig.API_URL}${API.GET_TESTTYPES}`);
  }

  getPreparers(): Observable<PreparersModel[]> {
    return this.http.get<PreparersModel[]>(`${AppConfig.API_URL}${API.GET_PREPARERS}`);
  }
}
