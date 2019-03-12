import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {
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
