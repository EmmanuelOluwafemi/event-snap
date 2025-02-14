import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export function useUploadImage() {
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (args: any) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      api.post<{ data: any[] }>("/upload-image", args),
  });
}
