export class AtfModel {
  private _atfId: string;
  private _atfName: string
  private _atfNumber: string
  atfContactNumber: string
  atfAccessNotes: string
  atfGeneralNotes: string
  private _atfTown: string
  private _atfAddress: string
  private _atfPostcode: string
  private _atfLongitude: number
  private _atfLatitude: number
  private _searchProperty: string

  constructor(atfName: string, atfNumber: string, atfContactNumber: string, atfAccessNotes: string, atfGeneralNotes: string, atfTown: string, atfAddress: string, atfPostcode: string, atfLongitude: number, atfLatitude: number) {
    this._atfName = atfName;
    this._atfNumber = atfNumber;
    this.atfContactNumber = atfContactNumber;
    this.atfAccessNotes = atfAccessNotes;
    this.atfGeneralNotes = atfGeneralNotes;
    this._atfTown = atfTown;
    this._atfAddress = atfAddress;
    this._atfPostcode = atfPostcode;
    this._atfLongitude = atfLongitude;
    this._atfLatitude = atfLatitude;
  }

  get atfId(): string {
    return this._atfId;
  }

  get atfName(): string {
    return this._atfName;
  }

  get atfNumber(): string {
    return this._atfNumber;
  }

  get atfTown(): string {
    return this._atfTown;
  }

  get atfAddress(): string {
    return this._atfAddress;
  }

  get atfPostcode(): string {
    return this._atfPostcode;
  }

  get atfLongitude(): number {
    return this._atfLongitude;
  }

  get atfLatitude(): number {
    return this._atfLatitude;
  }

  get searchProperty(): string {
    return this._searchProperty;
  }

  set searchProperty(value: string) {
    this._searchProperty = value;
  }
}
