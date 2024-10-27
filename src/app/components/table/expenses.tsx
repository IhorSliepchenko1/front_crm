import { Table as TableNext, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue, useDisclosure } from "@nextui-org/react";
import { formatToClientDate } from "../../../utils/format-to-client-date";
import { Expenses } from "../../types";
import { useMemo, useState } from "react";
import { FaFileImage } from "react-icons/fa";
import { PiEmptyBold } from "react-icons/pi";
import { ExpensesUpdate } from "../expenses-update";
import { useCalendarInputDate } from "../../hooks/useCalendarInputDate";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { ModalDownloadFile } from "../modals/download-file";
import { ModalDelete } from "../modals/delete";
import { useDeleteExpensesMutation, useLazyGetAllExpensesQuery } from "../../services/expensesApi";
import { useLazyGetBalanceQuery } from "../../services/apiBalance";
import { useCheckValidToken } from "../../hooks/useCheckValidToken";

type Props = {
     data: { rows: Expenses[], count: number } | null | undefined
     isLoading: boolean
     limit: number
     page: number
     setPage: (page: number) => void
}

export const TableExpenses = ({ data, limit, isLoading, page, setPage }: Props) => {

     const [deleteExpenses] = useDeleteExpensesMutation()
     const [triggerGetAllExpenses] = useLazyGetAllExpensesQuery()
     const [triggerGetAllBalance] = useLazyGetBalanceQuery()

     const { calendarDate } = useCalendarInputDate()
     const { decoded } = useCheckValidToken()

     const [dataOpenImage, setDataOpenImage] = useState({ path: '', name: '' })
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [idCash, setIdCash] = useState(0)
     const [deleteDay, setDeleteDay] = useState(``)
     const [modalVariant, setModalVariant] = useState(0)
     const [dataUpdate, setDataUpdate] = useState({
          name: '',
          sum: 0,
          date: calendarDate(new Date(Date.now())),
          id: 0,
          typeName: ''
     })

     const pages = useMemo(() => {
          return data?.count ? Math.ceil(data.count / limit) : 0;
     }, [data?.count, limit]);

     const loadingState = isLoading || data?.rows.length === 0 ? "loading" : "idle";

     const { isOpen, onOpen, onOpenChange } = useDisclosure();

     const deleteCashRegisterHandler = async (id: number) => {
          await deleteExpenses(id).unwrap()
          await triggerGetAllExpenses({ page, limit }).unwrap()
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
          <>{data?.rows.length === 0 ? <p>Список расходов пуст</p>
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
                         <TableColumn key="name">Наименование</TableColumn>
                         <TableColumn key="sum">Сумма</TableColumn>
                         <TableColumn key="typeName">Тип</TableColumn>
                         <TableColumn key="userName">Вносил</TableColumn>
                         <TableColumn key="check">Вложения</TableColumn>
                    </TableHeader>
                    <TableBody
                         items={data?.rows ?? []}
                         loadingContent={<Spinner label="Loading..." />}
                         loadingState={loadingState}
                    >
                         {(item) => (
                              <TableRow key={item?.id}>
                                   {(columnKey) => <TableCell>
                                        {columnKey === `check` ?
                                             <div className="flex justify-center items-center gap-4">
                                                  <button
                                                       className="cursor-pointer"
                                                       color={item.img !== null ? `primary` : `warning`}
                                                       onClick={() => {
                                                            setModalVariant(1)
                                                            setDataOpenImage(prev => ({ ...prev, path: item.img, name: item.name }))
                                                            onOpen()
                                                       }}

                                                       disabled={item.img === null}
                                                  >
                                                       {item.img !== null ? <FaFileImage />
                                                            : <PiEmptyBold />
                                                       }
                                                  </button>
                                                  <button onClick={() => {
                                                       setModalVariant(2)
                                                       setDataUpdate((prev) => (
                                                            {
                                                                 ...prev,
                                                                 name: item.name,
                                                                 sum: +item.sum,
                                                                 date: calendarDate(item.date),
                                                                 id: item.id ?? 0,
                                                                 typeName: item.typeName
                                                            }))
                                                       onOpen()
                                                  }}>
                                                       <MdModeEditOutline />
                                                  </button>
                                                  {decoded.role === `ADMIN` &&
                                                       <button className="cursor-pointer" onClick={() => {
                                                            setIdCash(item?.id ?? 0)
                                                            showModal()
                                                            setDeleteDay(formatToClientDate(item.date))
                                                            setModalVariant(3)
                                                       }}>
                                                            <MdDelete
                                                            />
                                                       </button>}
                                             </div>
                                             : columnKey === `date`
                                                  ? formatToClientDate(item.date)
                                                  : getKeyValue(item, columnKey)}
                                   </TableCell>}
                              </TableRow>
                         )}
                    </TableBody>
               </TableNext>}

               {modalVariant === 3
                    ? <ModalDelete
                         id={idCash}
                         handleOk={handleOk}
                         handleCancel={handleCancel}
                         isModalOpen={isModalOpen}
                         date={deleteDay}
                    />

                    : modalVariant === 1
                         ? <ModalDownloadFile
                              dataOpenImage={dataOpenImage}
                              isOpen={isOpen}
                              onOpenChange={onOpenChange}
                         />

                         : <ExpensesUpdate
                              page={page}
                              limit={limit}
                              isOpen={isOpen}
                              onOpenChange={onOpenChange}
                              name={dataUpdate.name}
                              sum={dataUpdate.sum}
                              date={dataUpdate.date}
                              id={dataUpdate.id}
                              typeName={dataUpdate.typeName}
                              update={true}
                         />}
          </>
     )
}

