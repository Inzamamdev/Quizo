import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errorsArray = result.error.errors.map((err) => err.message);
      res.status(400).json({ errors: errorsArray });
      return;
    }
    return next();
  };
