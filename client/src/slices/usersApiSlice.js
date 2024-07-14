import { USERS_URL, UPLOADS_URL } from '../constants';
import { apiSlice } from './apiSlice';

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`, 
                method: 'POST',
                body: data,
                credentials: 'include',
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: USERS_URL, 
                method: 'POST',
                body: data,
                credentials: 'include',
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`, 
                method: 'POST',
                credentials: 'include',
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`, 
                method: 'PUT',
                body: data,
                credentials: 'include',
            })
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/forgotpassword`,  
                method: 'POST',
                body: data,
            
            })
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.id}/resetpassword/${data.token}`,
                method: 'POST',
                body: { newPassword: data.newPassword }, 
           
            })
        }),
        
        uploadProfileImg: builder.mutation({
            query: (data) => ({
                url: `${UPLOADS_URL}`, 
                method: 'POST',
                body: data,
                credentials: 'include',
            })
        })
        
    }),
});

export const { 
    useLoginMutation, 
    useRegisterMutation, 
    useLogoutMutation, 
    useProfileMutation, 
    useForgotPasswordMutation, 
    useUploadProfileImgMutation,
    useResetPasswordMutation,
} = usersApiSlice;
