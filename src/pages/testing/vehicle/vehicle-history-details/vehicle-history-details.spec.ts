import { VehicleHistoryDetailsPage } from "./vehicle-history-details";
import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { IonicModule, NavController, NavParams, ViewController } from "ionic-angular";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ViewControllerMock } from "../../../../../test-config/ionic-mocks/view-controller.mock";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { CommonFunctionsService } from "../../../../providers/utils/common-functions";
import { PipesModule } from "../../../../pipes/pipes.module";

describe('Component: VehicleHistoryDetailsPage', () => {
  let comp: VehicleHistoryDetailsPage;
  let fixture: ComponentFixture<VehicleHistoryDetailsPage>;
  let navCtrl: NavController;
  let commonFunctionsService: any;

  beforeEach(async(() => {
  
    TestBed.configureTestingModule({
      declarations: [VehicleHistoryDetailsPage],
      imports: [
        IonicModule.forRoot(VehicleHistoryDetailsPage),
        PipesModule
      ],
      providers: [
        NavController,
        CommonFunctionsService,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: ViewController, useClass: ViewControllerMock},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleHistoryDetailsPage);
    comp = fixture.componentInstance;
    navCtrl = TestBed.get(NavController);
    commonFunctionsService = TestBed.get(CommonFunctionsService);
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it('should return the correct color', () => {
    expect(commonFunctionsService.getTestResultColor('pass')).toEqual('secondary');
    expect(commonFunctionsService.getTestResultColor('fail')).toEqual('danger');
    expect(commonFunctionsService.getTestResultColor('abandoned')).toEqual('danger');
    expect(commonFunctionsService.getTestResultColor('prs')).toEqual('tertiary');
  });

});
