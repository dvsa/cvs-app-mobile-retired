import { TEST_TYPE_RESULTS, ODOMETER_METRIC } from "../../app/app.enums";
import { TestTypeModel } from "../../models/tests/test-type.model";

export class CommonFunctionsService {

  public capitalizeString(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  public checkForMatch(inputValue: string, expectedValue: string): boolean {
    return inputValue.toLowerCase() === expectedValue.toLowerCase();
  }

  public checkForMatchInArray(inputValue: string, expectedArray: any[]): boolean {
    return expectedArray.indexOf(inputValue.toLowerCase()) != -1;
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

  randomString(length: number): string {
    return Math.random().toString(36).substr(2, length);
  }

  getDistanceType(distanceType: string): string {
    return distanceType === ODOMETER_METRIC.MILES ? ODOMETER_METRIC.MI : ODOMETER_METRIC.KM;
  }

  orderTestTypeArrayByDate(testTypeArray: TestTypeModel[]): void {
    if (testTypeArray.length) {
      testTypeArray.sort((a,b) => {
        return +new Date(b.testTypeStartTimestamp) - +new Date(a.testTypeStartTimestamp);
      });
    }
  }
}
