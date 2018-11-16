export class DefectLocationModel {
  private _vertical: any[];
  private _horizontal: any[];
  private _lateral: any[];
  private _longitudinal: any[];
  private _rowNumber: any[];
  private _seatNumber: any[];
  private _axleNumber: any[];

  constructor(vertical: any[] = [], horizontal: any[] = [], lateral: any[] = [], longitudinal: any[] = [], rowNumber: any[] = [], seatNumber: any[] = [], axleNumber: any[] = ['']) {
    this._vertical = vertical;
    this._horizontal = horizontal;
    this._lateral = lateral;
    this._longitudinal = longitudinal;
    this._rowNumber = rowNumber;
    this._seatNumber = seatNumber;
    this._axleNumber = axleNumber;
  }

  get vertical(): any[] {
    return this._vertical;
  }

  set vertical(value: any[]) {
    this._vertical = value;
  }

  get horizontal(): any[] {
    return this._horizontal;
  }

  set horizontal(value: any[]) {
    this._horizontal = value;
  }

  get lateral(): any[] {
    return this._lateral;
  }

  set lateral(value: any[]) {
    this._lateral = value;
  }

  get longitudinal(): any[] {
    return this._longitudinal;
  }

  set longitudinal(value: any[]) {
    this._longitudinal = value;
  }

  get rowNumber(): any[] {
    return this._rowNumber;
  }

  set rowNumber(value: any[]) {
    this._rowNumber = value;
  }

  get seatNumber(): any[] {
    return this._seatNumber;
  }

  set seatNumber(value: any[]) {
    this._seatNumber = value;
  }

  get axleNumber(): any[] {
    return this._axleNumber;
  }

  set axleNumber(value: any[]) {
    this._axleNumber = value;
  }
}
