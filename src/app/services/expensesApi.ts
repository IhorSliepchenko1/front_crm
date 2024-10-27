import { Expenses } from "../types"
import { api } from "./api"

type ExpensesAll = {
     rows: Expenses[]
     count: number
}

export const expensesApi = api.injectEndpoints({
     endpoints: (builder) => ({

          // добавление 
          expensesDeposit: builder.mutation<
               Expenses,
               { expensesBody: FormData }

          >({
               query: ({ expensesBody }) => ({
                    url: "expenses/deposit",
                    method: "POST",
                    body: expensesBody,
               }),
          }),

          //получение 

          getAllExpenses: builder.query<ExpensesAll, {
               page: number,
               limit: number,
          }>({
               query: ({ page,
                    limit }) => ({
                         url: "expenses/",
                         method: "GET",
                         params: { page, limit },
                    }),
          }),

          //редактирование 
          updateExpenses: builder.mutation<Expenses,
               { expensesBody: FormData, id: number }>({
                    query: ({ expensesBody, id }) => ({
                         url: `/expenses/${id}`,
                         method: "PUT",
                         body: expensesBody,
                    }),
               }),

          // удаление 
          deleteExpenses: builder.mutation<void, number>({
               query: (id) => ({
                    url: `/expenses/${id}`,
                    method: "DELETE",
               }),
          }),
     }),
})

export const {
     useDeleteExpensesMutation,
     useExpensesDepositMutation,
     useGetAllExpensesQuery,
     useLazyGetAllExpensesQuery,
     useUpdateExpensesMutation
} = expensesApi

export const { endpoints: {
     expensesDeposit, getAllExpenses, updateExpenses, deleteExpenses
} } = expensesApi
