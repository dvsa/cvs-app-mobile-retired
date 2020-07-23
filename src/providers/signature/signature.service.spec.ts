import { TestBed } from '@angular/core/testing';
import { SignatureService } from './signature.service';
import { StorageService } from '../natives/storage.service';
import { HTTPService } from '../global/http.service';
import { AuthService } from '../global/auth.service';
import { AuthServiceMock } from '../../../test-config/services-mocks/auth-service.mock';
import { AppService } from '../global/app.service';
import { AppServiceMock } from '../../../test-config/services-mocks/app-service.mock';
import { Events, ToastController } from 'ionic-angular';
import { APP_STRINGS, SIGNATURE_STATUS } from '../../app/app.enums';
import { ToastControllerMock } from 'ionic-mocks';

describe('SignatureService', () => {
  let signatureService: SignatureService;
  let storageService: StorageService;
  let storageServiceSpy: any;
  let httpService: HTTPService;
  let httpServiceSpy;
  let appService: AppService;
  let authService: AuthService;
  let eventsSpy: any;
  let events: Events;
  let toastCtrl: ToastController;

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['create']);
    httpServiceSpy = jasmine.createSpyObj('HTTPService', ['saveSignature']);
    eventsSpy = jasmine.createSpyObj('Events', ['unsubscribe']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        SignatureService,
        { provide: Events, useValue: eventsSpy },
        { provide: ToastController, useFactory: () => ToastControllerMock.instance() },
        { provide: AppService, useClass: AppServiceMock },
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: HTTPService, useValue: httpServiceSpy }
      ]
    });
    signatureService = TestBed.get(SignatureService);
    storageService = TestBed.get(StorageService);
    httpService = TestBed.get(HTTPService);
    appService = TestBed.get(AppService);
    authService = TestBed.get(AuthService);
    events = TestBed.get(Events);
    toastCtrl = TestBed.get(ToastController);
  });

  afterEach(() => {
    signatureService = null;
    storageService = null;
    httpService = null;
    appService = null;
    authService = null;
  });

  it('should check if saveSignature haveBeenCalled', () => {
    signatureService.signatureString = '22charsofgibberish////dGVzdA==';
    signatureService.saveSignature();
    expect(httpService.saveSignature).toHaveBeenCalled();
    expect(httpService.saveSignature).toHaveBeenCalledWith(undefined, 'dGVzdA==');
  });

  it('should save signature in storage', () => {
    signatureService.saveToStorage();
    expect(storageService.create).toHaveBeenCalled();
  });

  it('should test if events.unsubscribe haveBeenCalled', () => {
    let toast = toastCtrl.create();
    expect(toastCtrl.create).toHaveBeenCalled();
    signatureService.presentSuccessToast();
    expect(events.unsubscribe).toHaveBeenCalledWith(SIGNATURE_STATUS.SAVED);
    expect(events.unsubscribe).toHaveBeenCalledWith(SIGNATURE_STATUS.ERROR);
    expect(toast.present).toHaveBeenCalled();
  });
});
