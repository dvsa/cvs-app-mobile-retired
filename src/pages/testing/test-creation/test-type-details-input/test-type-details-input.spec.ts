import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertController, IonicModule, NavParams, ViewController } from 'ionic-angular';
import { NavParamsMock } from '../../../../../test-config/ionic-mocks/nav-params.mock';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestTypeDetailsInputPage } from './test-type-details-input';
import { AlertControllerMock } from 'ionic-mocks';
import { ViewControllerMock } from '../../../../../test-config/ionic-mocks/view-controller.mock';
import { TEST_TYPE_FIELDS } from '../../../../app/app.enums';

describe('Component: TestTypeDetailsInputPage', () => {
  let comp: TestTypeDetailsInputPage;
  let fixture: ComponentFixture<TestTypeDetailsInputPage>;

  let navParams: NavParamsMock;
  let alertCtrl: AlertController;
  let viewCtrl: ViewControllerMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestTypeDetailsInputPage],
      imports: [IonicModule.forRoot(TestTypeDetailsInputPage)],
      providers: [
        ChangeDetectorRef,
        { provide: NavParams, useClass: NavParamsMock },
        { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
        { provide: ViewController, useClass: ViewControllerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTypeDetailsInputPage);
    comp = fixture.componentInstance;
    navParams = TestBed.get(NavParams);
    alertCtrl = TestBed.get(AlertController);
    viewCtrl = TestBed.get(ViewController);
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    alertCtrl = null;
    viewCtrl = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it('should test ngOnInit logic', () => {
    expect(comp.testTypeFields).toBe(undefined);
    comp.ngOnInit();
    expect(comp.testTypeFields).toBe(TEST_TYPE_FIELDS);
  });

  it('should dismiss the view', () => {
    spyOn(viewCtrl, 'dismiss');
    comp.onCancel();
    expect(viewCtrl.dismiss).toHaveBeenCalled();
  });

  it('should test onDone logic', () => {
    spyOn(viewCtrl, 'dismiss');
    comp.vehicleCategory = 'B';
    comp.inputValue = '0322';
    comp.onDone();
    expect(alertCtrl.create).toHaveBeenCalled();
    comp.vehicleCategory = 'A';
    comp.inputValue = '566';
    comp.onDone();
    expect(viewCtrl.dismiss).toHaveBeenCalled();
  });
});
