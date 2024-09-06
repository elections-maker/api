export const authResponses = {
  credentialsInvalid: {
    success: false,
    message: "Credentials are invald or wrong!",
  },
  tokenInvalid: {
    success: false,
    message: "Token is invalid or wrong!",
  },
  notVerified: {
    success: false,
    message: "Please verify your account to login it!",
  },
  notAuthorized: {
    success: false,
    message: "User is not authorized!",
  },
  verifySent: {
    success: true,
    message: "email sent successfully, please verify your account!",
  },
  authorized: {
    success: true,
    message: "User is authorized!",
  },
  registered: {
    success: true,
    message: "Registration completed successfully!",
  },
  verified: {
    success: true,
    message: "Account verified successfully!",
  },
  logged: {
    success: true,
    message: "Login completed successfully!",
  },
};
