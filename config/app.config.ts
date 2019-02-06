import * as app from "./application.json";

export class AppConfig {

  public static get KEY_PHONE_NUMBER() {
    let jsonData = app;
    return jsonData['KEY_PHONE_NUMBER'];
  }

  public static get BACKEND_GET_CERTIFICATE() {
    let jsonData = app;
    return jsonData['BACKEND_GET_CERTIFICATE'];
  }

  public static get BACKEND_URL_TEST_STATIONS() {
    let jsonData = app;
    return jsonData['BACKEND_URL_TEST_STATIONS'];
  }

  public static get BACKEND_URL_DEFECTS() {
    let jsonData = app;
    return jsonData['BACKEND_URL_DEFECTS'];
  }

  public static get BACKEND_URL_PREPARERS() {
    let jsonData = app;
    return jsonData['BACKEND_URL_PREPARERS'];
  }

  public static get BACKEND_URL_TESTTYPES() {
    let jsonData = app;
    return jsonData['BACKEND_URL_TESTTYPES'];
  }

  public static get BACKEND_URL_TECHRECORDS() {
    let jsonData = app;
    return jsonData['BACKEND_URL_TECHRECORDS'];
  }

  public static get BACKEND_URL_GET_TEST_RESULTS() {
    let jsonData = app;
    return jsonData['BACKEND_URL_GET_TEST_RESULTS'];
  }

  public static get IS_PRODUCTION() {
    let jsonData = app;
    return jsonData['IS_PRODUCTION'];
  }
}
