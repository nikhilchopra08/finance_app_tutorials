import { 
    Sheet,
    SheetDescription,
    SheetContent,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";

import { AccountForm } from "./account-form";
import { insertAccountSchema } from "@/db/schema";
import {z} from "zod";
import { useOpenAccount } from "../hooks/use-open-category";
import { useGetAccount } from "../api/use-get-account";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "../api/use-edit-category";
import { useDeleteAccount } from "../api/use-delete-category";
import { useConfirm } from "@/hooks/use-confirm";

const formSchema = insertAccountSchema.pick({
    name: true,
  });
  
  type FormValues = z.input<typeof formSchema>;
  
  export const EditAccountSheet = () => {
    const { isOpen, onClose , id} = useOpenAccount();

    const [ConfirmDialog, confirm] = useConfirm(
      "Are you sure?",
      "You are about to delete this transaction"
    );
  
    const accountQuery = useGetAccount(id);
    const editMutation = useEditAccount(id);
    const deleteMutation = useDeleteAccount(id);

    const isPending = 
      editMutation.isPending ||
      deleteMutation.isPending;
    
    const isLoading = accountQuery.isLoading;
  
    const onSubmit = (values: FormValues) => {
      editMutation.mutate(values, {
        onSuccess: () => {
          onClose();
        },
      });
    };

    const onDelete = async () => {
      console.log("up")
      const ok = await confirm();
      console.log("down")
      if (ok) {
        deleteMutation.mutate(undefined , {
          onSuccess : () => {
            onClose();
          }
        })
      }
    };

    const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : {
        name: "",
      };
  
    return (
      <>
      <ConfirmDialog/>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>
              edit an existing account
            </SheetDescription>
          </SheetHeader>
          {isLoading 
            ? (
                <div className="absolute inset-0 flex item-center justify-center">
                    <Loader2 className="size-4 text-muted-foreground animate-spin"/>
                </div>
            ):(
                <AccountForm
                id={id}
                onSubmit={onSubmit}
                disabled={isPending}
                defaultValues={ defaultValues }
                onDelete={onDelete}
              />
            )}
        </SheetContent>
      </Sheet>
      </>
    );
  };