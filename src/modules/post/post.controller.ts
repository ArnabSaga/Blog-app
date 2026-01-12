import { Request, Response } from "express";

import { PostService } from "./post.service";

import { PostStatus } from "../../../generated/prisma/enums";

const createPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        error: "Unauthorized!",
      });
    }

    const result = await PostService.createPost(req.body, user.id as string);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({
      error: "Post Creation Failed",
      details: error,
    });
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : undefined;

    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    // true or false
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
        ? true
        : req.query.isFeatured === "false"
        ? false
        : undefined
      : undefined;

    const status = req.query.status as PostStatus | undefined;

    const authorId = req.query.authorId as string | undefined;

    //* Pagination
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    const skip = (page - 1) * limit;

    //* Sorting
    const sortBy = req.query.sortBy as string | undefined;
    const sortOrder = req.query.sortOrder as string | undefined;

    const result = await PostService.getAllPosts({
      search: searchString,
      tags,
      isFeatured,
      status,
      authorId,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({
      error: "Failed to fetch posts",
      details: error,
    });
  }
};

export const PostController = {
  createPost,
  getAllPosts,
};
