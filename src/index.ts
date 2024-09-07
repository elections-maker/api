import "dotenv/config";

import { custom } from "kittylog";
import { showRoutes } from "hono/dev";
import { appConfig } from "./config/app";
import { serve } from "@hono/node-server";
import { bootstrapApplication } from "./app";
import { instrument } from "@fiberplane/hono-otel";

const app = bootstrapApplication();

const serverConfig = {
  port: appConfig.serverPort,
  hostname: appConfig.serverHostname,
  fetch: instrument(app).fetch,
};

serve(serverConfig, () => {
  custom("cyan", "Server info", "\n");
  console.log(`STATUS: running\n`);
  console.log(`HOSTNAME: ${serverConfig.hostname}\n`);
  console.log(`PORT: ${serverConfig.port}\n`);
  console.log(`URL: http://${serverConfig.hostname}:${serverConfig.port}\n`);

  custom("cyan", "Api routes", "\n");
  showRoutes(app);
});
