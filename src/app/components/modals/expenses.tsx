import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useCreateContext } from "../../../context-provider";
import { Input } from "../input";
import { ErrorMessage } from "../error-message";
import { Control, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { TypesExpensesAndPayments } from "../../types";
import { Chip } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { Button as Nextbutton } from "@nextui-org/react";
import { Button } from "../buttons/button";
import { useGetAllPaymentQuery } from "../../services/paymentsApi";


type Expenses = {
     name: string;
     sum: number;
     date: string;
}

type Props = {
     isOpen: boolean
     resetInput: () => void
     control: Control<Expenses>
     handleSubmit: UseFormHandleSubmit<Expenses>
     onSubmit: SubmitHandler<Expenses>
     error: string
     setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>
     types: TypesExpensesAndPayments[] | []
     setTypeId: (value: React.SetStateAction<string>) => void | undefined
     setPaymentId: (value: React.SetStateAction<string>) => void | undefined
     handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
     updateType?: boolean
     updatePay?: boolean
     typeName?: string
     paymentName?: string
}

export const ModalExpensesBase = ({
     isOpen,
     resetInput,
     control,
     handleSubmit,
     onSubmit,
     error,
     handleFileChange,
     types,
     setTypeId,
     setPaymentId,
     updateType = false,
     updatePay = false,
     typeName,
     paymentName
}: Props) => {
     const { theme } = useCreateContext()
     const [newUpdateType, setNewUpdateType] = useState(updateType)
     const [newUpdatePay, setNewUpdatePay] = useState(updatePay)

     const toggleUpdateType = () => {
          setNewUpdateType((prev) => !prev)
     }
     const toggleUpdatePay = () => {
          setNewUpdatePay((prev) => !prev)
     }

     const { data } = useGetAllPaymentQuery()

     const payments = useMemo(() => {
          return data ? data : []
     }, [data])

     useEffect(() => {
          setNewUpdateType(true)
          setNewUpdatePay(true)
     }, [isOpen])

     return (
          <Modal
               isOpen={isOpen}
               onOpenChange={resetInput}
               placement="top-center"
               className={`${theme} text-foreground-500 modal`}
          >
               <ModalContent>
                    {(onClose) => (
                         <><form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                              <ModalHeader className="flex flex-col gap-1">Внести расход</ModalHeader>
                              <ModalBody>


                                   <Input control={control}
                                        name="name"
                                        label="Наименование расхода"
                                        type="text"
                                        required="Обязательное поле" />
                                   <Input control={control}
                                        name="sum"
                                        label="Сумма расхода"
                                        type="number"
                                        required="Обязательное поле"
                                        placeholder="0"
                                   />
                                   <Input control={control}
                                        name="date"
                                        label="Дата"
                                        type="date"
                                        required="Обязательное поле" />


                                   {
                                        newUpdateType && typeName ? <div className="flex justify-between items-center mt-2 mb-2">
                                             <Chip color="secondary">тип: {typeName}</Chip>


                                             <Nextbutton className="cursor-pointer" color="warning" onClick={() => toggleUpdateType()}>сменить тип?</Nextbutton></div> : <Select
                                                  label="Тип расходов"
                                                  className="max-w-xs"
                                                  onChange={(e) => setTypeId(e.target.value)
                                                  }
                                             >
                                             {types.map((type) => (
                                                  <SelectItem key={type.id} value={type.id}>
                                                       {type.name}
                                                  </SelectItem>
                                             ))}
                                        </Select>
                                   }
                                   {
                                        newUpdatePay && paymentName ? <div className="flex justify-between items-center mt-2 mb-2">
                                             <Chip color="secondary">способ оплаты: {paymentName}</Chip>

                                             <Nextbutton className="cursor-pointer" color="warning" onClick={() => toggleUpdatePay()}>сменить?</Nextbutton></div> : <Select
                                                  label="Способ оплаты"
                                                  className="max-w-xs"
                                                  onChange={(e) => setPaymentId(e.target.value)
                                                  }
                                             >
                                             {payments.map((payment) => (
                                                  <SelectItem key={payment.id} value={payment.id}>
                                                       {payment.name}
                                                  </SelectItem>
                                             ))}
                                        </Select>
                                   }



                                   <input
                                        type="file"
                                        name="img"
                                        placeholder="Выберите файл"
                                        onChange={handleFileChange}
                                   />

                                   <ErrorMessage error={error} />

                              </ModalBody>
                              <ModalFooter className="flex justify-between">
                                   <Button color="danger" variant="solid" onPress={onClose}>
                                        Закрыть
                                   </Button>
                                   <Button color="success" variant="solid" type="submit">
                                        Внести
                                   </Button>
                              </ModalFooter>
                         </form>
                         </>
                    )}
               </ModalContent>
          </Modal >
     )
}
