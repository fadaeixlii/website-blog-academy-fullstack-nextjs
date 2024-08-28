import bcrypt from "bcryptjs";
import mongoose, { Schema, Document } from "mongoose";
import Joi from "joi";

export interface IUser {
  email: string;
  username: string;
  image: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  description?: string;
  gender?: string;
  age?: number;
  telegramUrl?: string;
  xUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  role: "admin" | "user" | "author";
  slug?: string;
}

interface IUserModel extends Document, IUser {}

const userModel = (): mongoose.Model<
  IUserModel,
  {},
  {},
  {},
  mongoose.Document<unknown, {}, IUserModel> &
    IUserModel &
    Required<{
      _id: string;
    }>,
  any
> => {
  const userSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    image: { type: String },
    password: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    description: { type: String },
    gender: { type: String },
    age: { type: Number },
    telegramUrl: { type: String },
    xUrl: { type: String },
    linkedinUrl: { type: String },
    instagramUrl: { type: String },
    youtubeUrl: { type: String },
    role: { type: String, enum: ["admin", "user", "author"], required: true },
    slug: { type: String, unique: true, sparse: true },
  });

  userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = bcrypt.hash(this.password as string, salt);
    }
    next();
  });

  return (
    mongoose.models.Users || mongoose.model<IUserModel>("Users", userSchema)
  );
};

export { userModel };

export const userSchemaValidation = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  image: Joi.string().optional(),
  password: Joi.string().min(6).required(),
  firstname: Joi.string().optional(),
  lastname: Joi.string().optional(),
  description: Joi.string().optional(),
  gender: Joi.string().optional(),
  age: Joi.number().optional(),
  telegramUrl: Joi.string().optional(),
  xUrl: Joi.string().optional(),
  linkedinUrl: Joi.string().optional(),
  instagramUrl: Joi.string().optional(),
  youtubeUrl: Joi.string().optional(),
  role: Joi.string().valid("admin", "user", "author").required(),
  slug: Joi.string().optional(),
});
