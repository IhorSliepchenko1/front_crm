import { useForm } from "react-hook-form";
import { hasErrorField } from "../../utils/has-error-field"
import { useState } from "react";
import { useCashRegisterDepositMutation, useLazyGetAllCashRegisterQuery } from "../services/cashRegisterApi";
import { Deposit } from "../types";
import { useCalendarInputDate } from "../hooks/useCalendarInputDate";
import { ModalCashRegisterBase } from "./modals/cash-register";
import { useLazyGetBalanceQuery } from "../services/apiBalance";

type Props = {
     isOpen: boolean
     onOpenChange: () => void
     page: number
     limit: number
}

export const CashRegisterDeposit = ({ isOpen, onOpenChange, page, limit }: Props) => {
     const { calendarDate } = useCalendarInputDate()
     const [error, setError] = useState("")

     const {
          handleSubmit,
          control,
          reset
     } = useForm<Deposit>({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               cash: 0,
               cashless: 0,
               date: calendarDate(new Date(Date.now())),
          },
     })

     const resetInput = () => {
          onOpenChange()
          reset()
          setError(``)
     }

     const [triggerGetAllCashRegisterDeposit] = useLazyGetAllCashRegisterQuery()
     const [cashRegisterDeposit] = useCashRegisterDepositMutation()
     const [triggerGetAllBalance] = useLazyGetBalanceQuery()


     const onSubmit = async (data: Deposit) => {
          try {
               await cashRegisterDeposit(data).unwrap()
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
               title={`Внести кассу`}
               isOpen={isOpen}
               resetInput={resetInput}
               control={control}
               handleSubmit={handleSubmit}
               onSubmit={onSubmit}
               error={error} />
     )
}
