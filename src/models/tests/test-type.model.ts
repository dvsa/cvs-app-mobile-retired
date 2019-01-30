import { DefectDetailsModel } from "../defects/defect-details.model";
import { PROHIBITION_ISSUED, TEST_RESULT } from "../models.enums";

export interface TestTypeModel {
  completionStatus?: string
  code?: string;
  name: string;
  id?: string;
  createdAt?: string;
  lastUpdatedAt?: string;
  testCode?: string;
  testTypeName: string;
  testId?: string;
  certificateNumber?: string;
  certificateLink?: string;
  testExpiryDate?: string;
  testTypeStartTimestamp: string;
  testTypeEndTimestamp?: string;
  numberOfSeatbeltsFitted?: number;
  lastSeatbeltInstallationCheckDate?: string;
  seatbeltInstallationCheckDate?: boolean;
  testResult?: string | TEST_RESULT;
  prohibitionIssued?: string | PROHIBITION_ISSUED;
  abandonment?: TestTypeAbandonmentModel;
  additionalNotesRecorded?: string;
  defects: DefectDetailsModel[];
}

export interface TestTypeAbandonmentModel {
  reasons: string[];
  additionalComment?: string;
}
