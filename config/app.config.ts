import * as app from "./application.json";

export class AppConfig {

  public static get AUTH_HEADERS() {
    let jsonData = app;
    return jsonData['AUTH_HEADERS'];
  }

  public static get AUTH_TOKEN() {
    let jsonData = app;
    return jsonData['AUTH_TOKEN'];
  }

  public static get AUTH_REGION() {
    let jsonData = app;
    return jsonData['AUTH_REGION'];
  }

  public static get AUTH_USER_POOL_ID() {
    let jsonData = app;
    return jsonData['AUTH_USER_POOL_ID'];
  }

  public static get AUTH_CLIENT_ID() {
    let jsonData = app;
    return jsonData['AUTH_CLIENT_ID'];
  }

  public static get AUTH_PASSWORD() {
    let jsonData = app;
    return jsonData['AUTH_PASSWORD'];
  }

  public static get AUTH_USERNAME() {
    let jsonData = app;
    return jsonData['AUTH_USERNAME'];
  }

  public static get KEY_GOOGLE_MAPS_KEY() {
    let jsonData = app;
    return jsonData['KEY_GOOGLE_MAPS_KEY'];
  }

  public static get KEY_PHONE_NUMBER() {
    let jsonData = app;
    return jsonData['KEY_PHONE_NUMBER'];
  }

  public static get BACKEND_GET_CERTIFICATE() {
    let jsonData = app;
    return jsonData['BACKEND_GET_CERTIFICATE'];
  }

  public static get BACKEND_URL_ATF() {
    let jsonData = app;
    return jsonData['BACKEND_URL_ATF'];
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
}
