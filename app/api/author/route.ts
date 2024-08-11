import { db } from "@/app/_helpers/server";
import { apiHandler } from "@/app/_helpers/server/api";
import { authorSchema } from "@/Models";
import { NextRequest } from "next/server";

const getAllAuthors = async (req: NextRequest) => {
  const url = new URL(req.url);
  const pageNumber = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("size") || "10", 10);
  if (pageNumber <= 0 || pageSize <= 0) {
    throw "Invalid pageNumber or pageSize. Both must be greater than 0.";
  }
  const skip = (pageNumber - 1) * pageSize;
  const limit = pageSize;
  const totalElements = await db.Authors.countDocuments();
  const authors = await db.Authors.find({}).skip(skip).limit(limit).exec();
  const totalPages = Math.ceil(totalElements / pageSize);
  const lastPageNumber = totalPages;
  const currentPage = pageNumber;
  return {
    authors,
    totalPages,
    totalElements,
    currentPage,
    lastPageNumber,
  };
};

const createAuthor = async (req: NextRequest) => {
  const body = await req.json();
  const author = new db.Authors(body);
  await author.save();
  return author;
};
createAuthor.schema = authorSchema;
createAuthor.admin = true;

const updateAuthor = async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  const body = await req.json();
  const author = await db.Authors.findByIdAndUpdate(id, body, { new: true });
  return author;
};
updateAuthor.schema = authorSchema;

const deleteAuthor = async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  await db.Authors.findByIdAndDelete(id);
  return { message: "Author deleted" };
};

module.exports = apiHandler({
  GET: getAllAuthors,
  POST: createAuthor,
  PUT: updateAuthor,
  DELETE: deleteAuthor,
});
