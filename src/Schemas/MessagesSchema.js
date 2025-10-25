import * as z from "zod";

export const MessageSchema = z.object({
    content: z.string().min(10, "minimum 10 letters of message required").max(300, "mazimum message can contain 300 letters"),
})