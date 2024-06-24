"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transactions";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";

type Props = {
    id : string,

}

export const Actions = ({ id } : Props) => {

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this transaction"
      );

    const deleteMutation = useDeleteTransaction(id);


    const { onOpen } = useOpenTransaction();
    console.log(id);

    const handleDelete = async () => {
        const ok = await confirm();

        if(ok){
            deleteMutation.mutate();
        }
    }

    return (
        <>
            <ConfirmDialog/>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0">
                        <MoreHorizontal className="size-4 "/>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                                disabled={deleteMutation.isPending} 
                                onClick={() => {onOpen(id)}}>
                                <Edit className="size-4 mr-2"/>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                disabled={deleteMutation.isPending} 
                                onClick={handleDelete}>
                                <Trash className="size-4 mr-2"/>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </Button>
                </DropdownMenuTrigger>
            </DropdownMenu>
        </>
    );
};