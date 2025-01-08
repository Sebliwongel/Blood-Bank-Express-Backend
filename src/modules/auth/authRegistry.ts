import { z } from "zod";
import { AccessibleOpenAPIRegistry } from "../../utils/combineRegistries";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

export const authRegistry = new AccessibleOpenAPIRegistry();

// extendZodWithOpenApi(z)

authRegistry.registerPath({
  method: "post",
  path: "/auth/donor/login",
  summary: "Login a user",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z
            .object({
              email: z
                .string()
                .openapi({ example: "abelshibabaw291@gmail.com" }),
              password: z.string().openapi({ example: "12345678" }),
            })
            .openapi("Login"),
        },
      },
    },
  },
  responses: {
    200: {
      description: "The access and refresh tokens",
      content: {
        "application/json": {
          schema: z.object({
            accessToken: z.string().openapi({ example: "your_access_token" }),
            refreshToken: z.string().openapi({ example: "your_refresh_token" }),
          }),
        },
      },
    },
    401: {
      description: "Invalid username or password",
    },
  },
});


authRegistry.registerPath({
  method: "post",
  path: "/api/auth/user/login",
  summary: "Login a user",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z
            .object({
              email: z
                .string()
                .openapi({ example: "abelshibabaw291@gmail.com" }),
              password: z.string().openapi({ example: "12345678" }),
            })
            .openapi("Login"),
        },
      },
    },
  },
  responses: {
    200: {
      description: "The access and refresh tokens",
      content: {
        "application/json": {
          schema: z.object({
            accessToken: z.string().openapi({ example: "your_access_token" }),
            refreshToken: z.string().openapi({ example: "your_refresh_token" }),
          }),
        },
      },
    },
    401: {
      description: "Invalid username or password",
    },
  },
});

authRegistry.registerPath({
  method: "post",
  path: "/auth/Hospital/login",
  summary: "Login a user",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z
            .object({
              email: z
                .string()
                .openapi({ example: "abelshibabaw291@gmail.com" }),
              password: z.string().openapi({ example: "12345678" }),
            })
            .openapi("Login"),
        },
      },
    },
  },
  responses: {
    200: {
      description: "The access and refresh tokens",
      content: {
        "application/json": {
          schema: z.object({
            accessToken: z.string().openapi({ example: "your_access_token" }),
            refreshToken: z.string().openapi({ example: "your_refresh_token" }),
          }),
        },
      },
    },
    401: {
      description: "Invalid username or password",
    },
  },
});


authRegistry.registerPath({
  method: "post",
  path: "/api/auth/refresh-token",
  summary: "Refresh access token",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            refreshToken: z.string().openapi({ example: "your_refresh_token" }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "New access token",
      content: {
        "application/json": {
          schema: z.object({
            accessToken: z.string().openapi({ example: "your_access_token" }),
          }),
        },
      },
    },
    401: {
      description: "Invalid refresh token",
    },
  },
});


authRegistry.registerPath({
  method: "post",
  path: "/api/auth/forgot-password",
  summary: "Forgot password",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z
            .object({
              email: z
                .string()
                .openapi({ example: "abelshibabaw291@gmail.com" }),
            })
            .openapi("Forgot Password"),
        },
      },
    },
  },
  responses: {
    200: {
      description: "The access and refresh tokens",
      content: {
        "application/json": {
          schema: z.object({
            accessToken: z.string().openapi({ example: "your_access_token" }),
            refreshToken: z.string().openapi({ example: "your_refresh_token" }),
          }),
        },
      },
    },
    401: {
      description: "Invalid username or password",
    },
  },
});

