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

2. Run `npm install`.

3. (Optional) Set up the configuration for app's deeplinking using the following command after replacing "key", "https", "example.com" with your values:
  'ionic cordova plugin add ionic-plugin-deeplinks --variable URL_SCHEME=key --variable DEEPLINK_SCHEME=https --variable DEEPLINK_HOST=example.com'

4. (Optional) Run the following GIT command: "git update-index --assume-unchanged config/application.json" - [Mobile App](https://wiki.dvsacloud.uk/display/HVT/Getting+started+with+the+Mobile+App).
You will have to remove the ios platform before you build and add ios@5.0.1
The below command will prepare your app to be used in xCode and load the necessary platform and plugins. 
```
node_modules/.bin/ionic cordova platform remove ios
node_modules/.bin/ionic cordova platform add ios@5.0.1
```

5. Test you're set-up correctly by running `npm run build`.  If it gets past the transpilation step you're good to go!
Your application can then be used in ran in Xcode emulator (iPhone8+), simply open `Vehicle Testing.xcodeproj` in Xcode 10.3.
Make sure the correct Xcode version is selected as your cli - `Xcode > Preferences > Command Line Tools > Xcode 10.3`.
You will require a test account with a password that you can request to one of your colleague.

6. After finishing your development, if you encounter problems switching branches, use 'git update-index --no-assume-unchanged config/application.json' command. Revert changes made to 'config/application.json' and then switch branches.

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
