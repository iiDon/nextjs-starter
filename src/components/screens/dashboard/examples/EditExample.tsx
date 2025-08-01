"use client";

import { useUpdateExample } from "@/hooks/data/useExample";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateExampleSchema,
  UpdateExampleType,
} from "@/schemas/example.schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { ExampleWithUser } from "@/schemas/example.schema";

interface EditExampleProps {
  example: ExampleWithUser;
}

const EditExample = ({ example }: EditExampleProps) => {
  const t = useTranslations("Pages.Dashboard.Examples");
  const { mutate: updateExample, isPending } = useUpdateExample();
  const [open, setOpen] = React.useState(false);

  const form = useForm<UpdateExampleType>({
    resolver: zodResolver(updateExampleSchema),
    defaultValues: {
      id: example.id,
      title: example.title,
      content: example.content,
    },
  });

  const onSubmit = (data: UpdateExampleType) => {
    updateExample(data, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("Edit_Example")}</DialogTitle>
          <DialogDescription>{t("Update_description")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Title")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("Enter_title")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Content")}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t("Enter_content")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                {t("Cancel")}
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? t("Updating") : t("Update")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditExample;
