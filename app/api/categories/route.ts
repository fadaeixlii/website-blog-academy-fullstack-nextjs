import { db } from "@/app/_helpers/server";
import { apiHandler } from "@/app/_helpers/server/api";
import { categorySchema } from "@/Models/Category";
import { NextRequest } from "next/server";

const getAllCategories = async (req: NextRequest) => {
  const url = new URL(req.url);
  const pageNumber = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("size") || "10", 10);

  if (pageNumber <= 0 || pageSize <= 0) {
    throw "Invalid pageNumber or pageSize. Both must be greater than 0.";
  }

  const skip = (pageNumber - 1) * pageSize;
  const limit = pageSize;

  const totalElements = await db.Categories.countDocuments();

  const categories = await db.Categories.find({})
    .skip(skip)
    .limit(limit)
    .exec();

  const totalPages = Math.ceil(totalElements / pageSize);
  const lastPageNumber = totalPages;
  const currentPage = pageNumber;

  return {
    categories,
    totalPages,
    totalElements,
    currentPage,
    lastPageNumber,
  };
};

const createCategory = async (req: NextRequest) => {
  const body = await req.json();
  const category = new db.Categories(body);
  await category.save();
  return category;
};
createCategory.schema = categorySchema;

const updateCategory = async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  const body = await req.json();
  const category = await db.Categories.findByIdAndUpdate(id, body, {
    new: true,
  });
  return category;
};
updateCategory.schema = categorySchema;

const deleteCategory = async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  await db.Categories.findByIdAndDelete(id);
  return { message: "Category deleted" };
};

module.exports = apiHandler({
  GET: getAllCategories,
  POST: createCategory,
  PUT: updateCategory,
  DELETE: deleteCategory,
});
