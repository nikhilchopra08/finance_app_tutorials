import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.categories["bulk-delete"]["$post"]>["json"];

export const useBulkDeletecategories = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories["bulk-delete"]["$post"]({json})
      return await response.json();
    },
    onSuccess: () => {
      toast.success("category Deleted");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    //   TODO also invalidate Summary
    },
    onError: (error) => {
        console.log(error)
      toast.error("Failed to delete category");
    },
  });

  return mutation;
};