import { TestBed } from "@angular/core/testing";
import { SignatureService } from "./signature.service";
import { StorageService } from "../natives/storage.service";
import { HTTPService } from "../global/http.service";
import { AuthService } from "../global/auth.service";
import { AuthServiceMock } from "../../../test-config/services-mocks/auth-service.mock";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { AppService } from "../global/app.service";
import { AppServiceMock } from "../../../test-config/services-mocks/app-service.mock";
import { App, Events, ToastController } from "ionic-angular";
import { ToastControllerMock } from "ionic-mocks";


describe('SignatureService', () => {
  let signatureService: SignatureService;
  let storageService: StorageService;
  let storageServiceSpy: any;
  let httpService: HTTPService;
  let httpServiceSpy;
  let appService: AppService;
  let authService: AuthService;

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['create']);
    httpServiceSpy = jasmine.createSpyObj('HTTPService', ['saveSignature']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        SignatureService,
        ScreenOrientation,
        Events,
        {provide: ToastController, useFactory: () => ToastControllerMock.instance()},
        {provide: AppService, useClass: AppServiceMock},
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: StorageService, useValue: storageServiceSpy},
        {provide: HTTPService, useValue: httpServiceSpy}
      ]
    });
    signatureService = TestBed.get(SignatureService);
    storageService = TestBed.get(StorageService);
    httpService = TestBed.get(HTTPService);
    appService = TestBed.get(AppService);
    authService = TestBed.get(AuthService);
  });


  afterEach(() => {
    signatureService = null;
    storageService = null;
    httpService = null;
    appService = null;
    authService = null;
  });

  it('should save signature in storage', () => {
    signatureService.saveToStorage();
    expect(storageService.create).toHaveBeenCalled();
  });
});
