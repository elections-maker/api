import { EmailOptions } from "@/types";
import { appConfig } from "@/config/app";
import { createTransport } from "nodemailer";
import { render } from "@react-email/components";

const transporter = createTransport(appConfig.smtpConfig);

export const sendEmail = async (options: EmailOptions) => {
  try {
    await transporter.sendMail({
      from: "pietro.dev.07@gmail.com",
      to: options.to,
      subject: options.subject,
      html: await render(options.email),
    });
  } catch (err) {
    throw new Error("Error sending the email");
  }
};
