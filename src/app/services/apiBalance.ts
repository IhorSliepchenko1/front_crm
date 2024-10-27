import { Balance } from "../types"
import { api } from "./api"

export const balanceApi = api.injectEndpoints({
     endpoints: (builder) => ({
          getBalance: builder.query<Balance, void>({
               query: () => ({
                    url: "balance/",
                    method: "GET",
               }),
          })
     }),
})

export const { useGetBalanceQuery, useLazyGetBalanceQuery } = balanceApi

export const { endpoints: {
     getBalance
} } = balanceApi
