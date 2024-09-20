import { res } from "@/utils/response";

export const authResponses = {
  credentialsInvalid: res(false, "Credentials are invalid or wrong!"),
  tokenInvalid: res(false, "Token is invalid or wrong!"),
  notVerified: res(false, "Please verify your account to login!"),
  notAuthorized: res(false, "User is not authorized!"),
  verifySent: res(true, "Email sent successfully, please verify your account!"),
  authorized: res(true, "User is authorized!"),
  registered: res(true, "Registration completed successfully!"),
  verified: res(true, "Account verified successfully!"),
  logged: res(true, "Login completed successfully!"),
  forgotted: res(true, "Email sent successfully, please reset your password!"),
};

export const organizationsResponses = {
  notExists: res(false, "Organization does not exist!"),
  exists: res(false, "Organization already exists!"),
  limitExceeded: res(false, "Attention, you can create only one free organization!"),
  created: res(true, "Organization created successfully!"),
  updated: res(true, "Organization updated successfully!"),
  deleted: res(true, "Organization deleted successfully!"),
};

export const usersResponses = {
  notExists: res(false, "User does not exist!"),
  exists: res(false, "User already exists!"),
  created: res(true, "User created successfully!"),
  updated: res(true, "User updated successfully!"),
  deleted: res(true, "User deleted successfully!"),
  decoderNotExists: res(false, "Unsupported or missing file type!"),
  uploaded: res(true, "Users uploaded successfully!"),
  limitExceeded: res(false, "User limit reached for the current plan!"),
};

export const listsResponses = {
  notExists: res(false, "List does not exist!"),
  exists: res(false, "List already exists!"),
  created: res(true, "List created successfully!"),
  updated: res(true, "List updated successfully!"),
  deleted: res(true, "List deleted successfully!"),
  limitExceeded: res(false, "List limit reached for the current plan!"),
  candidates: {
    added: res(true, "Users added to this list successfully!"),
    removed: res(true, "Users removed from this list successfully!"),
  },
};

export const votationsResponses = {
  notExists: res(false, "Votation does not exist!"),
  exists: res(false, "Votation already exists!"),
  created: res(true, "Votation created successfully!"),
  updated: res(true, "Votation updated successfully!"),
  deleted: res(true, "Votation deleted successfully!"),
  limitExceeded: res(false, "Votation limit reached for the current plan!"),
  lists: {
    added: res(true, "Lists added to this votation successfully!"),
    removed: res(true, "Lists removed from this votation successfully!"),
  },
  users: {
    added: res(true, "Users added to this votation successfully!"),
    removed: res(true, "Users removed from this votation successfully!"),
  },
};
