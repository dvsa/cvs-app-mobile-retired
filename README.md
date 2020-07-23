# cvs-app-mobile
The app, added to DVSA mobile devices, allows assessors to check and record all aspects of a vehicle’s safety digitally
​
## Synopsis
​
This project contains the mobile app that demonstrates a business workflow for CVS Alpha.
​
## Architecture
[VTA High Level View](https://wiki.dvsacloud.uk/display/HVT/VTA+High+Level++View)

### End to end design
[All in one view](https://wiki.dvsacloud.uk/pages/viewpage.action?pageId=79254695)

### Microservices and backend
VTA uses the following AWS backend microservices:
- [Activity/Visit Microservice](https://wiki.dvsacloud.uk/pages/viewpage.action?pageId=81626518)
- [ATF Microservice](https://wiki.dvsacloud.uk/display/HVT/ATF+Microservice)
- [Defects Microservice](https://wiki.dvsacloud.uk/display/HVT/Defects+Microservice)
- [Preparers Microservice](https://wiki.dvsacloud.uk/display/HVT/Preparers+Microservice)
- [Technical Records Microservice](https://wiki.dvsacloud.uk/display/HVT/Technical+Records+Microservice)
- [Test Number Microservice](https://wiki.dvsacloud.uk/display/HVT/Test+Number+Microservice)
- [Test Results Microservice](https://wiki.dvsacloud.uk/display/HVT/Test+Results+Microservice)
- [Test Types Microservice](https://wiki.dvsacloud.uk/display/HVT/Test+Types+Microservice)

[Azure](https://docs.microsoft.com/en-us/azure/active-directory/) is used for identity management and in itegrates with [EDH](https://wiki.dvsacloud.uk/pages/viewpage.action?pageId=68583709)

## Getting Started
This project using Ionic, if you don't have ionic follow [these steps](https://ionicframework.com/docs/v1/guide/installation.html).
Please install and configure [nvm](https://github.com/nvm-sh/nvm) with this node version so it can be used during installation 10.x.
The application currently run on 10.18.1, please run `npm use` once the correct node(s) versions have been downloaded with nvm.

### Security

#### scanrepo
Please install and run the following securiy programs as part of your testing process:

[repo-security-scanner](https://github.com/UKHomeOffice/repo-security-scanner) and after installing run it with `git log -p | scanrepo`.

#### Sonarqube
In order to generate SonarQube reports on local, follow the steps:
- Download SonarQube server -> [sonarqube](https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-7.6.zip)
- Download SonarQube scanner -> [scanner](https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-3.3.0.1492-macosx.zip)
- Add sonar-scanner in environment variables -> In bash_profile add the line `"export PATH=<PATH_TO_SONAR_SCANNER>/sonar-scanner-3.3.0.1492-macosx/bin:$PATH"`
- Start the SonarQube server -> `cd <PATH_TO_SONARQUBE_SERVER>/bin/macosx-universal-64 ./sonar.sh start`
- In the microservice folder run the command -> `npm run sonar-scanner`

### Authentication
​
This repo does not contain references to authentication tokens, and requires them to be injected at build.

### API Reference
​
This repo does not contain references to API endpoints, and requires them to be injected at build.

### Running the project
​
To get a working build running locally follow these steps:

1. Clone the repository.

2. Run `npm install`.

3. *(Optional)* Set up the configuration for app's deeplinking using the following command after replacing "key", "https", "example.com" with your values:
  'ionic cordova plugin add ionic-plugin-deeplinks --variable URL_SCHEME=key --variable DEEPLINK_SCHEME=https --variable DEEPLINK_HOST=example.com'

4. *(Optional)* Run the following GIT command: "git update-index --assume-unchanged config/application.json" - [Mobile App](https://wiki.dvsacloud.uk/display/HVT/Getting+started+with+the+Mobile+App).
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
You will also require the [environment configuration steps](https://wiki.dvsacloud.uk/display/HVT/Getting+started+with+the+Mobile+App#GettingstartedwiththeMobileApp-Environmentfiles) as well as [local development mode](https://wiki.dvsacloud.uk/display/HVT/Getting+started+with+the+Mobile+App#GettingstartedwiththeMobileApp-Runningtheappindevelopmentmode) and a [test user](https://wiki.dvsacloud.uk/display/HVT/Getting+started+with+the+Mobile+App#GettingstartedwiththeMobileApp-Credentials).

### For testing on an iOS device:

`ionic cordova build ios`

Go to the repo location and open `platforms/ios/DVSA Alpha Test.xcworkspace`.

Select `DVSA Alpha Test` under `TARGETS` and in the `General` tab please untick `Automatically manage signing` and update your `Bundle Identifier`.

Open the `Build Settings` tab and update your `Code Signing Identity`, `Development Team`, `Provisioning Profile` and `Provisioning Profile (Deprecated)`.

Please select your target next to the Play button as `DVSA Alpha Test`.

Please select your device from the list next to the previously selected target.

Press Play.

## Contributing to the project

We use the following dependencies in this project:

### Code style

- Hooks are applied on pre-commit, commit-msg and prepush using [husky](https://github.com/typicode/husky).
- Code is linted with [tslint](https://palantir.github.io/tslint/) - `npm run lint`
- We format the code using [prettier](https://prettier.io/) - `npm run prettier`
- [Typescript](https://github.com/basarat/typescript-book) is used and we follow the [angular coding style](https://angular.io/guide/styleguide) with the following [clean code principles](https://github.com/ryanmcdermott/clean-code-javascript)

### Committing code
Before commiting code, please make sure [scanrepo](https://github.com/UKHomeOffice/repo-security-scanner) is configured.</br>
We use [commitlint](https://github.com/conventional-changelog/commitlint#readme) when commiting code so make sure you are familiar with [conventional commit format](https://www.conventionalcommits.org/en/v1.0.0-beta.4/).  

## Testing


### Unit testing and integration
In order to test, you need to run the following:

- `npm run test-watch` for unit tests.
- `npm run test-coverage` for code coverage
- `npm run sonar-scanner` for sonarqube.

Framework: [Jasmine](https://jasmine.github.io/2.0/introduction.html) with Karma runner.

### End to end
- [Automation test repository](https://github.com/dvsa/cvs-auto-mobile-app)

- [Java](https://docs.oracle.com/en/java/javase/11/)
- [Serenity Cucumber with Junit](https://serenity-bdd.github.io/theserenitybook/latest/junit-basic.html)



## Infrastructure
For the CI/CD and automation please refer to the following pages for further details:
- [Pipeline](https://wiki.dvsacloud.uk/display/HVT/CVS+Pipeline+Infrastructure)
- [Development processes](https://wiki.dvsacloud.uk/pages/viewpage.action?pageId=36870584)
