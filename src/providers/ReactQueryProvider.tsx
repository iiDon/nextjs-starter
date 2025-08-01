import { queryClient } from "@/configs/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
