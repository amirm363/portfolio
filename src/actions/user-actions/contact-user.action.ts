"use server";

import { contactSchema } from "@/lib/schemas/contact.schema";

export async function contactUser(formData: FormData) {
  const result = contactSchema.safeParse({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  });

  if (!result.success) {
    return { error: result.error.message };
  }

  return { success: true };
}
