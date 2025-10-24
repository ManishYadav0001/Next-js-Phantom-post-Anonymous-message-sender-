import * as z from "zod";
export const LoginSchema = z.object({
    email: z.string(),
    password: z.string().min(6, "password should be of minimum 6 letters").max(10, "maximum password can be of 10 letters")

});