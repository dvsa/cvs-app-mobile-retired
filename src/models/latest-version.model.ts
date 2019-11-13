export interface LatestVersionModel {
  'mobile-app': AppVersionModel
}

export interface AppVersionModel {
  version: string,
  breaking: string
}
