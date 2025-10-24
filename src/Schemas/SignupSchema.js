import * as z from "zod";
export const SignupSchema = z.object({
    name: z.string().min(3, "name must be of minimum 3 letters").max(15, "maximum name can be of 15 letters").regex(/^\S+$/, "Username cannot contain spaces"),
    email: z.string(),
    password: z.string().min(6, "password should be of minimum 6 letters").max(10, "maximum password can be of 10 letters")

});