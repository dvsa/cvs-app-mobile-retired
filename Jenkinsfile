node("mac") {
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
      
    stage('checkout') {
        checkout scm
    }
    stage('install dependencies') {
        sh 'npm install'
    }
    stage('create .ipa file') {
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                          credentialsId: 'jenkins-iam', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'],
                         string(credentialsId: 'MATCH_PASSWORD', variable: 'MATCH_PASSWORD'),
                         string(credentialsId: 'Keychain', variable: 'KEYCHAIN_PW')]) {
            sh "aws secretsmanager get-secret-value --secret-id ${SECRET_ID} --query SecretString | jq . --raw-output | python -mjson.tool > config/application.json"
            sh 'BRANCH=`echo $BRANCH | tr \'[:upper:]\' \'[:lower:]\'`; sed  -i\'\' -e \'s/BRANCH/\'$BRANCH\'/g\' config/application.json'
            sh 'bundle install && bundle exec fastlane build'
        }
    }
    stage('clean config') {
            sh 'rm config/application.json*'
    }
}
