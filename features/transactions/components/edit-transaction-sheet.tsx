import { 
    Sheet,
    SheetDescription,
    SheetContent,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";

import { TransactionForm } from "./transaction-form";
import { insertTransactionSchema } from "@/db/schema";
import {z} from "zod";
import { useOpenTransaction } from "../hooks/use-open-transactions";
import { useGetTransaction } from "../api/use-get-transaction";
import { Loader2 } from "lucide-react";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { useConfirm } from "@/hooks/use-confirm";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";

const formSchema = insertTransactionSchema.omit({
    id: true,
  });
  
  type FormValues = z.input<typeof formSchema>;
  
  export const EditTransactionSheet = () => {
    const { isOpen, onClose , id} = useOpenTransaction();

    const [ConfirmDialog, confirm] = useConfirm(
      "Are you sure?",
      "You are about to delete this transaction"
    );
  
    const transactionQuery = useGetTransaction(id);
    const editMutation = useEditTransaction(id);
    const deleteMutation = useDeleteTransaction(id);

    const categoryQuery = useGetCategories();
    const categoryMutation = useCreateCategory();
    const onCreateCategory = (name : string) => categoryMutation.mutate({
      name
    });
    const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
      label: category.name,
      value: category.id,
    }));

    const AccountQuery = useGetAccounts();
    const AccountMutation = useCreateAccount();
    const onCreateAccount = (name : string) => AccountMutation.mutate({
      name
    });
    const AccountOptions = (AccountQuery.data ?? []).map((account) => ({
      label: account.name,
      value: account.id,
    }));

    const isPending = 
      editMutation.isPending ||
      deleteMutation.isPending ||
      transactionQuery.isPending ||
      categoryMutation.isPending ||
      AccountMutation.isPending;
    
    const isLoading = transactionQuery.isLoading || categoryQuery.isLoading || AccountQuery.isLoading;
  
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

    const defaultValues = transactionQuery.data
    ? {
        accountId: transactionQuery.data.accountid,
        categoryId : transactionQuery.data.categoryid,
        amount : transactionQuery.data.amount.toString(),
        date : transactionQuery.data.date ? new Date(transactionQuery.data.date) : new Date(),
        payee : transactionQuery.data.payee,
        notes : transactionQuery.data.notes,
      }
    : {
        accountId: "",
        categoryId : "",
        amount: "",
        date : new Date(),
        payee: "",
        notes : "",
      };
  
    return (
      <>
      <ConfirmDialog/>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>
              edit an existing transaction
            </SheetDescription>
          </SheetHeader>
          {isLoading 
            ? (
                <div className="absolute inset-0 flex item-center justify-center">
                    <Loader2 className="size-4 text-muted-foreground animate-spin"/>
                </div>
            ):(
                <TransactionForm
                id={id}
                defaultValues={defaultValues}
                onSubmit={onSubmit}
                disabled={isPending}
                categoryOptions={categoryOptions}
                onCreateCategory={onCreateCategory}
                accountOptions={AccountOptions}
                onCreateAccount={onCreateAccount}
              />
            )}
        </SheetContent>
      </Sheet>
      </>
    );
  };