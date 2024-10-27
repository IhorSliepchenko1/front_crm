import { useForm } from "react-hook-form"
import { Input } from "../app/components/input"
import { Button } from "@nextui-org/react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { TypeExpensesForm } from "../app/components/type-expenses-form";
import { useCreateTypeMutation, useGetAllTypeQuery, useLazyGetAllTypeQuery } from "../app/services/typeApi";
import { hasErrorField } from "../utils/has-error-field";
import { useState } from "react";
import { ErrorMessage } from "../app/components/error-message";

type NameType = {
     name: string
}

export const TypeExpenses = () => {
     const {
          handleSubmit,
          reset,
          control
     } = useForm<NameType>({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               name: "",
          },
     })
     const [error, setError] = useState("")
     const { data } = useGetAllTypeQuery()
     const [triggerGetAllTypeRegister] = useLazyGetAllTypeQuery()
     const [addType] = useCreateTypeMutation()


     const addtypeExpenses = async (data: NameType) => {
          try {
               await addType(data).unwrap()
               await triggerGetAllTypeRegister().unwrap()
               reset()

          } catch (err) {

               if (hasErrorField(err)) {
                    setError(err.data.message)
               }
          }
     }

     return (
          <div className="type-container">
               <form className="flex items-center gap-1 mb-6" onSubmit={handleSubmit(addtypeExpenses)}>
                    <Input control={control}
                         name="name"
                         label="Добавить тип расхода"
                         type="text"
                         required="Обязательное поле" />

                    <Button color="success" isIconOnly type="submit">
                         <IoMdAddCircleOutline />
                    </Button>

               </form>
               <div className="flex p-2">
                    <ErrorMessage error={error} />
               </div>

               {data?.length === 0 ? <p>Список типов расходов пуст</p> : <div>
                    {
                         data?.map((item) => (
                              <TypeExpensesForm name={item?.name ?? ''} id={item?.id} key={item.id} />
                         ))
                    }
               </div>}
          </div>
     )
}
