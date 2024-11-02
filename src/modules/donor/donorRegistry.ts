import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { AccessibleOpenAPIRegistry } from "../../utils/combineRegistries";
import { DonorSchema, NewDonorSchema } from "./donorSchema";

export const donorRegistry = new AccessibleOpenAPIRegistry();

donorRegistry.register("Donor", DonorSchema);
donorRegistry.register("NewDonor", NewDonorSchema);

donorRegistry.registerPath({
  method: "post",
  path: "/api/donor",
  summary: "Register a new donor",
  tags: ["Donor"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: NewDonorSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "The created donor",
      content: {
        "application/json": {
          schema: DonorSchema,
        },
      },
    },
  },
});
