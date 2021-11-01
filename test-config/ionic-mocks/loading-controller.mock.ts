import { LoadingMock } from './loading.mock';

export class LoadingControllerMock {
  public static instance(loading?: LoadingMock): any {
    let instance = jasmine.createSpyObj('LoadingController', ['create']);
    instance.create.and.returnValue(loading || LoadingMock.instance());

    return instance;
  }
}
