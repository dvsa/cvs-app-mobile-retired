export interface AtfReferenceDataModel {
    atfId: string;
    atfName: string;
    atfNumber: string;
    atfContactNumber: string;
    atfAccessNotes: string;
    atfGeneralNotes: string;
    atfTown: string;
    atfAddress: string;
    atfPostcode: string;
    atfType: string;
    atfLongitude: number;
    atfLatitude: number;
    searchProperty?: string;
}
