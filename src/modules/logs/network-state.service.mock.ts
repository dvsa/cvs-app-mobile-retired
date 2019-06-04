import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ConnectionStatus } from "./network-state.service";

export class NetworkStateProviderMock {

  public onNetworkChange(): Observable<ConnectionStatus> {
    return of(ConnectionStatus.OFFLINE);
  }

  public initialiseNetworkState(): void {
  }

  public getNetworkState(): ConnectionStatus {
    return ConnectionStatus.ONLINE;
  }

}
