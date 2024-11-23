import { useMemo, useState } from "react";
import { hasErrorField } from "../../utils/has-error-field";
import { useTransferBalanceMutation, useLazyGetBalanceQuery, useGetBalanceQuery } from "../services/balanceApi";
import { ErrorMessage } from "./error-message";
import { Controller, useForm } from "react-hook-form";
import { useGetAllPaymentQuery } from "../services/paymentsApi";
import { Button } from "./buttons/button";

type Props = {
     sum: number;
     name: string;
};

export const TransferBalance = () => {
     const {
          handleSubmit,
          control,
          watch,
          setValue,
     } = useForm<Props>({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               name: "наличка",
               sum: 0
          },
     });

     const [update] = useTransferBalanceMutation();
     const [triggerGetBalance] = useLazyGetBalanceQuery();
     const { data: balanceData } = useGetBalanceQuery();
     const { data: pay } = useGetAllPaymentQuery();

     const paymentsName = useMemo(() => (pay ? pay : []), [pay]);
     const [error, setError] = useState("");

     const transferBalance = async (data: Props) => {
          console.log(12);

          try {
               await update(data).unwrap();
               await triggerGetBalance().unwrap();
               setError("");
          } catch (err) {
               console.log(err);

               if (hasErrorField(err)) {
                    setError(err.data.message);
               }
          }
     };

     const currentPayment = watch("name");

     const maxAvailable = useMemo(() => {
          if (!balanceData) return 0;
          return currentPayment === "наличка" ? balanceData.cash : balanceData.cashless;
     }, [currentPayment, balanceData]);

     return (
          <div>
               <form onSubmit={handleSubmit(transferBalance)} className="flex flex-col gap-2 p-1">
                    <div className="flex flex-col gap-4">
                         <div className="flex items-center">
                              <p>Перевод из:</p>
                              <Controller
                                   name="name"
                                   control={control}
                                   rules={{ required: "Выберите тип оплаты" }}
                                   render={({ field }) => (
                                        <select {...field} className="ml-2" style={{ outline: `none` }}>
                                             {paymentsName.map((item) => (
                                                  <option key={item.name} value={item.name}>
                                                       {item.name === "наличка" ? "наличных" : "безналичных"}
                                                  </option>
                                             ))}
                                        </select>
                                   )}
                              />
                         </div>

                         <div className="flex items-center justify-between gap-2 border p-1">
                              <Controller
                                   name="sum"
                                   control={control}
                                   render={({ field }) => (
                                        <input
                                             {...field}
                                             type="number"
                                             placeholder="Введите сумму"
                                             max={maxAvailable}
                                             min="0"
                                             step="any"
                                             style={{ background: `transparent`, outline: `none`, minWidth: 150 }}
                                        />
                                   )}
                              />
                              <button
                                   type="button"
                                   onClick={() => setValue("sum", maxAvailable)}
                                   className="p-2"
                                   style={{ color: `red` }}
                              >
                                   MAX
                              </button>
                         </div>
                    </div>

                    <Button color="success" variant="solid" type="submit">
                         Перевести
                    </Button>
               </form>

               <ErrorMessage error={error} />
          </div>
     );
};
