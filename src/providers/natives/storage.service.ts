import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class StorageService {
  private storageSub = new Subject<any>();

  constructor(private storage: Storage) {
  }

  create(key: string, dataArray: any | any[]): Promise<any> {
    return this.storage.set(key, dataArray);
  }

  read(key: string): Promise<any> {
    return this.storage.get(key).then(
      (data: any) => data
    );
  }

  update(key, value): Promise<any> {
    return this.storage.remove(key).then(
      (data: any) => {
        return this.storage.set(key, value).then(
          (data: any) => data
        );
      }
    );
  }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any) {
    this.storage.set(key, data);
    this.storageSub.next();
  }

  removeItem(key) {
    this.storage.remove(key);
    this.storageSub.next();
  }

  delete(key: string): Promise<any> {
    return this.storage.remove(key).then(
      data => {
        return data
      }
    );
  }

  clearStorage(): Promise<any> {
    return this.storage.clear().then(
      (data) => {
        return data
      }
    );
  }
}
