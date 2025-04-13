"use client";
import React, { useActionState, useCallback, useEffect, useMemo } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/lib/schemas/contact.schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormSubmitButton from "@/components/buttons/form-submit-button";
import { contactUser } from "@/actions/user-actions/contact-user.action";
import SubmitStatus from "@/components/submit-status";
import useSessionHook from "@/lib/hooks/use-session-hook";
import { Mail, User, MessageSquare } from "lucide-react";
import FormInput from "./form-input";
type FormValues = z.infer<typeof contactSchema>;

const formId = "contact-form";

export default function ContactForm() {
  const { handleSessionStorage } = useSessionHook();
  const [state, formAction] = useActionState(contactUser, {
    success: false,
    message: "",
    errors: {} as Record<keyof z.infer<typeof contactSchema>, string>,
    formValues: {} as FormValues,
  });
  const sessionValue = useMemo(
    () => handleSessionStorage("get", formId),
    [handleSessionStorage]
  );

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

  useEffect(() => {
    if (state.errors && state.formValues) {
      const formValues = form.getValues();
      Object.keys(formValues).forEach((key) => {
        form.setValue(
          key as keyof FormValues,
          formValues[key as keyof FormValues]
        );
      });
    }
  }, [state, form]);

  return (
    <>
      <form action={formAction} className="space-y-6 w-full max-w-[400px]">
        <div className="space-y-4">
          <FormInput label="Name" name="name" error={state.errors?.name}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                className="pl-10"
                {...form.register("name")}
                onChange={handleChange}
              />
            </div>
          </FormInput>

          <FormInput label="Email" name="email" error={state.errors?.email}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="Your email address"
                className="pl-10"
                {...form.register("email")}
                onChange={handleChange}
              />
            </div>
          </FormInput>

          <FormInput
            label="Message"
            name="message"
            error={state.errors?.message}
          >
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </div>
              <Textarea
                id="message"
                placeholder="Your message"
                className="pl-10 min-h-[120px]"
                {...form.register("message")}
                onChange={handleChange}
              />
            </div>
          </FormInput>
        </div>
        <FormSubmitButton className="w-full">Send Message</FormSubmitButton>

        <SubmitStatus
          status={state.success ? "success" : "error"}
          message={state.message}
          visible={state.message !== ""}
        />
      </form>
    </>
  );
}
