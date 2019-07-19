import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AlertController, IonicModule, NavParams, ViewController } from "ionic-angular";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestTypeDetailsInputPage } from "./test-type-details-input";
import { AlertControllerMock, ViewControllerMock } from "ionic-mocks";

describe('Component: TestTypeDetailsInputPage', () => {
  let component: TestTypeDetailsInputPage;
  let fixture: ComponentFixture<TestTypeDetailsInputPage>;
  let alertCtrl: AlertController;
  let viewCtrl: ViewController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestTypeDetailsInputPage],
      imports: [IonicModule.forRoot(TestTypeDetailsInputPage)],
      providers: [
        ChangeDetectorRef,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: AlertController, useFactory: () => AlertControllerMock.instance()},
        {provide: ViewController, useFactory: () => ViewControllerMock.instance()}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTypeDetailsInputPage);
    component = fixture.componentInstance;
    alertCtrl = TestBed.get(AlertController);
    viewCtrl = TestBed.get(ViewController);
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    alertCtrl = null;
    viewCtrl = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should test onDone logic', () => {
    component.errorIncomplete = true;
    component.inputValue = '045';
    component.vehicleCategory = 'B';
    component.onDone();
    expect(alertCtrl.create).toHaveBeenCalled();
    expect(component.errorIncomplete).toBeFalsy();
    component.vehicleCategory = 'A';
    component.inputValue = null;
    component.onDone();
    expect(viewCtrl.dismiss).toHaveBeenCalled();
    component.inputValue = '45';
    component.vehicleCategory = 'B';
    component.onDone();
    expect(viewCtrl.dismiss).toHaveBeenCalled();
  });
});
