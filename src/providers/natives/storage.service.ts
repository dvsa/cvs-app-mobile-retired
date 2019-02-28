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
    ).catch(
      (error) => console.error(`Storage service read error: ${error}`)
    )
  }

  update(key, value): Promise<any> {
    return this.storage.remove(key).then(
      (data: any) => {
        return this.storage.set(key, value).then(
          (data: any) => data
        ).catch(
          error => console.error(`Storage service update error, during storage.set: ${error}`)
        )
      }
    ).catch(
      error => console.error(`Storage service update error, during storage.remove: ${error}`)
    )
  }


  delete(key: string): Promise<any> {
    return this.storage.remove(key).then(
      data => {
        return data
      }
    ).catch(
      error => console.error(`Storage service delete error: ${error}`)
    )
  }

  clearStorage(): Promise<any> {
    return this.storage.clear().then(
      (data) => {
        return data
      }
    ).catch(
      error => console.error(`Storage service clear error: ${error}`)
    )
  }
}
