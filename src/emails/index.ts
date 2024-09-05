import { appConfig } from "@/config/app";
import { sendEmail } from "@/utils/mailer";
import { AuthEmailTemplate } from "./auth-email";

export const sendVerifyEmail = async (email: string, username: string, token: string) => {
  await sendEmail({
    to: email,
    subject: "[ELECTIONS MAKER] Verify your account",
    email: AuthEmailTemplate({
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
    email: AuthEmailTemplate({
      username,
      btnLabel: "Reset password",
      title: "Reset your password",
      token: `${appConfig.frontendURL}/auth/reset?email=${email}&token=${token}`,
    }),
  });
};
