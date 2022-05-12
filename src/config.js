// export const API_URL = 'http://adminportalbackend-env-1.eba-hp42uqtm.us-east-1.elasticbeanstalk.com'
export const API_URL = 'http://localhost:3001'

export const awsconfig = {
  region: 'us-east-1',
  CognitoIdentityPoolId: 'us-east-1:fc2eb573-22f6-4414-9e7e-3c1bc6055691',
  CognitoUserPoolId: 'us-east-1_sCYr6Mrga',
  CognitoClientId: '2c9rjb00uqoa92230t8ofubpl2',
}

export const authconfig = {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: awsconfig.CognitoIdentityPoolId,

    // REQUIRED - Amazon Cognito Region
    region: awsconfig.region,

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: awsconfig.CognitoUserPoolId,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: awsconfig.CognitoClientId,

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,
  },
}
