export class CommonFunctionsService {

  public capitalizeString(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  public checkForMatch(inputValue: string, expectedValue: string): boolean{
    return inputValue.toLowerCase() === expectedValue.toLowerCase();
  }

}