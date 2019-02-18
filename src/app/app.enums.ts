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
  INIT_SYNC = 'initSyncDone',
  EASTER_EGG = 'easterEgg',
  CACHING = 'caching'
}

export enum APP {
  INIT_SYNC = 'initSyncDone',
  NAV_OUT = 'navigatedOutOfPage',
  TEST_SUBMITTED = 'testSubmitted',
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
  SUBMIT = 'Submit',
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
  CONFIRM_VEHICLE_MSG = 'This action will confirm the vehicle for testing.',
  DEFECT_CAT = 'Defect category',
  DEFECT_ITEM = 'Defect item',
  DEFECT_DESC = 'Defect description',
  TEST = 'Test',
  IDENTIFY_VEHICLE = 'Identify vehicle',
  TEST_HISTORY = 'Test history',
  SUBMIT_TEST = 'Submit test',
  SUBMIT_TEST_MESSAGE = 'You will not be able to make changes to this test after it has been submitted.',
  SUBMIT_TEST_TOAST_MESSAGE = 'The test have been submitted and emailed to andy@dvsa.gov.uk',
  UNABLE_TO_SUBMIT_TESTS_TITLE = 'Unable to submit test',
  UNABLE_TO_SUBMIT_TESTS_TEXT = 'Make sure you are connected to the Internet and try again.',
  SETTINGS_BTN = 'Settings',
  TRY_AGAIN_BTN = 'Try again',
  END_VISIT_TITLE = 'End visit',
  END_VISIT_MSG = "You will not be able to add any other tests after you end this visit. Today's activity report will be sent to DVSA and ",
  END_VISIT_LOADING = 'Submitting site visit',
  REMOVE_DEFECT_TITLE = 'Remove defect',
  REMOVE_DEFECT_MSG = 'This action will remove this defect.',
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

export enum REG_EX_PATTERNS {
  NUMERIC = '[0-9]*'
}

export enum TECH_RECORD_STATUS {
  ARCHIVED = 'archived',
  CURRENT = 'current',
  PROVISIONAL = 'provisional'
}

export enum VEHICLE_TYPE {
  PSV = 'psv',
  HGV = 'hgv',
  TRL = 'trl'
}

export enum VEHICLE_SIZE {
  SMALL = 'small',
  LARGE = 'large'
}

export enum VEHICLE_CONFIGURATION {
  RIGID = 'rigid',
  ARTICULATED = 'articulated'
}

export enum TEST_STATION_TYPE {
  ATF = 'atf',
  GVTS = 'gvts',
  TECHNICAL_SECTION_OFFICE = 'tass',
  POTF = 'potf',
  OTHER = 'other'
}

export enum VEHICLE_CLASS {
  CLASS_1 = '1',
  CLASS_2 = '2',
  CLASS_3 = '3',
  CLASS_L = 'l',
  CLASS_N = 'n',
  CLASS_V = 'v',
  CLASS_T = 't',
  CLASS_S = 's',
}

export enum VEHICLE_STATUS {
  STATUS_1 = '1',
  STATUS_2 = '2',
  STATUS_3 = '3'
}

export enum EU_VEHICLE_CATEGORY {
  CAT_M1 = 'm1',
  CAT_M2 = 'm2',
  CAT_M3 = 'm3',
  CAT_N1 = 'n1',
  CAT_N2 = 'n2',
  CAT_N3 = 'n3',
  CAT_01 = 'o1',
  CAT_02 = 'o2',
  CAT_03 = 'o3',
  CAT_04 = 'o4'
}

export enum PROHIBITION_ISSUED {
  YES = 'yes',
  NO = 'no'
}

