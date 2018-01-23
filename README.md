# cvs-alpha-ios-vsa-app
​
## Synopsis
​
This project contains the mobile app that demonstrates a business workflow for CVS Alpha.
​
## Authentication
​
This repo does not contain references to authentication tokens, and requires them to be injected at build.
​
## API Reference
​
This repo does not contain references to API endpoints, and requires them to be injected at build.

## Development

This is an Ionic project.

Prerequisites: an Apple developer account, a valid bundle identifier with an associated certificate and provisioning profile.

To get started, clone the repo, and:

Inject the missing config file that contains the API endpoints and tokens in the project root.

Then install the dependencies by running:

`npm install`

### For testing in the browser:

`ionic serve`

If you are asked to install the missing dependencies please choose yes.

### For testing on an iOS device:

`ionic cordova build ios`

Go to the repo location and open `platforms/ios/DVSA Alpha Test.xcworkspace`.

Select `DVSA Alpha Test` under `TARGETS` and in the `General` tab please untick `Automatically manage signing` and update your `Bundle Identifier`.

Open the `Build Settings` tab and update your `Code Signing Identity`, `Development Team`, `Provisioning Profile` and `Provisioning Profile (Deprecated)`.

Please select your target next to the Play button as `DVSA Alpha Test`.

Please select your device from the list next to the previously selected target.

Press Play.
