import { VehicleHistoryPage } from "./vehicle-history";
import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { IonicModule, NavController, NavParams, ViewController } from "ionic-angular";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ViewControllerMock } from "../../../../../test-config/ionic-mocks/view-controller.mock";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { VehicleDataMock } from "../../../../assets/data-mocks/vehicle-data.mock";
import { PipesModule } from "../../../../pipes/pipes.module";
import { TestResultsHistoryDataMock } from "../../../../assets/data-mocks/test-results-history-data.mock";
import { TestTypeArrayDataMock } from "../../../../assets/data-mocks/test-type-array-data.mock";

describe('Component: VehicleHistoryPage', () => {
  let comp: VehicleHistoryPage;
  let fixture: ComponentFixture<VehicleHistoryPage>;
  let navCtrl: NavController;
  let navParams: NavParams;
  let commonFunctionsService: any;

  let testResultsHistory: any = TestResultsHistoryDataMock.TestResultHistoryData;
  let vehicleData: VehicleDataMock = VehicleDataMock;
  let testTypeArray = TestTypeArrayDataMock.TestTypeArrayData;

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
});
