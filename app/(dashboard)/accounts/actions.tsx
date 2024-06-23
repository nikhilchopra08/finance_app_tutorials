"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useOpenAccount } from "@/features/accounts/hooks/use-open-accounts";

type Props = {
    id : string,

}

export const Actions = ({ id } : Props) => {

    const { onOpen } = useOpenAccount();
    console.log(id);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0">
                        <MoreHorizontal className="size-4 "/>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                                disabled={false} 
                                onClick={() => {onOpen(id)}}>
                                <Edit className="size-4 mr-2"/>
                                Edit
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </Button>
                </DropdownMenuTrigger>
            </DropdownMenu>
        </>
    );
};