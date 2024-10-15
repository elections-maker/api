import { ConsumerData } from "@/types";
import { Connection } from "rabbitmq-client";

export class RabbitMQ extends Connection {
  generateConsumers = (consumers: ConsumerData[]) => {
    for (const { props, handler, errroHandler } of consumers) {
      const consumer = this.createConsumer(props, handler);

      if (errroHandler) {
        consumer.on("error", errroHandler);
      } else {
        consumer.on("error", () => `consumer error (${props.queue}`);
      }
    }
  };
}
