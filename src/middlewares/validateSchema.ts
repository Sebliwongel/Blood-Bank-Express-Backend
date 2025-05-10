import { Request, Response, NextFunction } from "express";
import { AnyZodObject, z } from "zod";

type ValidationSchemaType = {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
};

export const validateSchema = (schema: ValidationSchemaType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Create a schema for the request based on provided schemas
      const requestSchema = z.object({
        body: schema.body || z.any(),
        query: schema.query || z.any(),
        params: schema.params || z.any(),
      });

      // Validate the request
      await requestSchema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // If validation passes, continue
      return next();
    } catch (error) {
      // If validation fails, return 400 with error details
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
      }

      // For other errors, pass to error handler
      return next(error);
    }
  };
};
