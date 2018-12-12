import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AlertController, IonicModule, NavController, NavParams } from "ionic-angular";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestAbandoningPage } from "./test-abandoning";
import { VehicleTestModel } from "../../../../models/vehicle-test.model";

describe('Component: ReasonsSelectionPage', () => {
  let component: TestAbandoningPage;
  let fixture: ComponentFixture<TestAbandoningPage>;
  let navCtrl: NavController;
  let navParams: NavParams;
  let alertCtrl: AlertController;

  let vehicleTest = new VehicleTestModel('testName', false, new Date(), 12, new Date());
  const selectedReasons = ['Best reason', 'Second best reason'];
  const additionalComment = 'Some additional comment';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestAbandoningPage],
      imports: [IonicModule.forRoot(TestAbandoningPage)],
      providers: [
        NavController,
        AlertController,
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
    expect(component.vehicleTest.getAbandonment().reasons.length).toEqual(0);
    expect(component.vehicleTest.getAbandonment().additionalComment).toEqual('');
    component.additionalComment = additionalComment;
    component.updateVehicleTestModel();
    expect(component.vehicleTest.getAbandonment().reasons.length).toEqual(2);
    expect(component.vehicleTest.getAbandonment().additionalComment).toEqual('Some additional comment');
  });

});