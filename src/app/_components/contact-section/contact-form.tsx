"use client";
import React, { useActionState, useCallback } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/lib/schemas/contact.schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormSubmitButton from "@/components/buttons/form-submit-button";
// import useFormSubmit from "@/lib/hooks/use-form-submit";
import { contactUser } from "@/actions/user-actions/contact-user.action";
import SubmitStatus from "@/components/submit-status";
import useSessionHook from "@/lib/hooks/use-session-hook";

type FormValues = z.infer<typeof contactSchema>;

const formId = "contact-form";

export default function ContactForm() {
  const { handleSessionStorage } = useSessionHook();
  const [state, formAction] = useActionState(contactUser, {
    success: false,
    message: "",
  });
  const sessionValue = handleSessionStorage("get", formId);

  const form = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: React.useMemo(() => {
      return {
        ...(sessionValue
          ? JSON.parse(sessionValue as string)
          : {
              name: "",
              email: "",
              message: "",
            }),
      };
    }, [sessionValue]),
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      form.setValue(name as keyof FormValues, value);
      handleSessionStorage("set", formId, JSON.stringify(form.getValues()));
    },
    [form, handleSessionStorage]
  );

  return (
    <>
      <form action={formAction} className="space-y-4 max-w-xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Name"
            {...form.register("name")}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            {...form.register("email")}
            onChange={handleChange}
            required
          />

          <Textarea
            placeholder="Message"
            {...form.register("message")}
            onChange={handleChange}
            className="col-span-2"
            rows={10}
          />
          <FormSubmitButton className="col-span-2">Submit</FormSubmitButton>
        </div>

        <SubmitStatus
          status={state.success ? "success" : "error"}
          message={state.message}
          visible={state.message !== ""}
        />
      </form>
    </>
  );
}
