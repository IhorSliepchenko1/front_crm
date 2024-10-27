import { TypesExpenses } from "../types"
import { api } from "./api"

type NameUpdate = {
     name: string
}

export const typeApi = api.injectEndpoints({
     endpoints: (builder) => ({

          // добавление типа
          createType: builder.mutation<
               { name: string },
               { name: string }
          >({
               query: (typeName) => ({
                    url: "type-expenses/",
                    method: "POST",
                    body: typeName,
               }),
          }),

          //получение типов

          getAllType: builder.query<TypesExpenses[], void>({
               query: () => ({
                    url: "type-expenses/",
                    method: "GET",
               }),
          }),

          //редактирование типа
          updateType: builder.mutation<TypesExpenses, { data: NameUpdate; id: number }>({
               query: ({ data, id }) => ({
                    url: `/type-expenses/${id}`,
                    method: "PUT",
                    body: data,
               }),
          }),

          // удаление типа
          deleteType: builder.mutation<void, number>({
               query: (id) => ({
                    url: `/type-expenses/${id}`,
                    method: "DELETE",
               }),
          }),
     }),
})

export const {
     useCreateTypeMutation,
     useGetAllTypeQuery,
     useUpdateTypeMutation,
     useDeleteTypeMutation,
     useLazyGetAllTypeQuery
} = typeApi

export const { endpoints: {
     createType,
     getAllType,
     updateType,
     deleteType,
} } = typeApi
