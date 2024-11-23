import { CashRegister, CashRegisterAll, Deposit } from "../types"
import { api } from "./api"




export const cahsRegisterApi = api.injectEndpoints({
     endpoints: (builder) => ({

          // добавление 
          cashRegisterDeposit: builder.mutation<
               CashRegister,
               Deposit

          >({
               query: (cashData) => ({
                    url: "cash-register/deposit",
                    method: "POST",
                    body: cashData,
               }),
          }),

          //получение 

          getAllCashRegister: builder.query<CashRegisterAll, {
               page: number,
               limit: number,
          }>({
               query: ({ page,
                    limit }) => ({
                         url: "cash-register/",
                         method: "GET",
                         params: { page, limit },
                    }),
          }),
          getAllPagesCashRegister: builder.query<CashRegister[], void>({
               query: () => ({
                    url: "cash-register/download-all",
                    method: "GET",
               }),
          }),

          //редактирование 
          updateCashRegister: builder.mutation<CashRegister, { data: Deposit, id: number }>({
               query: ({ data, id }) => ({
                    url: `/cash-register/${id}`,
                    method: "PUT",
                    body: data,
               }),
          }),

          // удаление 
          deleteCashRegister: builder.mutation<void, number>({
               query: (id) => ({
                    url: `/cash-register/${id}`,
                    method: "DELETE",
               }),
          }),
     }),
})

export const {
     useCashRegisterDepositMutation,
     useDeleteCashRegisterMutation,
     useGetAllCashRegisterQuery,
     useUpdateCashRegisterMutation,
     useLazyGetAllCashRegisterQuery,
     useGetAllPagesCashRegisterQuery,
     useLazyGetAllPagesCashRegisterQuery
} = cahsRegisterApi

export const { endpoints: {
     cashRegisterDeposit,
     getAllCashRegister,
     updateCashRegister,
     deleteCashRegister,
} } = cahsRegisterApi
