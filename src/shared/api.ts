import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost } from '../entities/post/post';

export const postApi = createApi({
  reducerPath: 'post',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  endpoints: (build) => ({
    getAllPosts: build.query<IPost[], { limit: number; start: number }>({
      query: ({ limit = 10, start = 0 }) => ({
        url: '/posts',
        params: {
          _limit: limit,
          _start: start,
        },
      }),
    }),
    getPostById: build.query<IPost, number>({
      query: (id: number) => ({
        url: `/posts/${id}`,
      }),
    }),
  }),
});

export const { useGetAllPostsQuery, useGetPostByIdQuery } = postApi;
