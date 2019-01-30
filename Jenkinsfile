ansiColor('xterm') {
    node("mac")  {
          switch (BRANCH) {
              case "prod":
                  SECRET_ID = "prod/mobile/config"
                  break
              case "test":
                  SECRET_ID = "test/mobile/config"
                  break
              case "pre-prod":
                  SECRET_ID = "pre-prod/mobile/config"
                  break
              default:
                 SECRET_ID = "feature/mobile/config"
                  break
              }
          stage('Checkout') {
              checkout scm
          }

          stage('Install Dependencies') {
              sh 'npm install'
          }

    //    stage ("unit test") {
    //        sh "npm run test-ci-headless"
    //    }

          stage ("Security") {
              try {
                sh """
                   git secrets --register-aws
                   git secrets --add -a 'ADDRGETNETWORKPARAMS'
                   git secrets --add -a 'WSAEINVALIDPROCTABLE'
                   git secrets --scan
                   git log -p | scanrepo
                   """
              } catch (Exception exception) {
                   ansiColor('xterm') {
                     echo "Caught exception: ${exception}"
                     currentBuild.result = 'ERROR'
                   }
                   throw exception
              }
          }

          stage ("SonarQube") {
              sh "npm run sonar-scanner"
          }

          stage('Create .ipa File') {
              withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                          credentialsId: 'jenkins-iam', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'],
                         string(credentialsId: 'MATCH_PASSWORD', variable: 'MATCH_PASSWORD'),
                         string(credentialsId: 'Keychain', variable: 'KEYCHAIN_PW')]) {
                  sh "aws secretsmanager get-secret-value --secret-id ${SECRET_ID} --query SecretString | jq . --raw-output | python -mjson.tool > config/application.json"
                  sh 'BRANCH=`echo $BRANCH | tr \'[:upper:]\' \'[:lower:]\'`; sed  -i\'\' -e \'s/BRANCH/\'$BRANCH\'/g\' config/application.json'
                  sh 'bundle install && bundle exec fastlane build'
             }
          }
          stage('Clean Config') {
                 sh 'rm config/application.json*'
          }
    }
}
