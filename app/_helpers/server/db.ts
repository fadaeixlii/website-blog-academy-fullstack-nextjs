import { authorModel, commentModel, tagModel } from "@/Models";
import { blogModel } from "@/Models/Blog";
import { categoryModel } from "@/Models/Category";
import { localizedContentModel } from "@/Models/LocalizedContent";
import { userModel } from "@/Models/User";
import mongoose from "mongoose";

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI!, {
  dbName: "intEx_website",
});
mongoose.Promise = global.Promise;

export const db = {
  Authors: authorModel(),
  Comments: commentModel(),
  Categories: categoryModel(),
  Blogs: blogModel(),
  Tags: tagModel(),
  LocalizedContents: localizedContentModel(),
  Users: userModel(),
};
