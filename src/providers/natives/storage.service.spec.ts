import { TestBed } from "@angular/core/testing";
import { StorageService } from "./storage.service";
import { Storage } from '@ionic/storage';
import { StorageMock } from "ionic-mocks";

describe('Provider: StorageService', () => {
  let storageService: StorageService;
  let storage: Storage;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        StorageService,
        {provide: Storage, useFactory: () => StorageMock.instance()}
      ]
    });
    storageService = TestBed.get(StorageService);
    storage = TestBed.get(Storage);
  });

  afterEach(() => {
    storageService = null;
    storage = null;
  });

  it('should call storage.set', () => {
    let value: any;
    storageService.create('key', value);
    expect(storage.set).toHaveBeenCalled();
  });

  it('should call storage.get', () => {
    storageService.read('key');
    expect(storage.get).toHaveBeenCalled();
  });

  it('should call storage.remove + storage.set', () => {
    let value: any;
    storageService.update('key', value);
    expect(storage.remove).toHaveBeenCalled();
  });

  it('should call storage.remove', () => {
    storageService.delete('key');
    expect(storage.remove).toHaveBeenCalled();
  });

  it('should call storage.clear', () => {
    storageService.clearStorage();
    expect(storage.clear).toHaveBeenCalled();
  });
});
