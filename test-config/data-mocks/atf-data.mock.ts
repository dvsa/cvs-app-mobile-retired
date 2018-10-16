export class AtfDataMock {
  public static get AtfData() {
    return [
      {
        atfName: 'An ATF Name',
        atfNumber: '123',
        atfContactNumber: '321',
        atfAccessNotes: 'note',
        atfGeneralNotes: 'gNote',
        atfTown: 'town',
        atfAddress: 'An ATF Address',
        atfPostcode: '0000',
        atfLongitude: 1,
        atfLatitude: 2
      }, {
        atfName: 'Other ATF Name',
        atfNumber: '456',
        atfContactNumber: '654',
        atfAccessNotes: 'note1',
        atfGeneralNotes: 'gNote1',
        atfTown: 'town1',
        atfAddress: 'Other ATF Address',
        atfPostcode: '1111',
        atfLongitude: 3,
        atfLatitude: 4
      }, {
        atfName: 'That ATF Name',
        atfNumber: '789',
        atfContactNumber: '987',
        atfAccessNotes: 'note2',
        atfGeneralNotes: 'gNote2',
        atfTown: 'town2',
        atfAddress: 'That ATF Address',
        atfPostcode: '2222',
        atfLongitude: 5,
        atfLatitude: 6
      },
    ];
  }
}
