import { StateReformingService } from "./state-reforming.service";
import { TestBed } from "@angular/core/testing";
import { StorageService } from "../natives/storage.service";
import { AppService } from "./app.service";
import { AppServiceMock } from "../../../test-config/services-mocks/app-service.mock";

describe('Provider: StateReformingService', () => {
  let stateReformingService: StateReformingService;
  let storageService: StorageService;
  let storageServiceSpy: any;
  let appService: AppService;

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['read']);

    TestBed.configureTestingModule({
      providers: [
        StateReformingService,
        {provide: AppService, useClass: AppServiceMock},
        {provide: StorageService, useValue: storageServiceSpy}
      ]
    });
    stateReformingService = TestBed.get(StateReformingService);
    storageService = TestBed.get(StorageService);
    appService = TestBed.get(AppService);
  });

  afterEach(() => {
    stateReformingService = null;
    storageService = null;
    appService = null;
  });
});
