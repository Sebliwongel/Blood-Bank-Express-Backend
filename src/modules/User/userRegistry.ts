import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { AccessibleOpenAPIRegistry } from "../../utils/combineRegistries";
import { UserSchema, NewUserSchema } from "./userSchema";

export const userRegistry = new AccessibleOpenAPIRegistry();

userRegistry.register("User", UserSchema);
userRegistry.register("NewUser", NewUserSchema);

// Register the POST path for creating a new user
userRegistry.registerPath({
  method: "post",
  path: "/api/users",
  summary: "Register a new user",
  tags: ["User"],
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

// Register the GET path for retrieving all users
userRegistry.registerPath({
  method: "get",
  path: "/api/users",
  summary: "Get all users",
  tags: ["User"],
  responses: {
    200: {
      description: "A list of users",
      content: {
        "application/json": {
          schema: z.array(UserSchema),
        },
      },
    },
  },
});

// Register the GET path for retrieving a user by ID
userRegistry.registerPath({
  method: "get",
  path: "/api/users/{id}",
  summary: "Get a user by ID",
  tags: ["User"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "string" }, // Assuming ID is a string
    },
  ],
  responses: {
    200: {
      description: "The user with the specified ID",
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
    },
    404: {
      description: "User not found",
    },
  },
});

// Register the GET path for retrieving a user by email
userRegistry.registerPath({
  method: "get",
  path: "/api/users/email/{email}",
  summary: "Get a user by email",
  tags: ["User"],
  parameters: [
    {
      name: "email",
      in: "path",
      required: true,
      schema: { type: "string" },
    },
  ],
  responses: {
    200: {
      description: "The user with the specified email",
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
    },
    404: {
      description: "User not found",
    },
  },
});

// Register the PUT path for updating a user
userRegistry.registerPath({
  method: "put",
  path: "/api/users/{id}",
  summary: "Update a user by ID",
  tags: ["User"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "string" },
    },
  ],
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
    200: {
      description: "The updated user",
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
    },
    404: {
      description: "User not found",
    },
  },
});

// Register the DELETE path for deleting a user
userRegistry.registerPath({
  method: "delete",
  path: "/api/users/{id}",
  summary: "Delete a user",
  tags: ["User"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "string" },
    },
  ],
  responses: {
    204: {
      description: "User deleted successfully",
    },
    404: {
      description: "User not found",
    },
  },
});

// // Register the PATCH path for partially updating a user
// userRegistry.registerPath({
//   method: "patch",
//   path: "/api/users/{id}",
//   summary: "Partially update a user",
//   tags: ["User"],
//   parameters: [
//     {
//       name: "id",
//       in: "path",
//       required: true,
//       schema: { type: "string" },
//     },
//   ],
//   request: {
//     body: {
//       content: {
//         "application/json": {
//           schema: PartialNewUserSchema,
//         },
//       },
//     },
//   },
//   responses: {
//     200: {
//       description: "The partially updated user",
//       content: {
//         "application/json": {
//           schema: UserSchema,
//         },
//       },
//     },
//     404: {
//       description: "User not found",
//     },
//   },
// });
