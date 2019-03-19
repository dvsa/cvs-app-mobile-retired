export class AppServiceMock {
  public readonly isProduction: boolean;
  public readonly isCordova: boolean;
  public isInitSyncDone: boolean;
  public isSignatureRegistered: boolean;
  public isJwtTokenStored: boolean;
  public easterEgg: boolean;
  public caching: boolean;
  private count: number = 0;

  constructor() {
    this.isCordova = false;
    this.isProduction = false;
    this.isSignatureRegistered = false;
    this.caching = true;
    this.easterEgg = true;
    this.isInitSyncDone = false;
    this.isJwtTokenStored = false;
  }
}
