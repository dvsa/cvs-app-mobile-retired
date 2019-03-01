import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AlertController, IonicModule, NavController, NavParams } from "ionic-angular";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestAbandoningPage } from "./test-abandoning";
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import { TestTypeDataModelMock } from "../../../../assets/data-mocks/data-model/test-type-data-model.mock";
import { VisitService } from "../../../../providers/visit/visit.service";
import { VisitServiceMock } from "../../../../../test-config/services-mocks/visit-service.mock";
import { TestTypeService } from "../../../../providers/test-type/test-type.service";
import { TestTypeServiceMock } from "../../../../../test-config/services-mocks/test-type-service.mock";

describe('Component: TestAbandoningPage', () => {
  let component: TestAbandoningPage;
  let fixture: ComponentFixture<TestAbandoningPage>;
  let navCtrl: NavController;
  let navParams: NavParams;
  let alertCtrl: AlertController;
  let visitService: VisitService;

  let vehicleTest: TestTypeModel = TestTypeDataModelMock.TestTypeData;
  const selectedReasons = ['Best reason', 'Second best reason'];
  const additionalComment = 'Some additional comment';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestAbandoningPage],
      imports: [IonicModule.forRoot(TestAbandoningPage)],
      providers: [
        NavController,
        AlertController,
        {provide: VisitService, useClass: VisitServiceMock},
        {provide: TestTypeService, useClass: TestTypeServiceMock},
        {provide: NavParams, useClass: NavParamsMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAbandoningPage);
    component = fixture.componentInstance;
    navCtrl = TestBed.get(NavController);
    navParams = TestBed.get(NavParams);
    alertCtrl = TestBed.get(AlertController);
    visitService = TestBed.get(VisitService);
  });

  beforeEach(() => {
    const navParams = fixture.debugElement.injector.get(NavParams);

    navParams.get = jasmine.createSpy('get').and.callFake((param) => {
      const params = {
        'vehicleTest': vehicleTest,
        'selectedReasons': selectedReasons
      };
      return params[param];
    })
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should update the vehicleTestModel with abandonment object', () => {
    component.vehicleTest = navParams.get('vehicleTest');
    component.selectedReasons = navParams.get('selectedReasons');
    expect(component.vehicleTest.reasons.length).toEqual(0);
    expect(component.vehicleTest.additionalCommentsForAbandon).toEqual(null);
    component.additionalComment = additionalComment;
    component.updateVehicleTestModel();
    expect(component.vehicleTest.reasons.length).toEqual(2);
    expect(component.vehicleTest.additionalCommentsForAbandon).toEqual('Some additional comment');
  });

});
