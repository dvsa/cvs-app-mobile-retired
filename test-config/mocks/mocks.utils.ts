import { TesterDetailsModel } from '../../src/models/tester-details.model';
import { TESTER_ROLES } from '../../src/app/app.enums';
import { DefectDetailsModel } from '../../src/models/defects/defect-details.model';

export const MOCK_UTILS = {
  mockTesterDetails,
  mockDefectsDetails
};

function mockTesterDetails(args?: Partial<TesterDetailsModel>): TesterDetailsModel {
  const mock: TesterDetailsModel = {
    testerName: 'John Doe',
    testerId: '1234567890',
    testerEmail: 'test@email.com',
    testerRoles: [TESTER_ROLES.PSV]
  } as TesterDetailsModel;

  return { ...mock, ...args };
}

function mockDefectsDetails(args?: Partial<DefectDetailsModel>): DefectDetailsModel {
  const mock: DefectDetailsModel = {
    deficiencyCategory: 'major',
    deficiencyText: 'missing.',
    prs: false,
    additionalInformation: {
      location: {
        axleNumber: null,
        horizontal: null,
        vertical: null,
        longitudinal: 'front',
        rowNumber: null,
        lateral: null,
        seatNumber: null
      },
      notes: 'None'
    },
    itemNumber: 1,
    deficiencyRef: '1.1.a',
    stdForProhibition: false,
    deficiencySubId: null,
    imDescription: 'Registration Plate',
    deficiencyId: 'a',
    itemDescription: 'A registration plate:',
    imNumber: 1
  } as DefectDetailsModel;

  return { ...mock, ...args };
}
