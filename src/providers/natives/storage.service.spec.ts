import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';
import { Storage } from '@ionic/storage';
import { StorageMock } from 'ionic-mocks';
import { Observable } from 'rxjs';

describe('Provider: StorageService', () => {
  let storageService: StorageService;
  let storage: Storage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService, { provide: Storage, useFactory: () => StorageMock.instance() }]
    });
    storageService = TestBed.get(StorageService);
    storage = TestBed.get(Storage);
  });

  beforeEach(() => {
    let store = {};

    spyOn(window.localStorage, 'setItem').and.callFake((key, value) => {
      return (store[key] = value);
    });

    spyOn(window.localStorage, 'removeItem').and.callFake((key) => {
      delete store[key];
    });
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

  it('should return storage observable', () => {
    expect(storageService.watchStorage()).toEqual(jasmine.any(Observable));
  });

  it('should setItem into localStorage', () => {
    let value: any;
    storageService.setItem('key', value);
    expect(window.localStorage.setItem).toHaveBeenCalled();
  });

  it('should removeItem from localStorage', () => {
    storageService.removeItem('key');
    expect(window.localStorage.removeItem).toHaveBeenCalled();
  });
});
