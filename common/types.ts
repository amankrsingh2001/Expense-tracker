import {z} from "zod"

export const registerUser = z.object({
    email:z.string().email(),
    firstName:z.string(),
    lastName:z.string(),
    password:z.string().min(5).max(20),
})

export const loginUser = z.object({
    email:z.string().email(),
    password:z.string().min(5).max(20)
})