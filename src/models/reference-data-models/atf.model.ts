import { ATF_TYPE } from "../models.enums";

export interface AtfReferenceDataModel {
      atfId: string;
      atfNumber: string;
      atfName: string;
      atfContactNumber: string;
      atfAccessNotes: string;
      atfGeneralNotes: string;
      atfTown: string;
      atfAddress: string;
      atfPostcode: string;
      atfLongitude: number;
      atfLatitude: number;
      atfType: string | ATF_TYPE;
      searchProperty?: string;
  }
