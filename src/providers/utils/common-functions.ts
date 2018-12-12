export class CommonFunctionsService {

  public capitalizeString(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
