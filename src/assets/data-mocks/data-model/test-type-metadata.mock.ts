import { TEST_TYPE_FIELDS, TEST_TYPE_RESULTS } from "../../../app/app.enums";

export class TestTypeMetadataMock {
  public static get TestTypeMetadata() {
    return {
      testTypeId: '39',
      sections: [
        {
          sectionName: 'Result',
          inputs: [
            {
              testTypePropertyName: 'result',
              label: 'Test result',
              type: 'ddl',
              title: 'Test result',
              values: [
                {
                  text: 'Pass',
                  value: TEST_TYPE_RESULTS.PASS,
                  cssClass: ''
                },
                {
                  text: 'Fail',
                  value: TEST_TYPE_RESULTS.FAIL,
                  cssClass: 'danger-action-button'
                }
              ],
              defaultValue: 'Select',
              deactivateButtonOnSelection: true
            }
          ]
        },
        {
          sectionName: 'Certificate number',
          inputs: [
            {
              testTypePropertyName: 'certificateNumber',
              placeholder: 'Enter',
              type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER_CUSTOM,
            }
          ],
          dependentOn: ['result']
        },
        {
          sectionName: 'Seatbelt installation check',
          inputs: [
            {
              testTypePropertyName: 'wasSeatbeltInstallationCheckCarriedOut',
              label: 'Carried out during this test',
              type: 'ddl',
              title: 'Was a seatbelt installation check carried out?',
              values: [
                {
                  text: 'Yes',
                  value: true,
                  cssClass: ''
                },
                {
                  text: 'No',
                  value: false,
                  cssClass: ''
                }
              ],
              defaultValue: 'No'
            },
            {
              testTypePropertyName: 'seatbeltsNumber',
              label: 'Number of seatbelts fitted',
              info: 'If there are no seatbelts fitted, enter zero (0).',
              type: 'number',
              defaultValue: 'Enter'
            },
            {
              testTypePropertyName: 'lastSeatbeltInstallationCheckDate',
              label: 'Most recent installation check',
              type: 'date',
              defaultValue: 'Enter',
              dependentOn: [{testTypePropertyName: 'seatbeltsNumber', valueToBeDifferentFrom: '0'}]
            }
          ]
        }
      ],
      hasDefects: false,
      hasNotes: true
    }
  }
}