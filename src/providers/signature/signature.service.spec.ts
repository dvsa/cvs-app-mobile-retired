import { TestBed } from "@angular/core/testing";
import { SignatureService } from "./signature.service";
import { StorageService } from "../natives/storage.service";
import { HTTPService } from "../global/http.service";
import { VisitService } from "../visit/visit.service";
import { AuthService } from "../global/auth.service";
import { AuthServiceMock } from "../../../test-config/services-mocks/auth-service.mock";
import { VisitServiceMock } from "../../../test-config/services-mocks/visit-service.mock";


describe('SignatureService', () => {
  let signatureService: SignatureService;
  let storageService: StorageService;
  let storageServiceSpy: any;
  let httpService: HTTPService;
  let httpServiceSpy;
  let visitService: VisitService;
  let authService: AuthService;

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['create']);
    httpServiceSpy = jasmine.createSpyObj('HTTPService', ['saveSignature']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        SignatureService,
        {provide: VisitService, useClass: VisitServiceMock},
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: StorageService, useValue: storageServiceSpy},
        {provide: HTTPService, useValue: httpServiceSpy}
      ]
    });
    signatureService = TestBed.get(SignatureService);
    storageService = TestBed.get(StorageService);
    httpService = TestBed.get(HTTPService);
    visitService = TestBed.get(VisitService);
    authService = TestBed.get(AuthService);
  });


  afterEach(() => {
    signatureService = null;
    storageService = null;
    httpService = null;
    visitService = null;
    authService = null;
  });


  it('should save signature in storage', () => {
    signatureService.saveToStorage();
    expect(storageService.create).toHaveBeenCalled();
  });
});
