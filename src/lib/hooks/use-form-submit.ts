"use client";
import { useState } from "react";
import { z } from "zod";
import { handleSessionStorage } from "@/lib/utils";

type SubmitAction = (data: FormData) => Promise<
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
  onSubmitAction: SubmitAction;
  formId: string;
  clearAfterSubmit?: boolean;
}

interface UseFormSubmitReturn {
  handleSubmit: (data: FormData) => Promise<void>;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  reset: () => void;
}

export default function useFormSubmit<T extends z.ZodTypeAny>({
  schema,
  onSubmitAction,
  formId,
  clearAfterSubmit = true,
}: UseFormSubmitProps<T>): UseFormSubmitReturn {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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
    setIsSuccess(false);
    setIsError(false);
    setError(null);
  };

  const handleSubmit = async (data: FormData) => {
    reset();

    try {
      // Validate data against schema
      const validatedData = schema.parse(data);

      // Save form data to session storage before submission
      saveFormToSessionStorage(validatedData);

      // Submit the form
      await onSubmitAction(validatedData);

      // Handle success
      setIsSuccess(true);

      // Clear form data if necessary
      if (clearAfterSubmit) {
        clearFormFromSessionStorage();
      }
    } catch (e) {
      // Handle errors
      setIsError(true);
      setError(e as Error);
      console.error("Form submission error:", e);
    }
  };

  return {
    handleSubmit,
    isSuccess,
    isError,
    error,
    reset,
  };
}
