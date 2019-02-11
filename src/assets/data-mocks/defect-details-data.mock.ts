import { DefectDetailsModel } from "../../models/defects/defect-details.model";

export class DefectDetailsDataMock {

  public static get DefectData(): DefectDetailsModel {
    return DefectDetailsDataMock.DefectDetails[0];
  }

  public static get DefectDetails(): DefectDetailsModel[] {
    return [{
      "deficiencyRef": "1.1.a",
      "deficiencyCategory": "major",
      "deficiencyId": "a",
      "deficiencyText": "missing.",
      "imNumber": 1,
      "imDescription": "Registration Plate",
      "itemNumber": 1,
      "itemDescription": "A registration plate:",
      "metadata": {
        "category": {
          "additionalInfo": {
            "location": {
              "axleNumber": null,
              "horizontal": null,
              "vertical": null,
              "longitudinal": ["front", "rear"],
              "rowNumber": null,
              "lateral": null,
              "seatNumber": null
            }, "notes": false
          }
        }
      },
      "prs": false,
      "additionalInformation": {
        "notes": "",
        "location": {
          "vertical": "",
          "horizontal": "",
          "lateral": "",
          "longitudinal": "front",
          "rowNumber": null,
          "seatNumber": null,
          "axleNumber": null
        }
      },
    }, {
      "deficiencyRef": "1.2",
      "deficiencyCategory": "Advisory",
      "deficiencyId": null,
      "deficiencyText": "",
      "imNumber": 1,
      "imDescription": "Registration Plate",
      "itemNumber": 2,
      "itemDescription": "A registration mark:",
      "metadata": {
        "category": {"additionalInfo": null}
      },
      "prs": null,
      "additionalInformation": {
        "notes": "test",
        "location": null
      }
    }]
  }

}
