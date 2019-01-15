export class CommonFunctionsService {

  public capitalizeString(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  public checkForMatch(inputValue: string, expectedValue: string): boolean{
    return inputValue.toLowerCase() === expectedValue.toLowerCase();
  }

  public checkForMatchInArray(inputValue: string, expectedArray: any): boolean{
    let checkArray = expectedArray.map(function(x){ return x.toLowerCase() });
    return checkArray.includes(inputValue.toLowerCase());
  }
  
  // convert date to format DD MMM YYYY (e.g. 21 Feb 2019)
  public convertDate(dateString: string): string {
    let date: Date = new Date(Date.parse(dateString));
    return `${date.getDate()} 
            ${date.toLocaleString('en-us', { month: 'short' })} 
            ${date.getFullYear()}`;
  }

  // Get time from a date in the format HH:MM (e.g. 12:30)
  public getTimeFromDate(dateString: string): string {
    let date: Date = new Date(Date.parse(dateString));
    let time: any = date.toTimeString().split(':');
    return `${time[0]}:${time[1]}`;
  }

  public convertBoolean(inputValue: boolean): string {
    return inputValue ? 'Yes' : "No";
  }

}