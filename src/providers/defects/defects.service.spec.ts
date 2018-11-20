import { TestBed } from "@angular/core/testing";
import { StorageService } from "../natives/storage.service";
import { DefectsService } from "./defects.service";

describe('Provider: DefectsService', () => {
  let defectsService: DefectsService;
  let storageService: StorageService;
  let spy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DefectsService,
        {provide: StorageService, useValue: spy}
      ]
    });

    defectsService = TestBed.get(DefectsService);
    storageService = TestBed.get(StorageService);
  });

  afterEach(() => {
    defectsService = null;
    storageService = null;
  });

  it('should return badge\'s correct color', () => {
    expect(defectsService.getBadgeColor('Major')).toBe('danger')
  });


});
