import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const auth = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://taliphus.vercel.app/api/' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => {
        return {
          url: 'login',
          method: 'POST',
          body: JSON.stringify(body),
        };
      },
    }),
    logout: builder.mutation({
      query: () => {
        return {
          url: 'logout',
          method: 'POST'
        };
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = auth;
