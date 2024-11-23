import { useMemo, useState } from "react"
import { Button } from "../app/components/buttons/button"
import { GiPayMoney } from "react-icons/gi";
import { TableExpenses } from "../app/components/table/expenses";
import { useGetAllExpensesQuery, useLazyGetAllPagesExpensesQuery } from "../app/services/expensesApi";
import { ExpensesDeposit } from "../app/components/expenses-deposit";
import { useDisclosure } from "@nextui-org/react";
import { Balance } from "../app/components/balance";
import { useCreateContext } from "../context-provider";
import { AlertSuccess } from "../app/components/alert/alert-success";

export const Expenses = () => {

     const [page, setPage] = useState<number>(1)
     const [limit] = useState<number>(20)
     const { isOpen, onOpen, onOpenChange } = useDisclosure();
     const { alert, classFrames } = useCreateContext()
     const { data, isLoading } = useGetAllExpensesQuery({ page, limit })

     const [triggerGetAllPagesExpensesQuery, { data: dataPage }] = useLazyGetAllPagesExpensesQuery();

     const fn = async () => {
          await triggerGetAllPagesExpensesQuery();
     }

     const dataDownload = useMemo(() => {
          return dataPage ? dataPage : []
     }, [fn])


     return (

          <div className="flex flex-col container-table">
               <Button
                    icon={<GiPayMoney />}
                    type={`button`}
                    color={`danger`}
                    variant={"flat"}
                    onPress={onOpen}
                    className="button-add"
               >Добавить расход</Button>
               <Balance />

               {alert && <AlertSuccess
                    type="success"
                    message={`Расход добавлен`}
                    classFrames={classFrames}
               />}
               <TableExpenses data={data} limit={limit} isLoading={isLoading} page={page} setPage={setPage} dataDownload={dataDownload} fn={fn} />
               <ExpensesDeposit isOpen={isOpen} onOpenChange={onOpenChange} page={page} limit={limit} />
          </div>

     )
}


