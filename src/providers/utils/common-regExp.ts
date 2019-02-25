export class CommonRegExp {
  public static get ODOMETER_VALUE(): RegExp {
    return /\B(?=(\d{3})+(?!\d))/g;
  }

  public static get JTW_TOKEN(): RegExp {
    return /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
  }
}
