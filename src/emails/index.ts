import { appConfig } from "@/config/app";
import { sendEmail } from "@/utils/mailer";
import { BaseEmailTemplate } from "./base-email";

export const sendVerifyEmail = async (email: string, username: string, token: string) => {
  await sendEmail({
    to: email,
    subject: "[ELECTIONS MAKER] Verify your account",
    email: BaseEmailTemplate({
      username,
      btnLabel: "Verify account",
      title: "Verify your account",
      token: `${appConfig.frontendURL}/auth/verify?email=${email}&token=${token}`,
    }),
  });
};

export const sendResetEmail = async (email: string, username: string, token: string) => {
  await sendEmail({
    to: email,
    subject: "[ELECTIONS MAKER] Reset your password",
    email: BaseEmailTemplate({
      username,
      btnLabel: "Reset password",
      title: "Reset your password",
      token: `${appConfig.frontendURL}/auth/reset?email=${email}&token=${token}`,
    }),
  });
};

export const sendInviteEmail = async (
  email: string,
  username: string,
  organization: string,
  token: string,
) => {
  await sendEmail({
    to: email,
    subject: "[ELECTIONS MAKER] Invite to organization",
    email: BaseEmailTemplate({
      username,
      btnLabel: "Join organization",
      title: `Invite to organization ${organization}`,
      token: `${appConfig.frontendURL}/client/auth/invite?email=${email}&token=${token}`,
    }),
  });
};
