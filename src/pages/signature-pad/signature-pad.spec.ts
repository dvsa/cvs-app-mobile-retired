import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SignaturePadPage } from "./signature-pad";
import { AlertController, Events, IonicModule, NavController, PopoverController } from "ionic-angular";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AppService } from "../../providers/global/app.service";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { OpenNativeSettings } from "@ionic-native/open-native-settings";
import { SignatureService } from "../../providers/signature/signature.service";
import { AlertControllerMock, EventsMock, NavControllerMock, PopoverControllerMock } from "ionic-mocks";
import { AppServiceMock } from "../../../test-config/services-mocks/app-service.mock";
import { SignaturePad } from "angular2-signaturepad/signature-pad";
import { CallNumber } from "@ionic-native/call-number";
import { Firebase } from "@ionic-native/firebase";
import { AuthService } from "../../providers/global/auth.service";
import { AuthServiceMock } from "../../../test-config/services-mocks/auth-service.mock";
import { Store } from "@ngrx/store";
import { TestStore } from "../../providers/interceptors/auth.interceptor.spec";

describe('Component: SignaturePadPage', () => {
  let fixture: ComponentFixture<SignaturePadPage>;
  let comp: SignaturePadPage;
  let appService: AppService;
  let signatureService: SignatureService;
  let signatureServiceSpy: any;
  let screenOrientationSpy: any;
  let openNativeSettingsSpy: any;
  let events: Events;
  let navCtrl: NavController;
  let popoverCtrl: PopoverController;
  let alertCtrl: AlertController;
  let screenOrientation: ScreenOrientation;
  let openNativeSettings: OpenNativeSettings;
  let signaturePad: SignaturePad;
  let signaturePadSpy: any;
  let callNumber: CallNumber;
  let callNumberSpy: any;

  beforeEach(async(() => {
    signatureServiceSpy = jasmine.createSpyObj('SignatureService', ['saveSignature', 'saveToStorage', 'presentSuccessToast']);
    screenOrientationSpy = jasmine.createSpyObj('ScreenOrientation', ['lock']);
    openNativeSettingsSpy = jasmine.createSpyObj('OpenNativeSettings', ['open']);
    signaturePadSpy = jasmine.createSpyObj('SignaturePad', ['clear', 'toDataURL', 'isEmpty']);
    callNumberSpy = jasmine.createSpyObj('CallNumber', ['callNumber']);

    TestBed.configureTestingModule({
      declarations: [
        SignaturePadPage
      ],
      imports: [
        IonicModule.forRoot(SignaturePadPage)
      ],
      providers: [
        Firebase,
        {provide: AppService, useClass: AppServiceMock},
        {provide: SignatureService, useValue: signatureServiceSpy},
        {provide: NavController, useFactory: () => NavControllerMock.instance()},
        {provide: PopoverController, useFactory: () => PopoverControllerMock.instance()},
        {provide: AlertController, useFactory: () => AlertControllerMock.instance()},
        {provide: ScreenOrientation, useValue: screenOrientationSpy},
        {provide: OpenNativeSettings, useValue: openNativeSettingsSpy},
        {provide: Events, useFactory: () => EventsMock.instance()},
        {provide: SignaturePad, useValue: signaturePadSpy},
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: Store, useClass: TestStore},
        {provide: CallNumber, useValue: callNumberSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignaturePadPage);
    comp = fixture.componentInstance;
    appService = TestBed.get(AppService);
    signatureService = TestBed.get(SignatureService);
    events = TestBed.get(Events);
    navCtrl = TestBed.get(NavController);
    popoverCtrl = TestBed.get(PopoverController);
    alertCtrl = TestBed.get(AlertController);
    screenOrientation = TestBed.get(ScreenOrientation);
    openNativeSettings = TestBed.get(OpenNativeSettings);
    signaturePad = TestBed.get(SignaturePad);
    callNumber = TestBed.get(CallNumber);
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    appService = null;
    signatureService = null;
    events = null;
    navCtrl = null;
    popoverCtrl = null;
    alertCtrl = null;
    screenOrientation = null;
    openNativeSettings = null;
    signaturePad = null;
    callNumber = null;
    callNumberSpy = null;
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('should assign values to dividerText and underSignText', () => {
    expect(comp.dividerText).toBeUndefined();
    expect(comp.underSignText).toBeUndefined();
    comp.ngOnInit();
    expect(comp.dividerText).toBeDefined();
    expect(comp.underSignText).toBeDefined();
  });

  it('should test if screenOrientation.lock was called on ionViewWillEnter lifecycle ', () => {
    comp.ionViewWillEnter();
    expect(screenOrientation.lock).not.toHaveBeenCalled();
  });

  it('should test if screenOrientation.lock was called on ionViewWillLeave lifecycle', () => {
    comp.ionViewWillLeave();
    expect(screenOrientation.lock).not.toHaveBeenCalled();
  });

  it('test showConfirm: alertCtrl.create haveBeenCalled', () => {
    comp.showConfirm();
    expect(alertCtrl.create).toHaveBeenCalled();
  });
});
