import { Button } from "@nextui-org/react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import { Input } from "./input";
import { useState } from "react";
import { useDeleteTypeMutation, useLazyGetAllTypeQuery, useUpdateTypeMutation } from "../services/typeApi";
import { ErrorMessage } from "./error-message";
import { hasErrorField } from "../../utils/has-error-field";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useCheckValidToken } from "../hooks/useCheckValidToken";

type Props = {
     name: string
     id: number
}

type NameUpdate = {
     name: string
}

export const TypeExpensesForm = ({ name, id }: Props) => {

     const {
          handleSubmit,
          control,
     } = useForm<Props>({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               name: name,
          },
     })

     const [error, setError] = useState("")
     const [disabledInput, setDisabledInput] = useState<boolean>(false)

     const [triggerGetAllTypeRegister] = useLazyGetAllTypeQuery()
     const [updateType] = useUpdateTypeMutation()
     const [deleteType] = useDeleteTypeMutation()
     const { decoded } = useCheckValidToken()


     const updateTypeRegister = async (data: NameUpdate) => {
          try {
               await updateType({ data, id })
               await triggerGetAllTypeRegister().unwrap()
               setDisabledInput(false)

          } catch (err) {

               if (hasErrorField(err)) {
                    setError(err.data.message)
               }
          }
     }

     const deleteTypeRegister = async () => {
          try {
               await deleteType(id).unwrap()
               await triggerGetAllTypeRegister().unwrap()


          } catch (err) {

               if (hasErrorField(err)) {
                    setError(err.data.message)
               }
          }
     }


     return (

          <>


               <form className="flex items-center justify-between py-1.5 gap-2" onSubmit={handleSubmit(updateTypeRegister)}>

                    <Input control={control}
                         name="name"
                         label="Тип расхода"
                         type="text"
                         required="Обязательное поле"
                         color="primary"
                         disabled={!disabledInput}
                    />
                    <div className="flex gap-2">

                         {decoded.role === `ADMIN` && <Button color="danger" isIconOnly onClick={() => deleteTypeRegister()}>
                              <MdDelete />
                         </Button>}

                         <Button color={disabledInput ? "warning" : "primary"} isIconOnly onClick={() => setDisabledInput(prev => !prev)}>
                              <MdEdit />
                         </Button>
                         {disabledInput && <Button color="success" isIconOnly type="submit">
                              <IoMdAddCircleOutline />
                         </Button>}


                    </div>

               </form>

               <div className="flex">
                    <ErrorMessage error={error} />
               </div>

          </>)
}
