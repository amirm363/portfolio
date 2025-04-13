"use client";
import { useState } from "react";
import { z } from "zod";
import { handleSessionStorage } from "@/lib/utils";

type SubmitAction<T extends z.ZodTypeAny> = (data: z.infer<T>) => Promise<
  | {
    error: string;

    success?: undefined;
  }
  | {
    success: boolean;
    error?: undefined;
  }
>;

interface UseFormSubmitProps<FormSchema extends z.ZodTypeAny> {
  schema: FormSchema;
  onSubmitAction: SubmitAction<FormSchema>;
  formId: string;
}

interface UseFormSubmitReturn {
  handleSubmit: (data: FormData) => Promise<void>;
  isSuccess: { success: boolean; message: string };
  reset: () => void;
}

export default function useFormSubmit<T extends z.ZodTypeAny>({
  schema,
  onSubmitAction,
  formId,
}: UseFormSubmitProps<T>): UseFormSubmitReturn {
  const [isSuccess, setIsSuccess] = useState({ success: false, message: "" });

  const saveFormToSessionStorage = (data: z.infer<T>) => {
    // Save each field individually
    Object.entries(data).forEach(([key, value]) => {
      handleSessionStorage.set(`${formId}_${key}`, value as string);
    });

    // Also save the whole form for convenience
    handleSessionStorage.set(formId, JSON.stringify(data));
  };

  const loadFormFromSessionStorage = (): Partial<z.infer<T>> => {
    const storedForm = handleSessionStorage.get(formId);
    return storedForm || {};
  };

  const clearFormFromSessionStorage = () => {
    // Get the stored form to find all keys
    const storedForm = loadFormFromSessionStorage();

    // Remove each field individually
    Object.keys(storedForm).forEach((key) => {
      handleSessionStorage.remove(`${formId}_${key}`);
    });

    // Remove the whole form
    handleSessionStorage.remove(formId);
  };

  const reset = () => {
    setIsSuccess({ success: false, message: "" });
  };

  const handleSubmit = async (data: FormData) => {
    reset();

    try {
      // Validate data against schema
      const formObject = Object.fromEntries(data.entries());

      const validatedData = schema.safeParse(formObject);

      if (!validatedData.success) {
        setIsSuccess({
          success: false,
          message: `Form submission error: ${validatedData.error.issues[0].message}`,
        });
        return;
      }

      // Save form data to session storage before submission
      saveFormToSessionStorage(validatedData);

      // Submit the form
      await onSubmitAction(validatedData);

      // Handle success
      setIsSuccess({ success: true, message: "Form submitted successfully" });

      // Clear form data if necessary form is submitted successfully
      clearFormFromSessionStorage();
    } catch (e) {
      // Handle errors
      setIsSuccess({ success: false, message: "Form submission error" });

      console.error("Form submission error:", e);
    }
  };

  return {
    handleSubmit,
    isSuccess,
    reset,
  };
}
