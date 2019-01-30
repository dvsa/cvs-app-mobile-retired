import { DefectDetailsModel } from "../../models/defects/defect-details.model";

export class DefectDetailsDataMock {

  public static get DefectData(): DefectDetailsModel {
    return DefectDetailsDataMock.DefectDetails[0];
  }

  public static get DefectDetails(): DefectDetailsModel[] {
    return [{
      "ref": "1.1.a",
      "deficiencyCategory": "major",
      "deficiencyId": "a",
      "deficiencyText": "missing.",
      "metadata": {
        "category": {
          "imNumber": 1,
          "imDescription": "Registration Plate",
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
        }, "item": {"itemNumber": 1, "itemDescription": "A registration plate:"}
      },
      "prs": false,
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
    }, {
      "ref": "1.2",
      "deficiencyCategory": "Advisory",
      "deficiencyId": null,
      "deficiencyText": "",
      "metadata": {
        "category": {"imNumber": 1, "imDescription": "Registration Plate", "additionalInfo": null},
        "item": {"itemNumber": 2, "itemDescription": "A registration mark:"}
      },
      "prs": null,
      "notes": "test",
      "location": null
    }]
  }

}
