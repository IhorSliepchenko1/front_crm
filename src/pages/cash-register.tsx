import { MdAdd } from "react-icons/md";
import { TableCashRegister } from "../app/components/table/cash-register";
import { useGetAllCashRegisterQuery } from "../app/services/cashRegisterApi"
import { useState } from "react";
import { Button } from "../app/components/buttons/button";
import { useDisclosure } from "@nextui-org/react";
import { CashRegisterDeposit } from "../app/components/cash-register-deposit";
import { Balance } from "../app/components/balance";

export const CashRegister = () => {
     const [page, setPage] = useState<number>(1)
     const [limit] = useState<number>(20)
     const { data, isLoading } = useGetAllCashRegisterQuery({ page, limit })
     const { isOpen, onOpen, onOpenChange } = useDisclosure();


     return (

          <div className="flex flex-col container-table">
               <Button
                    icon={<MdAdd />}
                    type={`button`}
                    color={`success`}
                    variant={"flat"}
                    onPress={onOpen}
                    className="button-add"
               >Внести кассу</Button>
               <Balance />

               <TableCashRegister data={data} limit={limit} isLoading={isLoading} page={page} setPage={setPage} />
               <CashRegisterDeposit isOpen={isOpen} onOpenChange={onOpenChange} page={page} limit={limit} />
          </div>
     )
}
