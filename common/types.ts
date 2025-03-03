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
    amount:z.string(),
    category:z.string(),
})

export const ExpenseAndInvestmentValidation = z.object({
    name:z.string(),
    notes:z.string().optional(),
    price:z.string(),
    paid_via:z.string(),
    category:z.string(),
})

export const Subscription = z.object({
    name:z.string(),
    notes:z.string().optional(),
    price:z.string(),
    paid_via:z.string(),
    category:z.string(),
    userId:z.string()
})
