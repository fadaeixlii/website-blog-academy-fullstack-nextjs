import mongoose, { Schema, Document } from "mongoose";
import Joi from "joi";

export interface ITag {
  content: string[];

  slug: string;
}

interface ITagModel extends Document {
  content: mongoose.Types.ObjectId[];

  slug: string;
}

export const tagModel = (): mongoose.Model<
  ITagModel,
  {},
  {},
  {},
  mongoose.Document<unknown, {}, ITagModel> &
    ITagModel &
    Required<{
      _id: unknown;
    }>,
  any
> => {
  const tagSchema: Schema = new Schema({
    content: [
      { type: mongoose.Schema.Types.ObjectId, ref: "LocalizedContents" },
    ],
    slug: { type: String, required: true, unique: true },
  });
  return mongoose.models.Tags || mongoose.model<ITagModel>("Tags", tagSchema);
};

export const tagSchemaValidation = Joi.object({
  content: Joi.array().items(Joi.string().required()).required(),

  slug: Joi.string().required(),
});
