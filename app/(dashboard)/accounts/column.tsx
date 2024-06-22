"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

// this type is used to define our data 
// can use zod schema here 

export type Payment = {
    id: string,
    amount : number,
    status : "pending" | "processing" | "sucess" | "failed",
    email : string,
}

export const columns : ColumnDef<Payment>[] = [
    {
        accessorKey : "status",
        header : "Status"
    },
    {
        accessorKey : "email",
        header : ({column}) => {
            return(
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.
                        getIsSorted() == "asc" )}>
                            Email
                            <ArrowUpDown className="ml-4 h-4 w-4"/>
                        </Button>
                    )},
        },
        {
        accessorKey : "amount",
        header : "Amount"
    }
]