import { TestModel } from '../../../models/tests/test.model';

export class TestDataModelMock {
  public static get TestData(): TestModel {
    return {
      startTime: null,
      endTime: null,
      status: null,
      reasonForCancellation: '',
      vehicles: []
    };
  }

  public static getTestTypes() {
    const testTypes = [
      {
        "id": "1",
        "linkedIds": ["38", "39"],
        "suggestedTestTypeIds": ["1", "7", "10"],
        "name": "Annual test",
        "testTypeName": "Annual test",
        "forVehicleType": ["psv"],
        "forVehicleSize": ["small", "large"],
        "forVehicleConfiguration": ["articulated", "rigid"],
        "forVehicleAxles": null,
        "forEuVehicleCategory": null,
        "forVehicleClass": null,
        "forVehicleSubclass": null,
        "forVehicleWheels": null,
        "testTypeClassification": "Annual With Certificate",
        "testCodes": [
          {
            "forVehicleType": "psv",
            "forVehicleSize": "large",
            "forVehicleConfiguration": "rigid",
            "forVehicleAxles": null,
            "forEuVehicleCategory": null,
            "forVehicleClass": null,
            "forVehicleSubclass": null,
            "forVehicleWheels": null,
            "defaultTestCode": "aal",
            "linkedTestCode": null
          },
          {
            "forVehicleType": "psv",
            "forVehicleSize": "small",
            "forVehicleConfiguration": "rigid",
            "forVehicleAxles": null,
            "forEuVehicleCategory": null,
            "forVehicleClass": null,
            "forVehicleSubclass": null,
            "forVehicleWheels": null,
            "defaultTestCode": "aas",
            "linkedTestCode": null
          },
          {
            "forVehicleType": "psv",
            "forVehicleSize": "large",
            "forVehicleConfiguration": "articulated",
            "forVehicleAxles": null,
            "forEuVehicleCategory": null,
            "forVehicleClass": null,
            "forVehicleSubclass": null,
            "forVehicleWheels": null,
            "defaultTestCode": "adl",
            "linkedTestCode": null
          }
        ]
      },
      {
        "id": "2",
        "linkedIds": ["38", "39"],
        "suggestedTestTypeIds": ["3", "4", "8"],
        "name": "Class 6A",
        "forVehicleType": ["psv"],
        "forVehicleSize": ["small", "large"],
        "forVehicleConfiguration": ["articulated", "rigid"],
        "forVehicleAxles": null,
        "forEuVehicleCategory": null,
        "forVehicleClass": null,
        "forVehicleSubclass": null,
        "forVehicleWheels": null,
        "nextTestTypesOrCategories": [
          {
            "id": "3",
            "linkedIds": ["38", "39"],
            "name": "Annual test",
            "testTypeName": "Class 6A seatbelt installation check (annual test)",
            "forVehicleType": ["psv"],
            "forVehicleSize": ["small", "large"],
            "forVehicleConfiguration": ["articulated", "rigid"],
            "forVehicleAxles": null,
            "forEuVehicleCategory": null,
            "forVehicleClass": null,
            "forVehicleSubclass": null,
            "forVehicleWheels": null,
            "testTypeClassification": "Annual With Certificate",
            "testCodes": [
              {
                "forVehicleType": "psv",
                "forVehicleSize": "large",
                "forVehicleConfiguration": ["articulated", "rigid"],
                "forVehicleAxles": null,
                "forEuVehicleCategory": null,
                "forVehicleClass": null,
                "forVehicleSubclass": null,
                "forVehicleWheels": null,
                "defaultTestCode": "wdl",
                "linkedTestCode": null
              },
              {
                "forVehicleType": "psv",
                "forVehicleSize": "small",
                "forVehicleConfiguration": ["articulated", "rigid"],
                "forVehicleAxles": null,
                "forEuVehicleCategory": null,
                "forVehicleClass": null,
                "forVehicleSubclass": null,
                "forVehicleWheels": null,
                "defaultTestCode": "wds",
                "linkedTestCode": null
              }
            ]
          },
          {
            "id": "4",
            "linkedIds": ["38", "39"],
            "name": "First test",
            "testTypeName": "Class 6A seatbelt installation check (first test)",
            "forVehicleType": ["psv"],
            "forVehicleSize": ["small", "large"],
            "forVehicleConfiguration": ["articulated", "rigid"],
            "forVehicleAxles": null,
            "forEuVehicleCategory": null,
            "forVehicleClass": null,
            "forVehicleSubclass": null,
            "forVehicleWheels": null,
            "testTypeClassification": "Annual With Certificate",
            "testCodes": [
              {
                "forVehicleType": "psv",
                "forVehicleSize": "large",
                "forVehicleConfiguration": ["articulated", "rigid"],
                "forVehicleAxles": null,
                "forEuVehicleCategory": null,
                "forVehicleClass": null,
                "forVehicleSubclass": null,
                "forVehicleWheels": null,
                "defaultTestCode": "wbl",
                "linkedTestCode": null
              },
              {
                "forVehicleType": "psv",
                "forVehicleSize": "small",
                "forVehicleConfiguration": ["articulated", "rigid"],
                "forVehicleAxles": null,
                "forEuVehicleCategory": null,
                "forVehicleClass": null,
                "forVehicleSubclass": null,
                "forVehicleWheels": null,
                "defaultTestCode": "wbs",
                "linkedTestCode": null
              }
            ]
          }
        ]
      }
    ];
    return testTypes;
  }
}
