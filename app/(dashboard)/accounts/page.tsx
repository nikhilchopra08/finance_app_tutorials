"use client"

import { Button } from "@/components/ui/button";
import { 
    Card,
    CardContent,
    CardTitle,
    CardHeader
 } from "@/components/ui/card"
import { UseNewAccounts } from "@/features/accounts/hooks/use-new-accounts";
import { Plus } from "lucide-react";

import { Payment, columns } from "./column";
import { DataTable } from "@/components/Data-Table";

const data : Payment[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "728ed52f",
        amount: 300,
        status: "sucess",
        email: "a@example.com",
      },
]

async function getData() : Promise<Payment[]> {
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
          },
    ]
}

const AccountsPage = () => {
    const newAccount = UseNewAccounts();

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
                    <DataTable filterKey="email" columns={columns} data={data} onDelete={() => {}} disabled={false}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default AccountsPage;