"use client"

import { Button } from "@/components/ui/button";
import { 
    Card,
    CardContent,
    CardTitle,
    CardHeader
 } from "@/components/ui/card"
import { UseNewAccounts } from "@/features/accounts/hooks/use-new-accounts";
import { Loader2, Plus } from "lucide-react";

import { columns } from "./column";
import { DataTable } from "@/components/Data-Table";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { accounts } from "@/db/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete";

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

const AccountsPage = () => {
    const newAccount = UseNewAccounts();
    const AccountQuery = useGetAccounts();
    const deleteAccounts = useBulkDeleteAccounts();

    const isDisabled = 
        AccountQuery.isLoading || 
        deleteAccounts.isPending;

    const accounts = AccountQuery.data || [];

    if(AccountQuery.isLoading){
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
                        Hello
                    </CardTitle>
                    <Button size="sm" onClick={newAccount.onOpen}>
                        <Plus className="size-4 mr-2" />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent >
                    <DataTable filterKey="name" columns={columns} data={accounts} onDelete={(row) => {
                        const ids = row.map((r) => r.original.id);
                        deleteAccounts.mutate({ ids });
                    }} disabled={isDisabled}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default AccountsPage;