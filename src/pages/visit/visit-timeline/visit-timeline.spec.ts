import { VisitTimelinePage } from "./visit-timeline";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  IonicModule,
  NavController,
  LoadingController,
  Events,
  AlertController,
  NavParams,
  ToastController
} from "ionic-angular";
import { PipesModule } from "../../../pipes/pipes.module";
import { Firebase } from "@ionic-native/firebase";
import { StateReformingService } from "../../../providers/global/state-reforming.service";
import { StateReformingServiceMock } from "../../../../test-config/services-mocks/state-reforming-service.mock";
import {
  LoadingControllerMock,
  EventsMock,
  NavControllerMock,
  AlertControllerMock,
  NavParamsMock,
  ToastControllerMock
} from "ionic-mocks";
import { AppService } from "../../../providers/global/app.service";
import { AppServiceMock } from "../../../../test-config/services-mocks/app-service.mock";
import { TestService } from "../../../providers/test/test.service";
import { TestServiceMock } from "../../../../test-config/services-mocks/test-service.mock";
import { VisitService } from "../../../providers/visit/visit.service";
import { VisitServiceMock } from "../../../../test-config/services-mocks/visit-service.mock";
import { StorageService } from "../../../providers/natives/storage.service";
import { StorageServiceMock } from "../../../../test-config/services-mocks/storage-service.mock";
import { OpenNativeSettings } from "@ionic-native/open-native-settings";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { VisitDataMock } from "../../../assets/data-mocks/visit-data.mock";
import { AuthService } from "../../../providers/global/auth.service";
import { AuthServiceMock } from "../../../../test-config/services-mocks/auth-service.mock";
import { Store } from "@ngrx/store";
import { TestStore } from "../../../providers/interceptors/auth.interceptor.spec";

describe('Component: VisitTimelinePage', () => {
  let component: VisitTimelinePage;
  let fixture: ComponentFixture<VisitTimelinePage>;
  let openNativeSettings: OpenNativeSettings;
  let openNativeSettingsSpy: any;
  let loadingCtrl: LoadingController;

  beforeEach(() => {
    openNativeSettingsSpy = jasmine.createSpyObj('OpenNativeSettings', ['open']);

    TestBed.configureTestingModule({
      declarations: [VisitTimelinePage],
      imports: [
        IonicModule.forRoot(VisitTimelinePage),
        PipesModule
      ],
      providers: [
        Firebase,
        {provide: NavController, useFactory: () => NavControllerMock.instance()},
        {provide: NavParams, useClass: NavParamsMock},
        {provide: StateReformingService, useClass: StateReformingServiceMock},
        {provide: LoadingController, useFactory: () => LoadingControllerMock.instance()},
        {provide: AlertController, useFactory: () => AlertControllerMock.instance()},
        {provide: ToastController, useFactory: () => ToastControllerMock.instance()},
        {provide: AppService, useClass: AppServiceMock},
        {provide: Events, useFactory: () => EventsMock},
        {provide: TestService, useClass: TestServiceMock},
        {provide: VisitService, useClass: VisitServiceMock},
        {provide: StorageService, useClass: StorageServiceMock},
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: Store, useClass: TestStore},
        {provide: OpenNativeSettings, useValue: openNativeSettingsSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitTimelinePage);
    component = fixture.componentInstance;
    loadingCtrl = TestBed.get(LoadingController);
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    loadingCtrl = null;
  });

  it('should create component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should test confirmEndVisit', () => {
    component.visit = VisitDataMock.VisitData;
    component.confirmEndVisit();
    expect(loadingCtrl.create).toHaveBeenCalled();
  });
});
