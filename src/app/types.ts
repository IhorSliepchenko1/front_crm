export type User = {
     id: number
     login: string
     password: string
     role: string
     createdAt: Date
     updatedAt: Date
}

export type TypesExpensesAndPayments = {
     id: number
     name: string
     createdAt: Date
     updatedAt: Date
}

export type CashData = {
     cash: number, cashless: number, date: string | Date, id?: number, totalCash: number
}

export type CashRegister = {
     id: number
     cash: number
     cashless: number
     totalCash: number
     date: Date
     userId: number
     createdAt: Date
     updatedAt: Date
}

export type CashRegisterAll = {
     rows: CashRegister[]
     count: number
}

export type Expenses = {
     paymentName: string
     id: number
     name: string
     date: Date
     sum: number
     img: string
     userId: number
     createdAt: Date
     updatedAt: Date
     typesExpenseId: number
     paymentId: number
     userName: string
     typeName: string

}






export type Deposit = {
     cash: number | null, cashless: number | null, date: Date | string, hospital: number | null
}

export type DecodeToken = {
     exp: number
     iat: number
     id: number
     login: string
     role: string
}

export type Balance = {
     cash: number,
     cashless: number,
     totalCash: number,
     totalExpenses: number

}