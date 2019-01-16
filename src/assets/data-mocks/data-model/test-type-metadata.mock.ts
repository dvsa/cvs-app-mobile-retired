import { TEST_TYPE_FIELDS, TEST_TYPE_RESULTS } from "../../../app/app.enums";

export class TestTypeMetadataMock {
  public static get TestTypeMetadata() {
    return {
      testTypeId: '10',
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
        }
      ],
      hasDefects: false,
      hasNotes: true
    }
  }
}