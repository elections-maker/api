import { Hono } from "hono";
import { RouteData } from "@/types";
import { zValidator } from "@hono/zod-validator";

export const generateRouter = (routes: RouteData[]) => {
  const router = new Hono();

  for (const { handler, method, middlewares, path, validators } of routes) {
    const middlewaresArray = [];

    if (validators) {
      for (const validator of validators) {
        middlewaresArray.push(zValidator(validator.type, validator.schema));
      }
    }

    if (middlewares) {
      middlewaresArray.push(...middlewares);
    }

    switch (method) {
      case "GET":
        router.get(path, ...middlewaresArray, ...handler);
        break;
      case "POST":
        router.post(path, ...middlewaresArray, ...handler);
        break;
      case "PUT":
        router.put(path, ...middlewaresArray, ...handler);
        break;
      case "DELETE":
        router.delete(path, ...middlewaresArray, ...handler);
        break;
    }
  }

  return router;
};
