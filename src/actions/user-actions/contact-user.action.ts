"use server";

import { contactSchema } from "@/lib/schemas/contact.schema";
import { z } from "zod";

// Define the state shape the action will return
interface ActionState {
  message: string;
  success: boolean;
  errors?: Record<keyof z.infer<typeof contactSchema>, string>;
  formValues?: z.infer<typeof contactSchema>;
}

const airtableApiKey = process.env.AIRTABLE_API_KEY;
const airtableBaseId = process.env.AIRTABLE_BASE_ID;
const airtableTableId = process.env.AIRTABLE_TABLE_ID;

// Action signature matches useActionState: (previousState, formData)
export async function contactUser(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Convert FormData to an object for validation
  const formObject = Object.fromEntries(formData.entries());

  const formValidation = contactSchema.safeParse(formObject);

  if (!formValidation.success) {
    // Extract Zod errors
    const fieldErrors: Partial<
      Record<keyof z.infer<typeof contactSchema>, string>
    > = {};
    formValidation.error.issues.forEach((issue) => {
      const path = issue.path[0] as keyof z.infer<typeof contactSchema>;
      fieldErrors[path] = issue.message;
    });
    return {
      success: false,
      message: "Validation failed. Please check the fields.",
      errors: fieldErrors as Record<
        keyof z.infer<typeof contactSchema>,
        string
      >,
      formValues: formObject as z.infer<typeof contactSchema>,
    };
  }

  try {

    const response = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${airtableApiKey}`,
        },
        body: JSON.stringify({ fields: formValidation.data }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send message");
    }
    // Return success state
    return { success: true, message: "Message sent successfully!" };
  } catch (e) {
    console.error("Contact submission error:", e);
    // Return error state
    return {
      success: false,
      message: "An unexpected error occurred on the server.",
      formValues: formObject as z.infer<typeof contactSchema>,
    };
  }
}
