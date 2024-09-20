import { appConfig } from "@/config/app";
import { RabbitMQ } from "@/utils/rabbitmq";

export const rabbit = new RabbitMQ(appConfig.rabbitmqUrl)
  .on("error", (err) => console.log(err))
  .on("connection", () => console.log("connection successfully (re)established"));
