import { apiSlice } from "./apiSlice";
import { PAYMENT_URL } from "../constants";

export const paymentsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        createPayment: build.mutation({
            query: (payment) => ({
                url: `${PAYMENT_URL}/create-payment-intent`,
                method: 'POST',
                body: payment,
                credentials:'include'
            }),
            invalidatesTags: ['payments'],
        }),
    }),
})

export const { useCreatePaymentMutation } = paymentsApiSlice;