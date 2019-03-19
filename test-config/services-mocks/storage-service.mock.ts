export class StorageServiceMock {
  constructor() {
  }

  create(isError: boolean): Promise<any> {
    if(isError) return Promise.reject();
    return Promise.resolve();
  }

  read(isError: boolean): Promise<any> {
    if(isError) return Promise.reject();
    return Promise.resolve();
  }

  update(isError: boolean): Promise<any> {
    if(isError) return Promise.reject();
    return Promise.resolve();
  }


  delete(isError: boolean): Promise<any> {
    if(isError) return Promise.reject();
    return Promise.resolve();
  }

  clearStorage(isError: boolean): Promise<any> {
    if(isError) return Promise.reject();
    return Promise.resolve();
  }
}
