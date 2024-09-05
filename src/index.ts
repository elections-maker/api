import { Hono } from "hono";
import { custom } from "kittylog";
import { showRoutes } from "hono/dev";
import { serve } from "@hono/node-server";
import { instrument } from "@fiberplane/hono-otel";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ success: true, message: "Hello from elections maker api!" });
});

const serverConfig = {
  port: 8000,
  hostname: "localhost",
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
