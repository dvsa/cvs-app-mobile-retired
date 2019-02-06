import { TesterDetailsModel } from "../../src/models/tester-details.model";
import { MSAdal } from "@ionic-native/ms-adal";
import { Observable } from "rxjs";
import { STORAGE } from "../../src/app/app.enums";
import { of } from "rxjs/observable/of";

export class AuthServiceMock {
  testerDetails: TesterDetailsModel;
  jwtToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvaWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwidXBuIjoidGVzdEBlbWFpbC5jb20ifQ.BlL6ll8xB4iGqDn_KB2mezWRFMHRqbRu-NxDB3443s0';
  decodedToken = {
    "oid": "1234567890",
    "name": "John Doe",
    "upn": "test@email.com"
  };

  constructor() {
    this.testerDetails = {} as TesterDetailsModel;
    this.jwtToken = '';
  }

  login(): Observable<string> {
    return of(this.jwtToken)
  }

  setJWTToken(token) {
    this.jwtToken = token
    localStorage.setItem(STORAGE.JWT_TOKEN, this.jwtToken);
  }

  getJWTToken() {
    return this.jwtToken
  }

  private setTesterDetails(token) {
    let decodedToken = this.decodeJWT(token);

    this.testerDetails.testerId = decodedToken['oid'];
    this.testerDetails.testerName = decodedToken['name'];
    this.testerDetails.testerEmail = decodedToken['upn'];
  }

  private decodeJWT(token) {
    return this.decodedToken;
  }
}
