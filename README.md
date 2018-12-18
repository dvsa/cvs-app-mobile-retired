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

2. Get the configuration (this contains secrets and is not publically available).  Create a local file called _restricted.config.ts_ and put the configuration secrets in there.

3. Run `npm install`.

4. If you don't have typings set-up for node, you need to install the _typings_ npm package.  Ideally this would use the new Typescript2.0 _@type_ package installation but that's not configured in the project as yet.  

* To install the typings npm package run this command, `npm install -g typings`.
* To install the node typings run this command, `typings install dt~node --global --save`.

5. Run the following GIT command: "git update-index --assume-unchanged config/application.json"

6. Test you're set-up correctly by running `npm run build`.  If it gets past the transpilation step you're good to go!

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
