import { VehicleHistoryPage } from "./vehicle-history";
import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { IonicModule, NavController, NavParams, ViewController } from "ionic-angular";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ViewControllerMock } from "../../../../../test-config/ionic-mocks/view-controller.mock";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { VehicleDataMock } from "../../../../assets/data-mocks/vehicle-data.mock";
import { PipesModule } from "../../../../pipes/pipes.module";

describe('Component: VehicleHistoryPage', () => {
  let comp: VehicleHistoryPage;
  let fixture: ComponentFixture<VehicleHistoryPage>;
  let navCtrl: NavController;
  let navParams: NavParams;
  let commonFunctionsService: any;
  let testResultsHistory: any = 
  [
    {
      "reasonForCancellation": null,
      "testerStaffId": "123",
      "testerName": "test",
      "euVehicleCategory": "m1",
      "vehicleId": "BQ91YHQ",
      "testStationName": "Abshire-Kub",
      "testStationPNumber": "09-4129632",
      "testEndTimestamp": "2019-04-18T12:32:41.662Z",
      "preparerId": "No preparer ID given",
      "vehicleConfiguration": "rigid",
      "vrm": "BQ91YHQ",
      "testerEmailAddress": "test",
      "vehicleClass": {
          "description": "small psv (ie: less than or equal to 22 seats)",
          "code": "s"
      },
      "odometerReadingUnits": "kilometres",
      "vehicleSize": "small",
      "testStartTimestamp": "2019-04-18T12:31:55.638Z",
      "vehicleType": "psv",
      "odometerReading": 21,
      "preparerName": null,
      "noOfAxles": 2,
      "testStationType": "gvts",
      "numberOfSeats": 50,
      "vin": "1B7GG36N12S678410",
      "countryOfRegistration": "gb",
      "testStatus": "submitted",
      "testTypes": [{
        "prohibitionIssued": false,
        "testCode": "aas",
        "lastUpdatedAt": "2019-04-18T12:32:42.135Z",
        "testNumber": "123",
        "testAnniversaryDate": "2020-02-18T12:32:49.931Z",
        "additionalCommentsForAbandon": null,
        "numberOfSeatbeltsFitted": null,
        "testTypeEndTimestamp": "2019-04-18T12:32:41.663Z",
        "reasonForAbandoning": null,
        "lastSeatbeltInstallationCheckDate": null,
        "createdAt": "2019-04-18T12:32:42.135Z",
        "testExpiryDate": "2020-04-17T12:32:49.931Z",
        "testTypeId": "1",
        "testTypeStartTimestamp": "2019-04-18T12:32:33.365Z",
        "certificateNumber": "123",
        "testTypeName": "Annual test",
        "seatbeltInstallationCheckDate": false,
        "additionalNotesRecorded": null,
        "defects": [],
        "name": "Annual test",
        "testResult": "pass"
      }]
    }, 
    {
      "reasonForCancellation": null,
      "testerStaffId": "123",
      "testerName": "test",
      "euVehicleCategory": "m1",
      "vehicleId": "BQ91YHQ",
      "testStationName": "Abshire-Kub",
      "testStationPNumber": "09-4129632",
      "testEndTimestamp": "2019-01-21T12:36:35.532Z",
      "preparerId": "No preparer ID given",
      "vehicleConfiguration": "rigid",
      "vrm": "BQ91YHQ",
      "testerEmailAddress": "test",
      "vehicleClass": {
          "description": "small psv (ie: less than or equal to 22 seats)",
          "code": "s"
      },
      "odometerReadingUnits": "kilometres",
      "vehicleSize": "small",
      "testStartTimestamp": "2019-01-21T12:36:09.258Z",
      "vehicleType": "psv",
      "odometerReading": 12,
      "preparerName": null,
      "noOfAxles": 2,
      "testStationType": "gvts",
      "numberOfSeats": 50,
      "vin": "1B7GG36N12S678410",
      "countryOfRegistration": "gb",
      "testStatus": "submitted",
      "testTypes": [{
        "prohibitionIssued": false,
        "testCode": "aas",
        "lastUpdatedAt": "2019-04-18T12:36:36.340Z",
        "testNumber": "123",
        "testAnniversaryDate": "2020-02-18T12:36:38.121Z",
        "additionalCommentsForAbandon": null,
        "numberOfSeatbeltsFitted": null,
        "testTypeEndTimestamp": "2019-04-18T12:36:35.533Z",
        "reasonForAbandoning": null,
        "lastSeatbeltInstallationCheckDate": null,
        "createdAt": "2019-04-18T12:36:36.340Z",
        "testExpiryDate": "2020-04-17T12:36:38.121Z",
        "testTypeId": "1",
        "testTypeStartTimestamp": "2019-04-18T12:36:28.422Z",
        "certificateNumber": "123",
        "testTypeName": "Annual test",
        "seatbeltInstallationCheckDate": false,
        "additionalNotesRecorded": null,
        "defects": [],
        "name": "Annual test",
        "testResult": "pass"
      }]
    }
  ];
  
  let vehicleData: VehicleDataMock = VehicleDataMock;

  let testTypeArray = [
    {
      "testIndex": 0,
      "testTypeIndex": 1,
      "prohibitionIssued": false,
      "testCode": "abc",
      "testNumber": "1",
      "lastUpdatedAt": "2019-02-22T08:50:16.706Z",
      "additionalCommentsForAbandon": "none",
      "numberOfSeatbeltsFitted": 2,
      "testTypeEndTimestamp": "2019-01-14T10:36:33.987Z",
      "reasonForAbandoning": "none",
      "lastSeatbeltInstallationCheckDate": "2019-01-14",
      "createdAt": "2019-02-22T08:50:16.706Z",
      "testTypeId": "12",
      "testTypeStartTimestamp": "2019-01-14T10:36:33.987Z",
      "certificateNumber": "12334",
      "testTypeName": "Annual test",
      "seatbeltInstallationCheckDate": true,
      "additionalNotesRecorded": "VEHICLE FRONT ROW SECOND SEAT HAS MISSING SEATBELT",
      "defects": [],
      "name": "Annual test",
      "certificateLink": "url",
      "testResult": "fail"
    },
    {
      "testIndex": 0,
      "testTypeIndex": 2,
      "prohibitionIssued": false,
      "testNumber": "1",
      "additionalCommentsForAbandon": "none",
      "numberOfSeatbeltsFitted": 2,
      "testTypeEndTimestamp": "2019-01-15T10:36:33.987Z",
      "reasonForAbandoning": "none",
      "lastSeatbeltInstallationCheckDate": "2019-01-14",
      "testExpiryDate": "2020-02-21T08:47:59.749Z",
      "testTypeId": "1",
      "testTypeStartTimestamp": "2019-01-15T10:36:33.987Z",
      "certificateNumber": "1234",
      "testTypeName": "Annual test",
      "seatbeltInstallationCheckDate": true,
      "additionalNotesRecorded": "VEHICLE FRONT REGISTRATION PLATE MISSING",
      "defects": [],
      "name": "Annual test",
      "testResult": "pass"
    }
  ];

  beforeEach(async(() => {
  
    TestBed.configureTestingModule({
      declarations: [VehicleHistoryPage],
      imports: [
        IonicModule.forRoot(VehicleHistoryPage),
        PipesModule
      ],
      providers: [
        NavController,
        CommonFunctionsService,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: ViewController, useClass: ViewControllerMock},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleHistoryPage);
    comp = fixture.componentInstance;
    navCtrl = TestBed.get(NavController);
    navParams = TestBed.get(NavParams);
    commonFunctionsService = TestBed.get(CommonFunctionsService);
  });

  beforeEach(() => {
    const navParams = fixture.debugElement.injector.get(NavParams);

    navParams.get = jasmine.createSpy('get').and.callFake((param) => {
      let params = {
        'vehicleData': vehicleData,
        'testResultsHistory': testResultsHistory
      };
      return params[param];
    })

  });

  beforeEach(() => {
    comp.vehicleData = navParams.get('vehicleData');
    comp.testResultHistory = navParams.get('testResultsHistory');
    comp.testResultHistoryClone = comp.testResultHistory;
    comp.testTypeArray = testTypeArray;
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
  });

  it('should create the component', (done) => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
    done();
  });

  it('should create an array called testTypeArray if testHistory exists', () => {
    comp.testTypeArray = [];
    comp.createTestTypeArray();
    expect(comp.testTypeArray.length).toBeTruthy();
  });

  it('should not create an array called testTypeArray if testHistory does not exists', () => {
    comp.testTypeArray = [];
    comp.testResultHistory = [];
    comp.createTestTypeArray();
    expect(comp.testTypeArray.length).toBeFalsy();
  });

  it('should not create an array called testTypeArray if testStatus in not submitted', () => {
    comp.testTypeArray = [];
    comp.testResultHistory[0].testStatus = 'cancelled';
    comp.testResultHistory[1].testStatus = 'cancelled';
    comp.createTestTypeArray();
    expect(comp.testTypeArray.length).toBeFalsy();
  });

  it('should order the dates of each test type if testTypeArray is not empty', () => {
    comp.orderTestTypeArrayByDate();
    let firstDate = +new Date(comp.testTypeArray[0].testTypeStartTimestamp);
    let nextDate = +new Date(comp.testTypeArray[1].testTypeStartTimestamp);
    expect(firstDate).toBeGreaterThan(nextDate);
  });

  it('should not order the dates if testTypeArray is empty', () => {
    comp.testTypeArray = [];
    comp.orderTestTypeArrayByDate();
    expect(comp.testTypeArray.length).toBeFalsy();
  });

});
