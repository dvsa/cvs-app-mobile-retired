export enum STORAGE {
  ATFS = 'atfs',
  DEFECTS = 'defects',
  TESTTYPES = 'test-types',
  PREPARERS = 'preparers',
  TECH_RECORDS = 'tech-records',
  STATE = 'state',
  VISIT = 'visit',
  TEST_HISTORY = 'test-history'
}

export enum PATHS {
  TECH_RECORDS = "tech-records"
}

export enum LOCAL_STORAGE {
  INIT_SYNC = 'initSyncDone'
}

export enum APP {
  INIT_SYNC = 'initSyncDone',
  NAV_OUT = 'navigatedOutOfPage',
  TEST_TYPES_UPDATE_COMPLETED_FIELDS = 'updateCompletedFields'
}

export enum DEFICIENCY_CATEGORY {
  ADVISORY = 'advisory',
  DANGEROUS = 'dangerous',
  MAJOR = 'major',
  PRS = 'prs',
  MINOR = 'minor'
}

export enum TEST_REPORT_TITLES {
  SINGLE_TEST = 'Single Test',
  LINKED_TEST = 'Linked Test',
  COMBINED_TEST = 'Combined Test'
}

export enum TEST_REPORT_STATUSES {
  SUBMITTED = 'submitted',
  CANCELLED = 'cancelled'
}

export enum TEST_TYPE_RESULTS {
  SUCCESSFUL = 'pass',
  UNSUCCESSFUL = 'fail',
  ABANDONED = 'abandoned',
  FAIL = 'fail',
  PASS = 'pass',
  PRS = 'prs',
}

export enum TEST_COMPLETION_STATUS {
  IN_PROGRESS = 'in progress',
  EDIT = 'edit'
}

export enum TEST_TYPE_FIELDS {
  DDL = 'ddl',
  NUMBER = 'number',
  DATE = 'date',
  CERTIFICATE_NUMBER_CUSTOM = 'certificateNumberCustom'
}

export enum TEST_TYPE_INPUTS {
  SIC_CARRIED_OUT = 'seatbeltInstallationCheckDate',
  SIC_SEATBELTS_NUMBER = 'numberOfSeatbeltsFitted',
  SIC_LAST_DATE = 'lastSeatbeltInstallationCheckDate',
  CERTIFICATE_NUMBER = 'certificateNumber'
}

export enum APP_STRINGS {
  VEHICLE_DETAILS = 'Vehicle details',
  WITHOUT_PREPARER = 'Continue without preparerID',
  CONFIRM_PREPARER = 'Confirm preparer',
  ALERT_MESSAGE = 'You will not be able to add a preparer for this vehicle later.',
  CANCEL = 'Cancel',
  CONFIRM = 'Confirm',
  OK = 'OK',
  YES = 'Yes',
  NO = 'No',
  REPORT_ISSUE = 'Report issue',
  TEST_STATION_SAFETY = 'Confirm ATF and safety',
  REPORT_TITLE = 'Report an ATF issue',
  SPEAK_TO_TTL = 'Speak to your Technical Team Leader (TTL) if the issue cannot be resolved on site.',
  SEARCH_TEST_STATION = 'Search for an ATF',
  CALL = 'Call',
  TEST_TYPE = 'Test type',
  NO_SEATBELTS_ENTERED = 'No seatbelts entered',
  NO_SEATBELTS_ENTERED_SUBTITLE = 'The number of seatbelts fitted must be greater than zero (0) to carry out an installation check.',
  COMPLETE_ALL_TESTS = 'You must complete all test types marked "in progress" before reviewing.',
  TEST_NOT_COMPLETE = 'Test not complete',
  REMOVE = 'Remove',
  REMOVE_TEST_TITLE = 'Remove test',
  REMOVE_TEST_MSG = 'This action will remove this test from the vehicle.',
  NO_HISTORY = 'No test history found for this vehicle',
  CONFIRM_VEHICLE = 'Confirm vehicle',
  CONFIRM_VEHICLE_MSG = 'This action will confirm the vehicle for testing.'
}

export enum ODOMETER_METRIC {
  KILOMETRES = 'kilometres',
  MILES = 'miles'
}

export enum DATE_FORMAT {
  DD_MM_YYYY = 'dd/MM/yyyy',
  D_MMM_YY = 'd MMM yy'
}

export enum DEFAULT_VALUES {
  NONE = 'none',
  NOT_ENTERED = 'not entered'
}
