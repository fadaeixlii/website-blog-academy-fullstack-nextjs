import joi from "joi";
import { NextRequest } from "next/server";

export { validateMiddleware };

async function validateMiddleware(req: NextRequest, schema: joi.ObjectSchema) {
  if (!schema) return;

  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  const body = await req.json();
  const { error, value } = schema.validate(body, options);

  if (error) {
    throw `Validation error: ${error.details.map((x) => x.message).join(", ")}`;
  }

  // update req.json() to return sanitized req body
  req.json = () => value;
}
