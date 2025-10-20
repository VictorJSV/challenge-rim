import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';
import { PlansListDTO, UserDTO } from '@src/__mocks__/msw/model';
import { QuoteRequestModel } from '@src/models';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://rimac-front-end-challenge.netlify.app/api' }),
  endpoints: (builder) => ({
    quote: builder.mutation<UserDTO, QuoteRequestModel>({
      query: (payload) => ({
        url: '/user.json',
        method: 'GET',
        data: payload,
      }),
    }),
    getPlans: builder.query<PlansListDTO, void>({
      query: () => ({ url: '/plans.json', method: 'GET' }),
    }),
  }),
});

export const { useQuoteMutation, useGetPlansQuery } = apiSlice;
