import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable()
export class StorageService {
  constructor(private storage: Storage) {
  }

  create(key: string, dataArray: any[]): void {
    this.storage.set(key, dataArray).catch(
      err => console.log(err)
    )
  }

  read(key: string): Promise<any> {
    return this.storage.get(key).then(
      (data: any) => {
        return data;
      }
    ).catch(
      err => console.log(err)
    )
  }

  update(key, value): Promise<any> {
    return this.storage.get(key).then(
      (data: any) => {
        return this.storage.remove(key).then(
          (data: any) => {
            return this.storage.set(key, value).then(
              (data: any) => {
                return data
              }
            ).catch(
              err => console.log(err)
            )
          }
        ).catch(
          err => console.log(err)
        )
      }
    )
  }


  delete(key: string): Promise<any> {
    return this.storage.remove(key).then(
      data => {
        return data
      }
    ).catch(
      err => console.log(err)
    )
  }

  clearStorage(): Promise<any> {
    return this.storage.clear().then(
      (data) => {
        return data
      }
    ).catch(
      err => console.log(err)
    )
  }
}
