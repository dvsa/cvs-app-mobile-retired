let fs = require('fs');

module.exports = function () {
  fs.copyFile('./resources/AppDelegate.m', './platforms/ios/Vehicle Testing/Classes/AppDelegate.m', () => {
  });
};
