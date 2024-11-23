import { Balance } from "../types"
import { api } from "./api"

export const balanceApi = api.injectEndpoints({
     endpoints: (builder) => ({
          getBalance: builder.query<Balance, void>({
               query: () => ({
                    url: "balance/",
                    method: "GET",
               }),
          }),

          transferBalance: builder.mutation<Balance, { sum: number; name: string }>({
               query: (data) => ({
                    url: `/balance/transfer`,
                    method: "PUT",
                    body: data,
               }),
          }),
     }),
})

export const { useGetBalanceQuery, useLazyGetBalanceQuery, useTransferBalanceMutation } = balanceApi

export const { endpoints: {
     getBalance, transferBalance
} } = balanceApi
