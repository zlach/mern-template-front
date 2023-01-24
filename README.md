To run this you need a .env in the root with the following variables:

REACT_APP_BASE_URL='http://localhost:3000'  
REACT_APP_API_URL='http://localhost:3001'  
REACT_APP_REGION=''  
REACT_APP_IDENTITY_POOL=''  
REACT_APP_USER_POOL=''  
REACT_APP_CLIENT_ID=''  

All except the first are created by making an AWS Cognito user pool and identity pool

For the user pool:

Provider type: Cognito user pool  
Cognito user pool sign-in options: Email  
Password policy: Cognito defaults  
Multi-factor authentication: No MFA

The rest just keep as defaults, send emails with Cognito for test, and provide names for the user pool and client

Then create an identity pool using the user pool id and the client id
