import {z} from "zod"

export const registerUser = z.object({
    email:z.string().email(),
    firstName:z.string(),
    lastName:z.string(),
    password:z.string().min(5).max(20),
    otp:z.string().optional()
})

export const loginUser = z.object({
    email:z.string().email(),
    password:z.string().min(5).max(20)
})

export const IncomeValidation = z.object({
    name:z.string(),
    notes:z.string().optional(),
    amount:z.string() ,
    category:z.string(),
    recievedDate:z.string().optional(),
})

export const ExpenseValidation = z.object({
    name:z.string(),
    notes:z.string().optional(),
    price:z.string(),
    paidVia:z.string(),
    category:z.string(),
    spentDate:z.string(),

})

export const InvestmentValidation = z.object({
    name:z.string(),
    stockPrice:z.string(),    
    units:z.string(),
    category:z.string(),
    boughtDate:z.string(),
    notes:z.string().optional()
})

export const SubscriptionValidation = z.object({
    name:z.string(),
    notes:z.string().optional(),
    price:z.string(),
    paid:z.enum(["monthly", "yearly"]),
    boughtDate:z.string(),
    url:z.string()
})
