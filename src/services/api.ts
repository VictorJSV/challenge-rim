import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';
import { PlansListDTO, UserDTO } from '@src/mocks/model';
import { QuoteRequestModel } from '@src/models';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    quote: builder.mutation<UserDTO, QuoteRequestModel>({
      query: (payload) => ({
        url: '/user',
        method: 'POST',
        data: payload,
      }),
    }),
    getPlans: builder.query<PlansListDTO, void>({
      query: () => ({ url: '/plans', method: 'GET' }),
    }),
  }),
});

export const { useQuoteMutation, useGetPlansQuery } = apiSlice;
