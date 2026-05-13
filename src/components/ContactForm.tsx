
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "./ui/textarea";
import { RefreshCcwIcon } from "lucide-react";
import { getUiCopy } from "@/shared/uiTranslations";
import type { Locale } from "@/shared/i18n";

export function ContactForm({
  reCaptchaSiteKey,
  locale = "en",
  children,
}: {
  reCaptchaSiteKey?: string;
  locale?: Locale;
  children?: React.ReactNode;
}) {
  const copy = getUiCopy(locale).contact;
  const FormSchema = z.object({
    name: z.string().min(2, {
      message: copy.validationName,
    }),
    email: z.string().email({
      message: copy.validationEmail,
    }),
    message: z.string().min(5, {
      message: copy.validationMessage,
    }),
    botField: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      botField: "",
    },
  });

  function onSubmit(_data: z.infer<typeof FormSchema>) {
    toast({
      title: copy.successTitle,
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{copy.sent}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      {children}
      <form
        name="contact"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 mt-10 mx-auto contact-form"
        data-netlify="true"
        data-netlify-honeypot="botField"
        data-netlify-recaptcha="true"
      >
        <input type="hidden" name="form-name" value="contact" />

        <FormField
          control={form.control}
          name="botField"
          render={({ field }) => (
            <FormItem className="columns-all form-item bot-food">
              <FormLabel>{copy.botLabel}</FormLabel>
              <FormControl>
                <Input type="text" placeholder={copy.botPlaceholder} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="form-item name-field">
              <FormLabel>{copy.name}</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="form-item email-field">
              <FormLabel>{copy.email}</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem
              className="form-item columns-all message-field"
            >
              <FormLabel>{copy.message}</FormLabel>
              <FormControl>
                <Textarea placeholder={copy.messagePlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="loading-message columns-all">
          <RefreshCcwIcon width={"3rem"} height={"3rem"} />
        </div>

        <div id="recaptcha" className="columns-all" data-recaptcha-site-key={reCaptchaSiteKey}></div>

        <aside className="success-message columns-all">
          <p>{copy.thanks}</p>
        </aside>
        <aside className="error-message columns-all">
          <p>{copy.error}</p>
        </aside>

        <Button type="submit" variant="default">
          {copy.submit}
        </Button>

        <input type="hidden" name="g-recaptcha-response" />

      </form>
    </Form>
  );
}
