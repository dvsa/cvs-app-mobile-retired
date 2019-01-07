export class CommonRegExp {
  public static get ODOMETER_VALUE(): RegExp {
    return /\B(?=(\d{3})+(?!\d))/g;
  }
}