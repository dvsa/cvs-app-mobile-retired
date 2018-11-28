import { TestBed } from "@angular/core/testing";
import { StorageService } from "../natives/storage.service";
import { DefectsService } from "./defects.service";
import { DEFICIENCY_CATEGORY } from "../../app/app.enums";

describe('Provider: DefectsService', () => {
  let defectsService: DefectsService;
  let storageService: StorageService;
  let spy: any;
  const category = DEFICIENCY_CATEGORY.MAJOR;

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
    expect(defectsService.getBadgeColor('major')).toBe('danger')
  });


});
