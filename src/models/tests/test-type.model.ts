import { DefectDetailsModel } from "../defects/defect-details.model";

export interface TestTypeModel {
  testTypeName: string;
  name: string;
  testTypeId: string;
  certificateNumber: string | null;
  testTypeStartTimestamp: string;
  testTypeEndTimestamp: string | null;
  testResult: string | null;
  prohibitionIssued: boolean | null;
  reasonForAbandoning: string | null;
  additionalNotesRecorded: string | null;
  additionalCommentsForAbandon: string | null;
  numberOfSeatbeltsFitted?: number | null; // PSV
  lastSeatbeltInstallationCheckDate?: string | null; // PSV
  seatbeltInstallationCheckDate?: boolean | null; // PSV
  testExpiryDate?: string;
  defects: DefectDetailsModel[];
  /* -------- ONLY FOR FE -------- */
  completionStatus?: string;
  testTypeCategoryName?: string;
  reasons?: string[];
  testNumber?: string;
  linkedIds?: string[] | null;
}
