"use client"

import { Button } from "@/components/ui/button";
import { 
    Card,
    CardContent,
    CardTitle,
    CardHeader
 } from "@/components/ui/card"
import { UseNewTransactions } from "@/features/transactions/hooks/use-new-transactions";
import { Loader2, Plus } from "lucide-react";

import { columns } from "./column";
import { DataTable } from "@/components/Data-Table";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { accounts } from "@/db/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";

// const data = [
//     {
//         id: "728ed52f",
//         amount: 100,
//         status: "pending",
//         email: "m@example.com",
//       },
//       {
//         id: "728ed52f",
//         amount: 300,
//         status: "sucess",
//         email: "a@example.com",
//       },
// ]

// async function getData() : Promise<Payment[]> {
//     return [
//         {
//             id: "728ed52f",
//             amount: 100,
//             status: "pending",
//             email: "m@example.com",
//           },
//     ]
// }

const TransactionPage = () => {
    const newTransaction = UseNewTransactions();
    const TransactionQuery = useGetTransactions();
    const BulkDeleteTransactions = useBulkDeleteTransactions();

    const isDisabled = 
    TransactionQuery.isLoading || 
        BulkDeleteTransactions.isPending;

    const transactions = TransactionQuery.data || [];

    if(TransactionQuery.isLoading){
        return (
            <div className="max-width-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader>
                        <Skeleton className="h-8 w-48"/>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full flex item-center justify-center">
                            <Loader2 className="size-6 text-slate-500 animate-spin"/>
                        </div>
                    </CardContent>
                </Card>     
            </div>            
        )
    }

    return (
        <div className="max-width-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Transaction History
                    </CardTitle>
                    <Button size="sm" onClick={newTransaction.onOpen}>
                        <Plus className="size-4 mr-2" />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent >
                    <DataTable filterKey="name" columns={columns} data={transactions} onDelete={(row) => {
                        const ids = row.map((r) => r.original.id);
                        BulkDeleteTransactions.mutate({ ids });
                    }} disabled={isDisabled}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default TransactionPage;