import mongoose, { Schema, Document } from "mongoose";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
export interface IBlog {
  content: string[];
  imageUrl: string;
  slug: string;
  shortId: string;
  author: string;
  categories: string[];
  tags: string[];
  comments: string[];
  createdAt: Date;
  updatedAt: Date;
  views: number;
  telegramUrl?: string;
  xUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
}

interface IBlogModel extends Document {
  content: mongoose.Types.ObjectId[];
  imageUrl: string;
  slug: string;
  shortId: string;
  author: mongoose.Types.ObjectId;
  categories: mongoose.Types.ObjectId[];
  tags: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  views: number;
  telegramUrl?: string;
  xUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
}

const generateShortId = (): string => {
  // Implement a function to generate a short unique ID for the blog
  return uuidv4();
};

export const blogModel = (): mongoose.Model<
  IBlogModel,
  {},
  {},
  {},
  mongoose.Document<unknown, {}, IBlogModel> &
    IBlogModel &
    Required<{
      _id: unknown;
    }>,
  any
> => {
  const blogSchema: Schema = new Schema({
    content: [
      { type: mongoose.Schema.Types.ObjectId, ref: "LocalizedContents" },
    ],
    imageUrl: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortId: { type: String, default: generateShortId, unique: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Categories" }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    telegramUrl: { type: String },
    xUrl: { type: String },
    linkedinUrl: { type: String },
    instagramUrl: { type: String },
  });

  blogSchema.pre("save", function (next) {
    if (
      this.isModified("content") ||
      this.isModified("telegramUrl") ||
      this.isModified("xUrl") ||
      this.isModified("linkedinUrl") ||
      this.isModified("instagramUrl")
    ) {
      this.updatedAt = new Date();
    }
    next();
  });

  blogSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });

  return (
    mongoose.models.Blogs || mongoose.model<IBlogModel>("Blogs", blogSchema)
  );
};

export const blogSchemaValidation = Joi.object({
  content: Joi.array().items(Joi.string().required()).required(),
  imageUrl: Joi.string().required(),
  slug: Joi.string().required(),
  author: Joi.string().required(),
  categories: Joi.array().items(Joi.string()),
  tags: Joi.array().items(Joi.string()),
});
