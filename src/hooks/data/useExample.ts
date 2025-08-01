import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import {
  CreateExampleType,
  DeleteExampleType,
  ExampleWithUser,
  UpdateExampleType,
} from "@/schemas/example.schema";
import {
  createExample,
  updateExample,
  deleteExample,
} from "@/app/actions/admin/example.action";
import { toast } from "sonner";
import { queryClient } from "@/configs/react-query";
import { useTranslations } from "next-intl";

export const useGetExamples = () => {
  return useQuery({
    queryKey: ["examples"],
    queryFn: async () => {
      try {
        const response = await api.get<ExampleWithUser[]>("/api/example");

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const useCreateExample = () => {
  const t = useTranslations("Pages.Dashboard.Examples");
  return useMutation({
    mutationFn: async (dto: CreateExampleType) => {
      const response = await createExample(dto);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success(t("Example_created"));
      queryClient.invalidateQueries({ queryKey: ["examples"] });
    },
  });
};

export const useUpdateExample = () => {
  const t = useTranslations("Pages.Dashboard.Examples");
  return useMutation({
    mutationFn: async (dto: UpdateExampleType) => {
      const response = await updateExample(dto);

      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["examples"] });
      toast.success(t("Example_updated"));
    },
  });
};

export const useDeleteExample = () => {
  const t = useTranslations("Pages.Dashboard.Examples");
  return useMutation({
    mutationFn: async (dto: DeleteExampleType) => {
      const response = await deleteExample(dto);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success(t("Example_deleted"));
      queryClient.invalidateQueries({ queryKey: ["examples"] });
    },
  });
};
