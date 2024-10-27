export type User = {
     id: number
     login: string
     password: string
     role: string
     createdAt: Date
     updatedAt: Date
}

export type TypesExpenses = {
     id: number
     name: string
     createdAt: Date
     updatedAt: Date
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

export type Expenses = {
     id: number
     name: string
     date: Date
     sum: number
     img: string
     userId: number
     createdAt: Date
     updatedAt: Date
     typesExpenseId: number
     userName: string
     typeName: string

}

// export type ExpensesData = {
//      count: number
//      rows: Expenses[]
// }


export type CashData = {
     cash: number, cashless: number, date: string | Date, id?: number
}


export type Deposit = {
     cash: number | null, cashless: number | null, date: Date | string
}

export type DecodeToken = {
     exp: number
     iat: number
     id: number
     login: string
     role: string
}

export type Balance = {
     totalCash: number,
     totalExpenses: number,
     balance: number
}