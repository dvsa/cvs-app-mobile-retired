import { DefectDetailsModel } from "../defects/defect-details.model";

export interface TestTypeModel {
  name: string;
  testTypeName: string;
  testTypeId: string;
  certificateNumber: string | null;
  testTypeStartTimestamp: string;
  testTypeEndTimestamp: string | null;
  numberOfSeatbeltsFitted: number | null;
  lastSeatbeltInstallationCheckDate: string | null;
  seatbeltInstallationCheckDate: boolean | null;
  testResult: string | null;
  prohibitionIssued: boolean | null;
  reasonForAbandoning: string | null;
  additionalNotesRecorded: string | null;
  additionalCommentsForAbandon: string | null;
  defects: DefectDetailsModel[];
  /* -------- ONLY FOR FE -------- */
  completionStatus?: string
  testTypeCategoryName?: string;
  reasons?: string[];
  testNumber?: string;
  testExpiryDate?: string;
}
