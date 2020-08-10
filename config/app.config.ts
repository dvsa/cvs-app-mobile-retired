import * as app from "./application.json";

export class AppConfig {
  public static get MSAL_CLIENT_ID() {
    const jsonData = app;
    return jsonData['MSAL_CLIENT_ID'];
  }

  public static get STAFF_ID_KEY() {
    const jsonData = app;
    return jsonData['STAFF_ID_KEY'];
  }

  public static get MSAL_REDIRECT_URL() {
    const jsonData = app;
    return jsonData['MSAL_REDIRECT_URL'];
  }

  public static get MSAL_RESOURCE_URL() {
    const jsonData = app;
    return jsonData['MSAL_RESOURCE_URL'];
  }

  public static get MSAL_AUTHORITY() {
    const jsonData = app;
    return jsonData['MSAL_AUTHORITY'];
  }

  public static get KEY_PHONE_NUMBER() {
    const jsonData = app;
    return jsonData['KEY_PHONE_NUMBER'];
  }

  public static get BACKEND_URL_TEST_STATIONS() {
    const jsonData = app;
    return jsonData['BACKEND_URL_TEST_STATIONS'];
  }

  public static get BACKEND_URL_DEFECTS() {
    const jsonData = app;
    return jsonData['BACKEND_URL_DEFECTS'];
  }

  public static get BACKEND_URL_PREPARERS() {
    const jsonData = app;
    return jsonData['BACKEND_URL_PREPARERS'];
  }

  public static get BACKEND_URL_TESTTYPES() {
    const jsonData = app;
    return jsonData['BACKEND_URL_TESTTYPES'];
  }

  public static get BACKEND_URL_TECHRECORDS() {
    const jsonData = app;
    return jsonData['BACKEND_URL_TECHRECORDS'];
  }

  public static get BACKEND_URL_TEST_RESULTS() {
    const jsonData = app;
    return jsonData['BACKEND_URL_TEST_RESULTS'];
  }

  public static get BACKEND_URL_VISIT() {
    const jsonData = app;
    return jsonData['BACKEND_URL_VISIT'];
  }

  public static get BACKEND_URL_SIGNATURE() {
    const jsonData = app;
    return jsonData['BACKEND_URL_SIGNATURE'];
  }

  public static get BACKEND_URL_LOGS() {
    const jsonData = app;
    return jsonData['BACKEND_URL_LOGS'];
  }

  public static get BACKEND_URL_UNAUTH_LOGS() {
    const jsonData = app;
    return jsonData['BACKEND_URL_UNAUTH_LOGS'];
  }

  public static get UNAUTH_LOGS_API_KEY() {
    const jsonData = app;
    return jsonData['UNAUTH_LOGS_API_KEY'];
  }

  public static get IS_PRODUCTION() {
    const jsonData = app;
    return jsonData['IS_PRODUCTION'];
  }

  public static get URL_LATEST_VERSION() {
    return app['URL_LATEST_VERSION'];
  }
}
