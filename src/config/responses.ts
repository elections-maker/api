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

export const organizationsResponses = {
  notExists: {
    success: false,
    message: "Organization does not exists!",
  },
  exists: {
    success: false,
    message: "Organization already exists!",
  },
  limitExceeded: {
    success: false,
    message: "Attention, you can create only one free organization!",
  },
  created: {
    success: true,
    message: "Organization created successfully!",
  },
  updated: {
    success: true,
    message: "Organization updated successfully!",
  },
  deleted: {
    success: true,
    message: "Organization deleted successfully!",
  },
};

export const usersResponses = {
  notExists: {
    success: false,
    message: "User does not exist!",
  },
  exists: {
    success: false,
    message: "User already exists!",
  },
  created: {
    success: true,
    message: "User created successfully!",
  },
  updated: {
    success: true,
    message: "User updated successfully!",
  },
  deleted: {
    success: true,
    message: "User deleted successfully!",
  },
};

export const listsResponses = {
  notExists: {
    success: false,
    message: "List does not exist!",
  },
  exists: {
    success: false,
    message: "List already exists!",
  },
  created: {
    success: true,
    message: "List created successfully!",
  },
  updated: {
    success: true,
    message: "List updated successfully!",
  },
  deleted: {
    success: true,
    message: "List deleted successfully!",
  },
  candidates: {
    added: {
      success: true,
      message: "Users added to this list successfully!",
    },
    removed: {
      success: true,
      message: "Users removed from this list successfully!",
    },
  },
};
