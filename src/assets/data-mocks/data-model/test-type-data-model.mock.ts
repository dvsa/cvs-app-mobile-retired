import { TEST_TYPE_RESULTS } from "../../../app/app.enums";
import { TestTypeModel } from "../../../models/tests/test-type.model";

export class TestTypeDataModelMock {
  public static get TestTypeData(): TestTypeModel {
    return {
      name: 'annual test',
      testTypeName: 'Annual test',
      testTypeId: '1',
      testTypeStartTimestamp: '2018-12-19T00:00:00.000Z',
      numberOfSeatbeltsFitted: null,
      lastSeatbeltInstallationCheckDate: '',
      seatbeltInstallationCheckDate: null,
      testResult: TEST_TYPE_RESULTS.PASS,
      reasonForAbandoning: '',
      additionalCommentsForAbandon: '',
      defects: [],
      reasons: []
    }
  }
}
