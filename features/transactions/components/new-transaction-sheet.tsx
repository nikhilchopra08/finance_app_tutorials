import { 
    Sheet,
    SheetDescription,
    SheetContent,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";
import { UseNewTransactions } from "../hooks/use-new-transactions";
import { insertTransactionSchema } from "@/db/schema";
import {z} from "zod";
import { useCreateTransaction } from "../api/use-create-transaction";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategory } from "@/features/categories/api/use-get-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { TransactionForm } from "./transaction-form";
import { Loader2 } from "lucide-react";

const formSchema = insertTransactionSchema.omit({
    id: true,
  });
  
  type FormValues = z.input<typeof formSchema>;
  
  export const NewTransactionSheet = () => {
    const { isOpen, onClose } = UseNewTransactions();
  
    const createMutation = useCreateTransaction();

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
      createMutation.isPending ||
      categoryMutation.isPending ||
      AccountMutation.isPending;

    const isLoading = 
      categoryQuery.isLoading ||
      AccountQuery.isLoading;

    const onSubmit = (values: FormValues) => {
      createMutation.mutate(values, {
        onSuccess: () => {
          onClose();
        },
      });
    };
  
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>New Account</SheetTitle>
            <SheetDescription>
              Create a new transaction
            </SheetDescription>
          </SheetHeader>
          {/* <p> to do : transaction form</p> */}
          {isLoading
             ?
            (
              <div className="absolute inset-0 flex justify-center items-center">
                <Loader2 className="size-4 text-muted-foreground animate-spin" />
              </div>
            )
            :(
              <TransactionForm 
              onSubmit={onSubmit}
              disabled={isPending}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              accountOptions={AccountOptions}
              onCreateAccount={onCreateAccount}
              />
            )
            }
        </SheetContent>
      </Sheet>
    );
  };