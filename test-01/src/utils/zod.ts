import { parsePhoneNumber } from "libphonenumber-js/min";
import z from "zod";

// Check phone number, make sure it's valid with prefix + and without, format to international type
export const zodPhoneNumber = (
  value: string,
  ctx: z.z.core.$RefinementCtx<string>
) => {
  const phoneNumber = parsePhoneNumber(value, "RU");
  if (!phoneNumber?.isValid()) {
    ctx.addIssue({
      code: "custom",
      message: "Phone number is invalid",
    });
    return z.NEVER;
  }
  return phoneNumber.formatInternational();
};
