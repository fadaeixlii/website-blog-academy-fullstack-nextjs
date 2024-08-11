import mongoose, { Schema, Document } from "mongoose";
import Joi from "joi";

export interface ILocalizedContent {
  title?: string;
  name?: string;
  body?: string;
  description?: string;
  locale: string;
}

interface ILocalizedContentModel extends Document {
  title?: string;
  name?: string;
  body?: string;
  description?: string;
  locale: string;
}

export const localizedContentModel = (): mongoose.Model<
  ILocalizedContentModel,
  {},
  {},
  {},
  mongoose.Document<unknown, {}, ILocalizedContentModel> &
    ILocalizedContentModel &
    Required<{
      _id: unknown;
    }>,
  any
> => {
  const localizedContentSchema: Schema = new Schema({
    title: { type: String },
    name: { type: String },
    body: { type: String },
    description: { type: String },
    locale: { type: String, required: true },
  });
  return (
    mongoose.models.LocalizedContents ||
    mongoose.model<ILocalizedContentModel>(
      "LocalizedContents",
      localizedContentSchema
    )
  );
};

export const localizedContentSchemaValidation = Joi.object({
  title: Joi.string().required(),
  name: Joi.string().required(),
  body: Joi.string().optional(),
  description: Joi.string().optional(),
  locale: Joi.string().required(),
});
