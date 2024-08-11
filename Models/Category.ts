import mongoose, { Schema, Document } from "mongoose";
import Joi from "joi";

export interface ICategory {
  content: string[];
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  parentCategory?: string;
  subCategories?: string[];
}

interface ICategoryModel extends Document {
  content: mongoose.Types.ObjectId[];
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  parentCategory?: ICategoryModel["_id"];
  subCategories?: ICategoryModel["_id"][];
}

export const categoryModel = (): mongoose.Model<
  ICategoryModel,
  {},
  {},
  {},
  mongoose.Document<unknown, {}, ICategoryModel> &
    ICategoryModel &
    Required<{
      _id: unknown;
    }>,
  any
> => {
  const CategorySchemaModel: Schema = new Schema({
    content: [
      { type: mongoose.Schema.Types.ObjectId, ref: "LocalizedContents" },
    ],
    slug: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      default: null,
      validate: {
        validator: function (
          this: ICategoryModel,
          value: mongoose.Types.ObjectId
        ): boolean {
          // Ensure that a category cannot be its own parent
          return value !== this._id;
        },
        message: "A category cannot be its own parent.",
      },
    },
    subCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        validate: {
          validator: async function (
            value: mongoose.Types.ObjectId
          ): Promise<boolean> {
            // Ensure that subcategories do not have their own subcategories
            const subCategory = await mongoose
              .model("Categories")
              .findById(value)
              .exec();
            if (subCategory && subCategory.subCategories.length > 0) {
              return false;
            }
            return true;
          },
          message: "Subcategories cannot have their own subcategories.",
        },
      },
    ],
  });

  CategorySchemaModel.pre("save", function (next) {
    if (this.isModified("name") || this.isModified("description")) {
      this.updatedAt = new Date();
    }
    next();
  });

  CategorySchemaModel.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });

  return (
    mongoose.models.Categories ||
    mongoose.model<ICategoryModel>("Categories", CategorySchemaModel)
  );
};

export const categorySchema = Joi.object({
  content: Joi.array().items(Joi.string().required()).required(),
  parentCategory: Joi.string().optional().allow(null),
});
