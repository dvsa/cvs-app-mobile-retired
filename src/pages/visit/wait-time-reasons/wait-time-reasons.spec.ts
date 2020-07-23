import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WaitTimeReasonsPage } from './wait-time-reasons';
import {
  AlertController,
  IonicModule,
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivityDataMock } from '../../../assets/data-mocks/activity.data.mock';
import { ViewControllerMock } from 'ionic-mocks';
import { ActivityModel } from '../../../models/visit/activity.model';
import { NavParamsMock } from '../../../../test-config/ionic-mocks/nav-params.mock';

describe('Component: WaitTimeReasonsPage', () => {
  let comp: WaitTimeReasonsPage;
  let fixture: ComponentFixture<WaitTimeReasonsPage>;
  let navCtrl: NavController;
  let navParams: NavParams;
  let alertCtrl: AlertController;

  const waitActivityData: ActivityModel = ActivityDataMock.WaitActivityData;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WaitTimeReasonsPage],
      imports: [IonicModule.forRoot(WaitTimeReasonsPage)],
      providers: [
        NavController,
        { provide: NavParams, useClass: NavParamsMock },
        { provide: ViewController, useFactory: () => ViewControllerMock.instance() },
        AlertController
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitTimeReasonsPage);
    comp = fixture.componentInstance;
    navCtrl = TestBed.get(NavController);
    navParams = TestBed.get(NavParams);
    alertCtrl = TestBed.get(AlertController);
  });

  beforeEach(() => {
    const navParams = fixture.debugElement.injector.get(NavParams);

    navParams.get = jasmine.createSpy('get').and.callFake((param) => {
      let params = {
        waitActivity: waitActivityData
      };
      return params[param];
    });
  });

  beforeEach(() => {
    comp.waitActivity = comp.navParams.get('waitActivity');
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    navCtrl = null;
    navParams = null;
    alertCtrl = null;
  });

  it('should create the component', (done) => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
    done();
  });

  it('should check ngOnInit logic', () => {
    comp.ngOnInit();
    expect(comp.selectedReasons).toBeTruthy();
    expect(comp.notes).toBeTruthy();
    waitActivityData.waitReason = [];
    comp.ngOnInit();
    expect(comp.selectedReasons.length).toBe(0);
    expect(comp.notes).toBeTruthy();
  });

  it('should push into array if reason is checked', () => {
    let reason = {
      isChecked: true,
      text: 'some reason'
    };
    let selectedReasons = [];
    comp.onCheck(reason, selectedReasons);
    expect(selectedReasons.length > 0).toBeTruthy();
    reason.isChecked = false;
    comp.onCheck(reason, selectedReasons);
    expect(selectedReasons.length == 0).toBeTruthy();
  });

  it('should check onSave logic', () => {
    spyOn(comp.alertCtrl, 'create');
    let selectedReasons = ['Waiting for vehicle', 'Admin'];
    comp.onSave(selectedReasons);
    expect(alertCtrl.create).toHaveBeenCalled();

    selectedReasons = ['Waiting for vehicle', 'Admin', 'Other'];
    comp.onSave(selectedReasons);
    expect(alertCtrl.create).toHaveBeenCalled();

    comp.waitActivity.notes = '';
    selectedReasons = ['Waiting for vehicle', 'Admin', 'Site issue'];
    comp.onSave(selectedReasons);
    expect(alertCtrl.create).toHaveBeenCalled();
  });
});
