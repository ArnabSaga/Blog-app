import { prisma } from "../../lib/prisma";
import { Post } from "../../../generated/prisma/client";

const createPost = async (
  data: Omit<Post, "id" | "cretedAt" | "updateAt" | "authorId">,
  userId: string
) => {
  const result = await prisma.post.create({
    data: {
      ...data,
      authorId: userId,
    },
  });
  return result;
};

const getAllPosts = async () => {
  const allPost = await prisma.post.findMany();
  return allPost;
};

export const PostService = {
  createPost,
  getAllPosts,
};
