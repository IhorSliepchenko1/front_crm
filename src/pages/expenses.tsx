import { useState } from "react"
import { Button } from "../app/components/buttons/button"
import { MdAdd } from "react-icons/md";
import { TableExpenses } from "../app/components/table/expenses";
import { useGetAllExpensesQuery } from "../app/services/expensesApi";
import { ExpensesDeposit } from "../app/components/expenses-deposit";
import { useDisclosure } from "@nextui-org/react";
import { Balance } from "../app/components/balance";

export const Expenses = () => {

     const [page, setPage] = useState<number>(1)
     const [limit] = useState<number>(20)
     const { isOpen, onOpen, onOpenChange } = useDisclosure();

     const { data, isLoading } = useGetAllExpensesQuery({ page, limit })


     return (

          <div className="flex flex-col container-table">
               <Button
                    icon={<MdAdd />}
                    type={`button`}
                    color={`danger`}
                    variant={"flat"}
                    onPress={onOpen}
                    className="button-add"
               >Добавить расход</Button>
               <Balance />
               <TableExpenses data={data} limit={limit} isLoading={isLoading} page={page} setPage={setPage} />
               <ExpensesDeposit isOpen={isOpen} onOpenChange={onOpenChange} page={page} limit={limit} />
          </div>

     )
}


