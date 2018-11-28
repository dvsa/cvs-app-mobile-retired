import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConfig} from "../../../config/app.config";
import {API} from "../../../config/config.enums";
import {AtfModel} from "../../models/atf.model";

@Injectable()
export class HTTPService {

  constructor(private http: HttpClient) {
  }

  addTest(body): Observable<any> {
    return this.http.post(`${AppConfig.API_URL}${API.POST_TEST_URL}`, body)
  }

  getAtfs() {
    return this.http.get<AtfModel[]>(`${AppConfig.API_URL}${API.GET_ATFS}`)
  }

  getDefects() {
    return this.http.get(`${AppConfig.API_URL}${API.GET_DEFECTS}`);
  }
}
