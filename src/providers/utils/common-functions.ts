import { TEST_TYPE_RESULTS } from "../../app/app.enums";

export class CommonFunctionsService {

  public capitalizeString(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  public checkForMatch(inputValue: string, expectedValue: string): boolean {
    return inputValue.toLowerCase() === expectedValue.toLowerCase();
  }

  public checkForMatchInArray(inputValue: string, expectedArray: any): boolean {
    let checkArray = expectedArray.map(function (x) {
      return x.toLowerCase()
    });
    return checkArray.includes(inputValue.toLowerCase());
  }

  // convert date to format DD MMM YYYY (e.g. 21 Feb 2019)
  public convertDate(dateString: string): string {
    let date: Date = new Date(Date.parse(dateString));
    return `${date.getDate()} 
            ${date.toLocaleString('en-us', {month: 'short'})} 
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

  public searchFor(array: any[], filter: string, properties: string[]) {
    if (!filter) return array;
    return array.filter(
      elem => {
        return properties.some(
          property => {
            if (typeof elem[property] == "number") {
              if (elem[property].toString() == filter) return true
            } else {
              if (elem[property].toLowerCase().includes(filter.toLowerCase())) return true;
            }
          }
        )
      }
    );
  }

  public orderBy(key, order: 'asc' | 'desc' = 'asc') {
    return (a, b) => {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = (typeof a[key] === 'string') ?
        a[key].toLowerCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toLowerCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  public groupArrayAlphabetically(array: any[], groupBy: string) {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let newArr = [], arrGroup = [];
    for (let i = 0; i < alphabet.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (array[j][groupBy].charAt(0).toLowerCase() == alphabet[i]) {
          arrGroup.push(array[j])
        }
      }
      if (arrGroup.length) {
        newArr.push(arrGroup);
        arrGroup = [];
      }
    }
    return newArr;
  };

  public orderByStringId(key, order: 'asc' | 'desc' = 'asc') {
    return (a, b) => {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = +a[key];
      const varB = +b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  getTestResultColor(testResult: string): string {
    switch (testResult.toLowerCase()) {
      case TEST_TYPE_RESULTS.PASS:
        return 'secondary';
      case TEST_TYPE_RESULTS.FAIL:
      case TEST_TYPE_RESULTS.ABANDONED:
        return 'danger';
      case TEST_TYPE_RESULTS.PRS:
        return 'tertiary';
    }
  }

  cloneObject(oldObj) {
    let newObj = oldObj;
    if (oldObj && typeof oldObj === 'object') {
      newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
      for (let i in oldObj) {
        newObj[i] = this.cloneObject(oldObj[i]);
      }
    }
    return newObj;
  }



}
