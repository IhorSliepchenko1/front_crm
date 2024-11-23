import { TypesExpensesAndPayments } from "../types"
import { api } from "./api"

type NameUpdate = {
     name: string
}

export const paymentsApi = api.injectEndpoints({
     endpoints: (builder) => ({

          createPayment: builder.mutation<
               { name: string },
               { name: string }
          >({
               query: (typeName) => ({
                    url: "payments/",
                    method: "POST",
                    body: typeName,
               }),
          }),

          getAllPayment: builder.query<TypesExpensesAndPayments[], void>({
               query: () => ({
                    url: "payments/",
                    method: "GET",
               }),
          }),

          updatePayment: builder.mutation<TypesExpensesAndPayments, { data: NameUpdate; id: number }>({
               query: ({ data, id }) => ({
                    url: `/payments/${id}`,
                    method: "PUT",
                    body: data,
               }),
          }),

          deletePayment: builder.mutation<void, number>({
               query: (id) => ({
                    url: `/payments/${id}`,
                    method: "DELETE",
               }),
          }),
     }),
})

export const {
     useCreatePaymentMutation,
     useDeletePaymentMutation,
     useGetAllPaymentQuery,
     useLazyGetAllPaymentQuery,
     useUpdatePaymentMutation
} = paymentsApi

export const { endpoints: { createPayment, getAllPayment, updatePayment, deletePayment
} } = paymentsApi
