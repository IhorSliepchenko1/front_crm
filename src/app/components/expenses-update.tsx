import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { useLazyGetAllExpensesQuery, useUpdateExpensesMutation } from "../services/expensesApi"
import { hasErrorField } from "../../utils/has-error-field";
import { ModalExpensesBase } from "./modals/expenses";
import { useGetAllTypeQuery } from "../services/typeApi";
import { useLazyGetBalanceQuery } from "../services/apiBalance";

type Expenses = {
     name: string;
     sum: number;
     date: string;
}

type Props = {
     isOpen: boolean
     onOpenChange: () => void
     page: number
     limit: number
     name: string
     sum: number
     date: string
     id: number
     typeName: string
     update: boolean
}

export const ExpensesUpdate = ({ name, sum, date, isOpen, onOpenChange, page, limit, id, typeName, update }: Props) => {
     const [error, setError] = useState("")
     const [selectedFile, setSelectedFile] = useState<File | null>(null)
     const [typeId, setTypeId] = useState('0')

     const [triggerGetAllExpenses] = useLazyGetAllExpensesQuery()
     const [updateExpenses] = useUpdateExpensesMutation()
     const { data } = useGetAllTypeQuery()
     const [triggerGetAllBalance] = useLazyGetBalanceQuery()

     const types = useMemo(() => {
          return data ? data : []
     }, [data])



     const {
          handleSubmit,
          control,
          reset
     } = useForm({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               name: name,
               sum: sum,
               date: date,
          },
     })

     const resetInput = () => {
          onOpenChange()
          reset()
          setError(``)
     }
     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files !== null) {
               setSelectedFile(e.target.files[0])
          }
     }


     useEffect(() => {
          if (isOpen) {
               reset({
                    name,
                    sum,
                    date,
               });

          }
     }, [date, isOpen, name, reset, sum]);

     const onSubmit = async (data: Expenses) => {
          try {
               const formData = new FormData();
               if (data.name) formData.append('name', data.name);
               if (data.sum) formData.append('sum', String(data.sum));
               if (data.date) formData.append('date', String(data.date));
               if (typeId) formData.append('typesExpenseId', String(typeId));
               if (selectedFile) formData.append('img', selectedFile);

               await updateExpenses({ expensesBody: formData, id }).unwrap();
               await triggerGetAllExpenses({ page, limit }).unwrap();
               await triggerGetAllBalance().unwrap()
               resetInput()

          } catch (err) {

               if (hasErrorField(err)) {
                    setError(err.data.message)
               }
          }
     }

     return (


          <ModalExpensesBase
               isOpen={isOpen}
               resetInput={resetInput}
               control={control}
               handleSubmit={handleSubmit}
               onSubmit={onSubmit}
               handleFileChange={handleFileChange}
               error={error}
               setSelectedFile={setSelectedFile}
               setTypeId={setTypeId}
               types={types}
               update={update}
               typeName={typeName}
          />
     )
}
