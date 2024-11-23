import { Select, SelectItem } from "@nextui-org/react";
import { FaFileDownload } from "react-icons/fa";
import { CSVLink } from "react-csv";
import { useEffect, useState } from "react";
import { CashRegister, Expenses } from "../types";

type Props = {
     page: number
     data: CashRegister[] | Expenses[]
     fn: () => void
}

export const DownloadSelect = ({ page = 0, data, fn }: Props) => {
     const [selectValue, setSelectValue] = useState(`current`)


     const selectVariant = [
          { key: "all", label: "все данные" },
          { key: "current", label: `${page} страницу` },
     ];

     useEffect(() => {
          if (selectValue === `all`) {
               fn()
          }
     }, [selectValue])

     return (
          <div className="flex items-center gap-2 p-2">
               <div style={{ minWidth: `160px` }}>
                    <Select
                         onChange={(e) => setSelectValue(e.target.value)}
                         label="Скачать файл"
                         className="max-w-xs"
                    >
                         {selectVariant.map((variant) => (
                              <SelectItem key={variant.key}>
                                   {variant.label}
                              </SelectItem>
                         ))}
                    </Select>
               </div>
               <CSVLink data={data} filename={selectValue}>
                    <FaFileDownload />
               </CSVLink>
          </div>
     )
}
