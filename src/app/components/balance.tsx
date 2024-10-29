import { useFormattedNumber } from "../hooks/useFormattedNumber";
import { useGetBalanceQuery } from "../services/apiBalance";
import { Card, CardBody, Divider, Chip } from "@nextui-org/react";

type DataRender = {
     title: string;
     color: "primary" | "default" | "danger" | "success" | "secondary" | "warning" | undefined
     data: number | undefined;
}


export const Balance = () => {
     const { data } = useGetBalanceQuery()
     const { formattedNumber } = useFormattedNumber()

     const dataRender: DataRender[] = [
          { title: `Сумма касс`, color: `primary`, data: data?.totalCash },
          { title: `Расходы`, color: `danger`, data: data?.totalExpenses },
          { title: `Баланс`, color: `success`, data: data?.balance },
     ]

     return (
          <div className="cash-register-card">
               <Card >
                    <CardBody>
                         {dataRender.map((item, index) => (
                              <>
                                   <div key={index} className="p-2 flex justify-between gap-4">
                                        <p>{item.title}</p>
                                        <Chip color={item.color}>{formattedNumber(Number(item.data))} грн.</Chip>
                                   </div>
                                   <Divider />
                              </>
                         ))}
                    </CardBody>
               </Card>
          </div>

     )
}
