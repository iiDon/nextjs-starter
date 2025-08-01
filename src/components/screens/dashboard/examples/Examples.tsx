"use client";

import {
  useGetExamples,
  useUpdateExample,
  useDeleteExample,
} from "@/hooks/data/useExample";
import { useTranslations } from "next-intl";
import ExampleSkeleton from "./skeleton";
import CreateExample from "./Create-Eample";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import React from "react";
import { ExampleWithUser } from "@/schemas/example.schema";

const EditExample = ({ example }: { example: ExampleWithUser }) => {
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
        toast.success(t("Example_updated"));
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
           <DialogDescription>
             {t("Update_description")}
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
                 {isPending ? t("Updating") : t("Update")}
               </Button>
             </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const DeleteExample = ({ example }: { example: ExampleWithUser }) => {
  const t = useTranslations("Pages.Dashboard.Examples");
  const { mutate: deleteExample, isPending } = useDeleteExample();

  const handleDelete = () => {
    deleteExample(
      { id: example.id },
      {
        onSuccess: () => {
          toast.success(t("Example_deleted"));
        },
      }
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
             <AlertDialogContent>
         <AlertDialogHeader>
           <AlertDialogTitle>{t("Delete_Example")}</AlertDialogTitle>
           <AlertDialogDescription>
             {t("Delete_confirmation", { title: example.title })}
           </AlertDialogDescription>
         </AlertDialogHeader>
         <AlertDialogFooter>
           <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
           <AlertDialogAction onClick={handleDelete} disabled={isPending}>
             {isPending ? t("Deleting") : t("Delete")}
           </AlertDialogAction>
         </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const Examples = () => {
  const t = useTranslations("Pages.Dashboard.Examples");
  const { data: examples, isLoading, error } = useGetExamples();

  if (isLoading) {
    return <ExampleSkeleton />;
  }

  if (error || !examples || examples.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{t("Examples")}</h1>
        <p className="text-sm text-muted-foreground">
          {error?.message || t("No_examples_found")}
        </p>
        <CreateExample />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{t("Examples")}</h1>
      <CreateExample />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {examples?.map((example) => (
          <Card key={example.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {example.title}
                <div className="flex gap-2">
                  <EditExample example={example} />
                  <DeleteExample example={example} />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{example.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
