import { useFormattedNumber } from "../hooks/useFormattedNumber";
import { useGetBalanceQuery } from "../services/balanceApi";
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
          { title: `Наличка`, color: `success`, data: data?.cash },
          { title: `Карта`, color: `secondary`, data: data?.cashless },
     ]

     return (
          <div className="cash-register-card">
               <Card >
                    <CardBody>
                         {dataRender.map((item, index) => (
                              <div key={index}>
                                   <div className="p-2 flex justify-between gap-4">
                                        <p>{item.title}</p>
                                        <Chip color={item.color}>{formattedNumber(Number(item.data))} грн.</Chip>
                                   </div>
                                   <Divider />
                              </div>
                         ))}
                    </CardBody>
               </Card>
          </div>

     )
}
