import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Events, LoadingController, ViewController } from "ionic-angular";
import { SignaturePopoverComponent } from "./signature-popover";
import { EventsMock, LoadingControllerMock, ViewControllerMock } from "ionic-mocks";
import { SignatureService } from "../../providers/signature/signature.service";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { APP_STRINGS } from "../../app/app.enums";
import { SignatureServiceMock } from "../../../test-config/services-mocks/signature-service.mock";
import { AppService } from "../../providers/global/app.service";
import { AppServiceMock } from "../../../test-config/services-mocks/app-service.mock";
import { Firebase } from "@ionic-native/firebase";

describe('Component: SignaturePopoverComponent', () => {
  let fixture: ComponentFixture<SignaturePopoverComponent>;
  let comp: SignaturePopoverComponent;
  let signatureService: SignatureService;
  let viewCtrl: ViewController;
  let loadingCtrl: LoadingController;
  let events: Events;
  let appService: AppService;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        SignaturePopoverComponent
      ],
      providers: [
        Firebase,
        {provide: Events, useFactory: () => EventsMock},
        {provide: SignatureService, useClass: SignatureServiceMock},
        {provide: ViewController, useFactory: () => ViewControllerMock.instance()},
        {provide: LoadingController, useFactory: () => LoadingControllerMock.instance()},
        {provide: AppService, useClass: AppServiceMock}
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

  it('check if loading.present and vieCtrl.dismiss have been called', () => {
    let loading = loadingCtrl.create();
    comp.confirmPop();
    expect(loading.present).toHaveBeenCalled();
  });
});
