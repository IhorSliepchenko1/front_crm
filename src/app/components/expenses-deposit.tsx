import { useForm } from "react-hook-form";
import { hasErrorField } from "../../utils/has-error-field"
import { useMemo, useState } from "react";
import { useCalendarInputDate } from "../hooks/useCalendarInputDate";
import { useGetAllTypeQuery } from "../services/typeApi";
import { ModalExpensesBase } from "./modals/expenses";
import { useLazyGetBalanceQuery } from "../services/balanceApi";
import { useExpensesDepositMutation, useLazyGetAllExpensesQuery } from "../services/expensesApi";
import { useCreateContext } from "../../context-provider";

type Props = {
     isOpen: boolean
     onOpenChange: () => void
     page: number
     limit: number
}

type Expenses = {
     name: string;
     sum: number;
     date: string;
}

export const ExpensesDeposit = ({ isOpen, onOpenChange, page, limit }: Props) => {
     const { calendarDate } = useCalendarInputDate()
     const [error, setError] = useState("")
     const [selectedFile, setSelectedFile] = useState<File | null>(null)
     const [typeId, setTypeId] = useState('0')
     const [paymentId, setPaymentId] = useState('0')

     const [triggerGetAllExpenses] = useLazyGetAllExpensesQuery()
     const [expensesDeposit] = useExpensesDepositMutation()
     const { data } = useGetAllTypeQuery()
     const [triggerGetAllBalance] = useLazyGetBalanceQuery()

     const { alertStatus } = useCreateContext()

     const types = useMemo(() => {
          return data ? data : []
     }, [data])


     const {
          handleSubmit,
          control,
          reset
     } = useForm<Expenses>({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               name: '',
               date: calendarDate(new Date(Date.now())),
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

     const onSubmit = async (data: Expenses) => {
          try {
               const formData = new FormData();
               if (data.name) formData.append('name', data.name);
               if (data.sum) formData.append('sum', String(data.sum));
               if (data.date) formData.append('date', String(data.date));
               if (typeId) formData.append('typesExpenseId', String(typeId));
               if (paymentId) formData.append('paymentId', String(paymentId));
               if (selectedFile) formData.append('img', selectedFile);

               await expensesDeposit({ expensesBody: formData }).unwrap();
               await triggerGetAllExpenses({ page, limit }).unwrap();
               await triggerGetAllBalance().unwrap()
               resetInput()
               alertStatus(`add`)

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
               types={types}
               setTypeId={setTypeId}
               setPaymentId={setPaymentId}
          />
     )
}
