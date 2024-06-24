import {client} from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGetTransactions = () => {
    const params = useSearchParams();
    const from = params.get("from") || "";
    const to = params.get("to") || "";
    const accountId = params.get("accountId") || "";

    const query = useQuery({
        // toDo check if params are needed in the query
        queryKey: ["transactions" , {from , to , accountId}],
        queryFn: async () => {
            const response = await client.api.transactions.$get({
                query: {
                    from ,
                    to , 
                    accountId,
                },
            });

            if(!response.ok){
                throw new Error("Failed to fetch Transactions");
            }

            const {data} = await response.json();
            return data;
        }
    })
    return query;
}