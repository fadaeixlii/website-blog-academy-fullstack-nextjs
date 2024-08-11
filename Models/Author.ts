import Joi from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface IAuthorsModel extends Document {
  content: mongoose.Types.ObjectId[];
  slug: string;
  photoUrl: string;
  telegramUrl?: string;
  xUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  email?: string;
}

export interface IAuthor {
  content: string[];
  slug: string;
  photoUrl: string;
  telegramUrl?: string;
  xUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  email?: string;
  instagramUrl?: string;
}

export const authorModel = (): mongoose.Model<
  IAuthorsModel,
  {},
  {},
  {},
  mongoose.Document<unknown, {}, IAuthorsModel> &
    IAuthorsModel &
    Required<{
      _id: unknown;
    }>,
  any
> => {
  const AuthorSchemaModel: Schema = new Schema({
    content: [
      { type: mongoose.Schema.Types.ObjectId, ref: "LocalizedContents" },
    ],
    slug: { type: String, required: true, unique: true },
    photoUrl: { type: String, required: true },
    telegramUrl: { type: String },
    xUrl: { type: String },
    linkedinUrl: { type: String },
    instagramUrl: { type: String },
    youtubeUrl: { type: String },
    email: { type: String },
  });

  AuthorSchemaModel.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.hash;
    },
  });

  return (
    mongoose.models.Authors ||
    mongoose.model<IAuthorsModel>("Authors", AuthorSchemaModel)
  );
};

export const authorSchema = Joi.object({
  content: Joi.array().items(Joi.string().required()).required(),
  slug: Joi.string().required(),
  photoUrl: Joi.string().uri().required(),
  telegramUrl: Joi.string().uri().optional().allow(""),
  xUrl: Joi.string().uri().optional().allow(""),
  linkedinUrl: Joi.string().uri().optional().allow(""),
  youtubeUrl: Joi.string().uri().optional().allow(""),
  email: Joi.string().email().optional().allow(""),
  instagramUrl: Joi.string().uri().optional().allow(""),
});
