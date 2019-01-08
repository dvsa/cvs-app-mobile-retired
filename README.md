# cvs-app-mobile
​
## Synopsis
​
This project contains the mobile app that demonstrates a business workflow for CVS Alpha.
​
## Authentication
​
This repo does not contain references to authentication tokens, and requires them to be injected at build.
​alpha
## API Reference
​
This repo does not contain references to API endpoints, and requires them to be injected at build.

## Getting Started
This project using Ionic, if you don't have ionic follow [these steps](https://ionicframework.com/docs/v1/guide/installation.html).

To get a working build running locally follow these steps:

1. Clone the repository.

2. Navigate to src/assets/data-mocks, create a folder called "config".

3. Ask the devs for the "application.json" file, the one that needs to be added into the newly created folder.

3. Run `npm install`.

4. Run the following GIT command: "git update-index --assume-unchanged config/application.json"

5. Test you're set-up correctly by running `npm run build`.  If it gets past the transpilation step you're good to go!

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
