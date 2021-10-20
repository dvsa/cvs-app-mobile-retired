import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";

export class StorageServiceMock {
  constructor() {
  }

  create(isError: boolean): Promise<any> {
    return Promise.resolve();
  }

  read(isError: boolean): Promise<any> {
    return Promise.resolve();
  }

  update(isError: boolean): Promise<any> {
    return Promise.resolve();
  }

  watchStorage(isError: boolean): Observable<any> {
    return of({});
  }

  setItem(isError: boolean): Promise<any> {
    return Promise.resolve();
  }

  removeItem(isError: boolean): Promise<any> {
    return Promise.resolve();
  }

  delete(isError: boolean): Promise<any> {
    return Promise.resolve();
  }

  clearStorage(isError: boolean): Promise<any> {
    return Promise.resolve();
  }
}
