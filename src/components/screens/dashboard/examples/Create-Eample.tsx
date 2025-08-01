import { useCreateExample } from "@/hooks/data/useExample";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createExampleSchema,
  CreateExampleType,
} from "@/schemas/example.schema";
import { Button } from "@/components/ui/button";
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
import { useTranslations } from "next-intl";

const CreateExample = () => {
  const t = useTranslations("Pages.Dashboard.Examples");
  const { mutate: createExample, isPending } = useCreateExample();
  const [open, setOpen] = React.useState(false);

  const form = useForm<CreateExampleType>({
    resolver: zodResolver(createExampleSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (data: CreateExampleType) => {
    createExample(data, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit">{t("Create_Example")}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("Create_Example")}</DialogTitle>
          <DialogDescription>
            Add a new example with title and content.
          </DialogDescription>
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
                {isPending ? t("Creating") : t("Create")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExample;
