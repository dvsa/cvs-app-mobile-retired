import { SiteVisitFailedPage } from './site-visit-failed';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertController, IonicModule, NavController, NavParams } from 'ionic-angular';
import { NavParamsMock } from '../../../test-config/ionic-mocks/nav-params.mock';
import { StateReformingService } from '../../providers/global/state-reforming.service';
import { StateReformingServiceMock } from '../../../test-config/services-mocks/state-reforming-service.mock';
import { AlertControllerMock, NavControllerMock } from 'ionic-mocks';
import { CallNumber } from '@ionic-native/call-number';
import { ANALYTICS_EVENT_CATEGORIES, ANALYTICS_EVENTS, ANALYTICS_VALUE, APP_STRINGS } from '../../app/app.enums';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AnalyticsService, AppAlertService } from '../../providers/global';

describe('Component: SiteVisitFailedPage', () => {
  let comp: SiteVisitFailedPage;
  let fixture: ComponentFixture<SiteVisitFailedPage>;
  let navCtrl: NavController;
  let alertCtrl: AlertController;
  let alertService: AppAlertService;
  let alertServiceSpy: any;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;

  beforeEach(async(() => {
    alertServiceSpy = jasmine.createSpyObj('AppAlertService', ['callSupport']);
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', [
      'logEvent',
      'setCurrentPage'
    ]);

    TestBed.configureTestingModule({
      declarations: [SiteVisitFailedPage],
      imports: [IonicModule.forRoot(SiteVisitFailedPage)],
      providers: [
        CallNumber,
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useClass: NavParamsMock },
        { provide: StateReformingService, useClass: StateReformingServiceMock },
        { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
        { provide: AppAlertService, useValue: alertServiceSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteVisitFailedPage);
    comp = fixture.componentInstance;
    navCtrl = TestBed.get(NavController);
    alertCtrl = TestBed.get(AlertController);
    alertService = TestBed.get(AppAlertService);
    analyticsService = TestBed.get(AnalyticsService);
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    navCtrl = null;
    alertCtrl = null;
  });

  it('should create component', (done) => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
    done();
  });

  it('should test ionViewWillEnter logic', () => {
    comp.messageOne = 'qwerty';
    comp.messageTwo = 'qwerty';
    comp.messageThree = 'qwerty';
    comp.ionViewWillEnter();
    expect(comp.messageOne).toEqual(
      APP_STRINGS.FAILED_MESSAGE_END_VISIT_ONE
    );
    expect(comp.messageTwo).toEqual(
      APP_STRINGS.FAILED_MESSAGE_END_VISIT_TWO
    );
    expect(comp.messageThree).toEqual(
      APP_STRINGS.FAILED_MESSAGE_END_VISIT_THREE
    );
  });

  it('should create the call support alert', async () => {
    await comp.callSupport();
    expect(analyticsService.logEvent).toHaveBeenCalledWith({
      category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
      event: ANALYTICS_EVENTS.VISIT_ERROR,
      label: ANALYTICS_VALUE.CALL_IT
    });
    expect(alertService.callSupport).toHaveBeenCalled();
  });

  it('should test pressing on confirm logic', async () => {
    await comp.confirm();
    expect(analyticsService.logEvent).toHaveBeenCalledWith({
      category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
      event: ANALYTICS_EVENTS.VISIT_ERROR,
      label: ANALYTICS_VALUE.CONFIRMED_FAILED_SUBMISSION
    });
    expect(navCtrl.popToRoot).toHaveBeenCalled();
  });
});
