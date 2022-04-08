import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authService = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
  }),
  endpoints: (builder) => {
    return {
      authLogin: builder.mutation({
        query: (loginData) => {
          return { url: 'login', method: 'POST', body: loginData };
        },
      }),
      register: builder.mutation({
        query: (name , email , password) => {
          return { url: 'register', method: 'POST', body: name , email, password };
        },
       
      }),

      
    };
  },
});
export const { useAuthLoginMutation , useRegisterMutation } = authService;
export default authService;
