import Joi from "joi";
import mongoose, { Schema, Document } from "mongoose";

export interface IComment {
  email: string;
  name: string;
  body: string;
  rate: number;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  statusChangedAt: Date;
  parentComment?: string;
  replies?: string[];
}

interface ICommentModel extends Document {
  email: string;
  name: string;
  body: string;
  rate: number;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  statusChangedAt: Date;
  parentComment?: ICommentModel["_id"];
  replies?: ICommentModel["_id"][];
}

export const commentModel = (): mongoose.Model<
  ICommentModel,
  {},
  {},
  {},
  mongoose.Document<unknown, {}, ICommentModel> &
    ICommentModel &
    Required<{
      _id: unknown;
    }>,
  any
> => {
  const CommentSchemaModel: Schema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    body: { type: String, required: true },
    rate: { type: Number, default: 5, min: 1, max: 5 },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
    statusChangedAt: { type: Date, default: Date.now },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
  });

  CommentSchemaModel.pre("save", function (next) {
    if (this.isModified("status")) {
      this.statusChangedAt = new Date();
    }
    next();
  });

  CommentSchemaModel.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.hash;
    },
  });

  return (
    mongoose.models.Comments ||
    mongoose.model<ICommentModel>("Comments", CommentSchemaModel)
  );
};

export const commentSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  body: Joi.string().required(),
  rate: Joi.number().integer().min(1).max(5).default(5),
  parentComment: Joi.string().optional().allow(null),
});
