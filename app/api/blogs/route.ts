import { db } from "@/app/_helpers/server";
import { apiHandler } from "@/app/_helpers/server/api";
import { blogSchemaValidation } from "@/Models";
import { NextRequest, NextResponse } from "next/server";

const getAllBlogs = async (req: NextRequest) => {
  const url = new URL(req.url);
  const pageNumber = parseInt(url.searchParams.get("pageNumber") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
  const acceptedLanguage = req.headers.get("accept-language") || "en";

  const [blogs, totalElements] = await Promise.all([
    db.Blogs.find({})
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .populate({
        path: "content",
        match: { locale: acceptedLanguage },
      })
      .populate({
        path: "author",
        populate: {
          path: "content",
          match: { locale: acceptedLanguage },
        },
      })
      .populate({
        path: "categories",
        populate: {
          path: "content",
          match: { locale: acceptedLanguage },
        },
      })
      .populate({
        path: "tags",
        populate: {
          path: "content",
          match: { locale: acceptedLanguage },
        },
      })
      .populate("comments"),
    db.Blogs.countDocuments(),
  ]);

  const totalPages = Math.ceil(totalElements / pageSize);
  const lastPageNumber = totalPages;

  return {
    blogs,
    pagination: {
      totalPages,
      totalElements,
      currentPage: pageNumber,
      lastPageNumber,
    },
  };
};

const createBlog = async (req: NextRequest) => {
  const body = await req.json();
  const blog = new db.Blogs(body);
  await blog.save();
  return blog;
};
createBlog.schema = blogSchemaValidation;

const updateBlog = async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  const body = await req.json();
  const blog = await db.Blogs.findByIdAndUpdate(id, body, { new: true });
  return blog;
};
updateBlog.schema = blogSchemaValidation;

const deleteBlog = async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  await db.Blogs.findByIdAndDelete(id);
  return { message: "Blog deleted" };
};

module.exports = apiHandler({
  GET: getAllBlogs,
  POST: createBlog,
  PUT: updateBlog,
  DELETE: deleteBlog,
});
