import { TesterDetailsModel } from "../../src/models/tester-details.model";
import { AuthenticationResult, MSAdal } from "@ionic-native/ms-adal";
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

  private decodeJWT(token) {
    return this.decodedToken;
  }

  private setTesterDetails(authResponse: AuthenticationResult,
                           testerId = this.randomString(9),
                           testerName = this.randomString(9),
                           testerEmail = `${testerName}.${testerId}@email.com`): TesterDetailsModel {

    let details: TesterDetailsModel = {
      testerName,
      testerId,
      testerEmail
    };

    if (authResponse) {
      let decodedToken = this.decodeJWT(authResponse.accessToken);
      details.testerId = decodedToken['oid'];
      details.testerName = decodedToken['name'];
      details.testerEmail = decodedToken['upn'];
    }
    localStorage.setItem('tester-details', JSON.stringify(details));
    return details
  }


  private randomString(lenght: number): string {
    return Math.random().toString(36).substr(2, lenght);
  }
}
