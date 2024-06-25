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
import { useState } from "react";
import { UploadButton } from "./upload-button";
import { ImportCard } from "./import-card";
import { transactions as transactionSchema } from "@/db/schema"
import { useSelectAccount } from "@/features/accounts/hooks/use-select-account";
import { toast } from "sonner";
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions";

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

enum VARIANTS {
    LIST = "LIST",
    IMPORT = "IMPORT"
};

const INITIAL_IMPORT_RESULTS = {
    data : [],
    errors : [],
    meta : {},
}

const TransactionPage = () => {
    const [AccountDialog , confirm] = useSelectAccount();
    const [variant , setVariant] = useState<VARIANTS>(VARIANTS.LIST);
    const [importResults , setImportResults] = useState(INITIAL_IMPORT_RESULTS);

    const onUpload = (results : typeof INITIAL_IMPORT_RESULTS) => {
        console.log({results})
        setImportResults(results);
        setVariant(VARIANTS.IMPORT);
    };

    const onCancelImport = () => {
        setImportResults(INITIAL_IMPORT_RESULTS);
        setVariant(VARIANTS.LIST);
    }

    const newTransaction = UseNewTransactions();
    const TransactionQuery = useGetTransactions();
    const BulkDeleteTransactions = useBulkDeleteTransactions();
    const createTransactions = useBulkCreateTransactions();

    const isDisabled = 
    TransactionQuery.isLoading || 
        BulkDeleteTransactions.isPending;

        const onSubmitImport = async (
            values: typeof transactionSchema.$inferInsert[],
        ) => {
            const accountId = await confirm();
    
            if (!accountId) {
                return toast.error("Please select an account to continue");
            }
    
            const data = values.map((value) => ({
                ...value,
                accountId: accountId
            }));
            
    
            createTransactions.mutate(data, {
                onSuccess: () => {
                    console.log("ghvn");
                    onCancelImport();
                },
            });
        };

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

    if(variant === VARIANTS.IMPORT){
        return (
            <>
                <AccountDialog />
                    <ImportCard 
                    data={importResults.data}
                    onCancel={onCancelImport}
                    onSubmit={onSubmitImport}
                    />
            </>
        )
    }

    return (
        <div className="max-width-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Transaction History
                    </CardTitle>
                    <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
                    <Button size="sm" 
                        onClick={newTransaction.onOpen}
                        className="w-full lg:w-auto"
                    >
                        <Plus className="size-4 mr-2" />
                        Add new
                    </Button>
                    {/* <UploadButton 
                        onUpload={onUpload}
                    /> */}
                    </div>
                </CardHeader>
                <CardContent >
                    <DataTable filterKey="payee" columns={columns} data={transactions} onDelete={(row) => {
                        const ids = row.map((r) => r.original.id);
                        BulkDeleteTransactions.mutate({ ids });
                    }} disabled={isDisabled}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default TransactionPage;