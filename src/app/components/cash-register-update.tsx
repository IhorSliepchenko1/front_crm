import { useForm } from "react-hook-form";
import { hasErrorField } from "../../utils/has-error-field"
import { useEffect, useState } from "react";
import { useLazyGetAllCashRegisterQuery, useUpdateCashRegisterMutation } from "../services/cashRegisterApi";
import { Deposit } from "../types";
import { ModalCashRegisterBase } from "./modals/cash-register";
import { useLazyGetBalanceQuery } from "../services/apiBalance";

type Props = {
     isOpen: boolean
     onOpenChange: () => void
     page: number
     limit: number
     cash: number | undefined;
     cashless: number | undefined;
     dateProps: string | Date;
     id: number
}

export const CashRegisterUpdate = ({
     isOpen,
     onOpenChange,
     page,
     limit,
     cash,
     cashless,
     dateProps,
     id,
}: Props) => {

     const [error, setError] = useState("")
     const {
          handleSubmit,
          control,
          reset
     } = useForm<Deposit>({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               cash: cash,
               cashless: cashless,
               date: dateProps,
          },
     })

     const resetInput = () => {
          onOpenChange()
          reset()
          setError(``)
     }

     useEffect(() => {
          if (isOpen) {
               reset({
                    cash,
                    cashless,
                    date: dateProps,
               });
          }
     }, [isOpen, cash, cashless, dateProps, reset]);

     const [triggerGetAllCashRegisterDeposit] = useLazyGetAllCashRegisterQuery()
     const [updateUsercashRegisterDeposit] = useUpdateCashRegisterMutation()
     const [triggerGetAllBalance] = useLazyGetBalanceQuery()


     const onSubmit = async (data: Deposit) => {
          try {
               await updateUsercashRegisterDeposit({ data, id }).unwrap()
               await triggerGetAllCashRegisterDeposit({ page, limit }).unwrap()
               await triggerGetAllBalance().unwrap()
               resetInput()

          } catch (err) {

               if (hasErrorField(err)) {
                    setError(err.data.message)
               }
          }
     }
     return (
          <ModalCashRegisterBase
               title={`Внести изменения`}
               isOpen={isOpen}
               resetInput={resetInput}
               control={control}
               handleSubmit={handleSubmit}
               onSubmit={onSubmit}
               error={error}
          />
     )
}
