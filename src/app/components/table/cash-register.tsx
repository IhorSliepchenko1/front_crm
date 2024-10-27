import { Table as TableNext, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue, useDisclosure } from "@nextui-org/react";
import { formatToClientDate } from "../../../utils/format-to-client-date";
import { useMemo, useState } from "react";
import { CashData } from "../../types";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { useDeleteCashRegisterMutation, useLazyGetAllCashRegisterQuery } from "../../services/cashRegisterApi";
import { CashRegisterUpdate } from "../cash-register-update";
import { useCalendarInputDate } from "../../hooks/useCalendarInputDate";
import { ModalDelete } from "../modals/delete";
import { useLazyGetBalanceQuery } from "../../services/apiBalance";
import { useCheckValidToken } from "../../hooks/useCheckValidToken";

type Props = {
     data: { rows: CashData[], count: number } | null | undefined
     isLoading: boolean
     limit: number
     page: number
     setPage: (page: number) => void
}

export const TableCashRegister = ({ data, limit, isLoading, page, setPage }: Props) => {
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [idCash, setIdCash] = useState(0)
     const [deleteDay, setDeleteDay] = useState(``)
     const { calendarDate } = useCalendarInputDate()

     const [dataUpdate, setDataUpdate] = useState({
          cash: 0,
          cashless: 0,
          dateProps: calendarDate(new Date(Date.now())),
          id: 0
     })

     const [deleteCashRegister] = useDeleteCashRegisterMutation()
     const [triggerGetAllCashRegisterDeposit] = useLazyGetAllCashRegisterQuery()
     const [triggerGetAllBalance] = useLazyGetBalanceQuery()
     const { decoded } = useCheckValidToken()


     const { isOpen, onOpen, onOpenChange } = useDisclosure();

     const pages = useMemo(() => {
          return data?.count ? Math.ceil(data.count / limit) : 0;
     }, [data?.count, limit]);

     const loadingState = isLoading || data?.rows.length === 0 ? "loading" : "idle";

     const deleteCashRegisterHandler = async (id: number) => {
          await deleteCashRegister(id).unwrap()
          await triggerGetAllCashRegisterDeposit({ page, limit }).unwrap()
          await triggerGetAllBalance().unwrap()

     }

     const showModal = () => {
          setIsModalOpen(true);
     };

     const handleOk = (id: number) => {
          setIsModalOpen(false);
          deleteCashRegisterHandler(id)
     };

     const handleCancel = () => {
          setIsModalOpen(false);
     };

     return (

          <>
               {data?.rows.length === 0 ? <p>Список касс пуст</p>
                    : <TableNext
                         bottomContent={
                              pages > 0 ? (
                                   <div className="flex w-full justify-center">
                                        <Pagination
                                             isCompact
                                             showControls
                                             showShadow
                                             color="primary"
                                             page={page}
                                             total={pages}
                                             onChange={(page) => setPage(page)}

                                        />
                                   </div>
                              ) : null
                         }
                    >
                         <TableHeader>
                              <TableColumn key="date">Дата</TableColumn>
                              <TableColumn key="cash">Наличные</TableColumn>
                              <TableColumn key="cashless">Безналичные (-1.3%)</TableColumn>
                              <TableColumn key="totalCash">Общее</TableColumn>
                              <TableColumn key="edit-delete">Действия</TableColumn>
                         </TableHeader>
                         <TableBody
                              items={data?.rows ?? []}
                              loadingContent={<Spinner label="Loading..." />}
                              loadingState={loadingState}
                         >
                              {(item) => (
                                   <TableRow key={item?.id}>
                                        {(columnKey) => <TableCell>
                                             {columnKey === `edit-delete`
                                                  ? <div className="flex gap-3 justify-center">
                                                       {decoded.role === `ADMIN` &&
                                                            <button className="cursor-pointer" onClick={() => {
                                                                 setIdCash(item?.id ?? 0)
                                                                 showModal()
                                                                 setDeleteDay(formatToClientDate(item.date))
                                                            }}>
                                                                 <MdDelete />
                                                            </button>
                                                       }
                                                       <button className="cursor-pointer" onClick={() => {
                                                            setDataUpdate((prev) => (
                                                                 {
                                                                      ...prev,
                                                                      cash: +item.cash,
                                                                      cashless: +item.cashless,
                                                                      dateProps: calendarDate(item.date),
                                                                      id: item.id ?? 0
                                                                 }))
                                                            onOpen()
                                                       }}>
                                                            <MdModeEditOutline />
                                                       </button>
                                                  </div>
                                                  : columnKey === `date`
                                                       ? formatToClientDate(item.date)
                                                       : getKeyValue(item, columnKey)
                                             }</TableCell>}
                                   </TableRow>
                              )}
                         </TableBody>
                    </TableNext>
               }

               <ModalDelete
                    id={idCash}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    isModalOpen={isModalOpen}
                    date={deleteDay}
               />
               <CashRegisterUpdate
                    page={page}
                    limit={limit}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    cash={dataUpdate.cash}
                    cashless={dataUpdate.cashless}
                    dateProps={dataUpdate.dateProps}
                    id={dataUpdate.id}
               />
          </>

     )
}
