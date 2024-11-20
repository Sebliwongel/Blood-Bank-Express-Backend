import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { AccessibleOpenAPIRegistry } from "../../utils/combineRegistries";
import { UserSchema, NewUserSchema } from "./userSchema";

export const userRegistry = new AccessibleOpenAPIRegistry();

userRegistry.register("User", UserSchema);
userRegistry.register("NewUser", NewUserSchema);

userRegistry.registerPath({
  method: "post",
  path: "/auth/register",
  summary: "Register a new user",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: NewUserSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "The created user",
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
    },
  },
});
