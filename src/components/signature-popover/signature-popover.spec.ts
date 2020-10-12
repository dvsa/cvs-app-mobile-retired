import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Events, LoadingController, ViewController } from 'ionic-angular';
import { SignaturePopoverComponent } from './signature-popover';
import { LoadingControllerMock, ViewControllerMock } from 'ionic-mocks';
import { SignatureService } from '../../providers/signature/signature.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { APP_STRINGS } from '../../app/app.enums';
import { SignatureServiceMock } from '../../../test-config/services-mocks/signature-service.mock';
import { AppService } from '../../providers/global/app.service';
import { AppServiceMock } from '../../../test-config/services-mocks/app-service.mock';
import { AuthService } from '../../providers/global/auth.service';
import { AuthServiceMock } from '../../../test-config/services-mocks/auth-service.mock';
import { Store } from '@ngrx/store';
import { TestStore } from '../../providers/interceptors/auth.interceptor.spec';
import { LogsProvider } from '../../modules/logs/logs.service';

describe('Component: SignaturePopoverComponent', () => {
  let fixture: ComponentFixture<SignaturePopoverComponent>;
  let comp: SignaturePopoverComponent;
  let signatureService: SignatureServiceMock;
  let viewCtrl: ViewController;
  let loadingCtrl: LoadingController;
  let events: Events;
  let appService: AppService;
  let store: Store<any>;
  let logProvider: LogsProvider;
  let logProviderSpy;

  beforeEach(async(() => {
    logProviderSpy = jasmine.createSpyObj('LogsProvider', {
      dispatchLog: () => true
    });

    TestBed.configureTestingModule({
      declarations: [SignaturePopoverComponent],
      providers: [
        Events,
        { provide: SignatureService, useClass: SignatureServiceMock },
        { provide: ViewController, useFactory: () => ViewControllerMock.instance() },
        { provide: LoadingController, useFactory: () => LoadingControllerMock.instance() },
        { provide: AppService, useClass: AppServiceMock },
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Store, useClass: TestStore },
        { provide: LogsProvider, useValue: logProviderSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignaturePopoverComponent);
    comp = fixture.componentInstance;
    signatureService = TestBed.get(SignatureService);
    viewCtrl = TestBed.get(ViewController);
    loadingCtrl = TestBed.get(LoadingController);
    events = TestBed.get(Events);
    appService = TestBed.get(AppService);
    store = TestBed.get(Store);
    logProvider = TestBed.get(LogsProvider);
  });

  it('should create', () => {
    expect(comp).toBeDefined();
    comp.ngOnInit();
    expect(comp.title).toMatch(APP_STRINGS.SIGN_CONF_TITLE);
    expect(comp.msg).toMatch(APP_STRINGS.SIGN_CONF_MSG);
  });

  it('viewController.dismiss called', () => {
    comp.closePop();
    expect(viewCtrl.dismiss).toHaveBeenCalled();
  });

  it('check confirmPop for successful case on saveSignature method', () => {
    comp.ngOnInit();
    signatureService.isError = false;
    comp.confirmPop();
    expect(comp.loading.present).toHaveBeenCalled();
  });

  it('check confirmPop for error case on saveSignature method', () => {
    comp.ngOnInit();
    signatureService.isError = true;
    comp.confirmPop();
    expect(comp.loading.present).toHaveBeenCalled();
  });
});
