"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/lib/schemas/contact.schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { handleSessionStorage } from "@/lib/utils";
import FormSubmitButton from "@/components/buttons/form-submit-button";
import useFormSubmit from "@/lib/hooks/use-form-submit";
import { contactUser } from "@/actions/user-actions/contact-user.action";
import SubmitStatus from "@/components/submit-status";

type FormValues = z.infer<typeof contactSchema>;

const formId = "contact-form";

export default function ContactForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { handleSubmit, isSuccess, isError, error } = useFormSubmit({
    schema: contactSchema,
    onSubmitAction: contactUser,
    formId,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    form.setValue(name as keyof FormValues, value);
    handleSessionStorage.set(name, value);
  };

  return (
    <>
      <form action={handleSubmit} className="space-y-4 max-w-xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Name"
            {...form.register("name")}
            onChange={handleChange}
          />
          <Input
            type="email"
            placeholder="Email"
            {...form.register("email")}
            onChange={handleChange}
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
          status="success"
          message="Your message has been sent successfully. We'll get back to you soon!"
          visible={isSuccess}
        />

        <SubmitStatus
          status="error"
          message={error?.message || "Something went wrong. Please try again."}
          visible={isError}
        />
      </form>
    </>
  );
}
