import { useGetBalanceQuery } from "../services/apiBalance";
import { Card, CardBody, Divider, Chip } from "@nextui-org/react";

export const Balance = () => {
     const { data } = useGetBalanceQuery()


     return (
          <div className="cash-register-card">
               <Card >
                    <CardBody>
                         <div className="p-2 flex justify-between gap-4">
                              <span>Сумма касс:</span>
                              <Chip color="primary">{data?.totalCash.toFixed(2)} грн.</Chip>
                         </div>
                         <Divider />
                         <div className="p-2 flex justify-between gap-4">
                              <span>Расходы:</span>
                              <Chip color="danger">{data?.totalExpenses.toFixed(2)} грн.</Chip>
                         </div>
                         <Divider />
                         <div className="p-2 flex justify-between gap-4">
                              <span>Баланс:</span>
                              <Chip color="success">{data?.balance.toFixed(2)} грн.</Chip>
                         </div>
                         <Divider />
                    </CardBody>
               </Card>
          </div>

     )
}
