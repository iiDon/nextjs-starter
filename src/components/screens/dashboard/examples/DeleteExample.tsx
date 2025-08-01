"use client";

import { useDeleteExample } from "@/hooks/data/useExample";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
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
import { ExampleWithUser } from "@/schemas/example.schema";

interface DeleteExampleProps {
  example: ExampleWithUser;
}

const DeleteExample = ({ example }: DeleteExampleProps) => {
  const t = useTranslations("Pages.Dashboard.Examples");
  const { mutate: deleteExample, isPending } = useDeleteExample();

  const handleDelete = () => {
    deleteExample({ id: example.id });
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

export default DeleteExample;
