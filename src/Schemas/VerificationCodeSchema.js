import * as z from "zod";
export const VerificationCodeSchema = z.object({
  verifyCode: z.string().length(6,"OTP should be of 6 letters"),
 
});