import { DefectDetailsModel } from "../defects/defect-details.model";
import { TEST_TYPE_RESULTS } from "../../app/app.enums";

export interface TestTypeModel {
  testTypeName: string;
  name: string;
  testTypeId?: string;
  certificateNumber?: string;
  testAnniversaryDate?: string
  testTypeStartTimestamp: string;
  testTypeEndTimestamp?: string;
  numberOfSeatbeltsFitted?: number;
  lastSeatbeltInstallationCheckDate?: string;
  seatbeltInstallationCheckDate?: boolean;
  testResult?: string | TEST_TYPE_RESULTS;
  prohibitionIssued?: boolean;
  reasonForAbandoning?: string;
  additionalNotesRecorded?: string;
  additionalCommentsForAbandon?: string;
  defects: DefectDetailsModel[];
  /* ------------------------------------------- */
  completionStatus?: string
  testTypeCategoryName?: string;
  reasons?: string[];
}
