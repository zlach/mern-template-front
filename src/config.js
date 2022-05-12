export const API_URL = process.env.REACT_APP_API_URL

export const awsconfig = {
  region: process.env.REACT_APP_REGION,
  CognitoIdentityPoolId: process.env.REACT_APP_IDENTITY_POOL,
  CognitoUserPoolId: process.env.REACT_APP_USER_POOL,
  CognitoClientId: process.env.REACT_APP_CLIENT_ID,
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
