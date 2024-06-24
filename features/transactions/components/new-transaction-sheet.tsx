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

const formSchema = insertTransactionSchema.omit({
    id: true,
  });
  
  type FormValues = z.input<typeof formSchema>;
  
  export const NewTransactionSheet = () => {
    const { isOpen, onClose } = UseNewTransactions();
  
    const mutation = useCreateTransaction();
  
    const onSubmit = (values: FormValues) => {
      mutation.mutate(values, {
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
          <p> to do : transaction form</p>
        </SheetContent>
      </Sheet>
    );
  };