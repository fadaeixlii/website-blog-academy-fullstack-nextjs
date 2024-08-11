import { db } from "@/app/_helpers/server";
import { apiHandler } from "@/app/_helpers/server/api";
import { tagSchemaValidation } from "@/Models";
import { NextRequest, NextResponse } from "next/server";

const getAllTags = async (req: NextRequest) => {
  const tags = await db.Tags.find({});
  return tags;
};

const createTag = async (req: NextRequest) => {
  const body = await req.json();
  const tag = new db.Tags(body);
  await tag.save();
  return tag;
};
createTag.schema = tagSchemaValidation;

const updateTag = async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  const body = await req.json();
  const tag = await db.Tags.findByIdAndUpdate(id, body, { new: true });
  return tag;
};
updateTag.schema = tagSchemaValidation;

const deleteTag = async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  await db.Tags.findByIdAndDelete(id);
  return { message: "Tag deleted" };
};

module.exports = apiHandler({
  GET: getAllTags,
  POST: createTag,
  PUT: updateTag,
  DELETE: deleteTag,
});
