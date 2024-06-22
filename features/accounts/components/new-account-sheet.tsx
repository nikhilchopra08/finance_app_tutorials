import { 
    Sheet,
    SheetDescription,
    SheetContent,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";
import { UseNewAccounts } from "../hooks/use-new-accounts";
import { AccountForm } from "./account-form";

export const NewAccountSheet = () => {

    const {isOpen , onClose } = UseNewAccounts();
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="y-space-4">
                <SheetHeader className="y-space-4">
                    <SheetTitle>
                        New Account
                    </SheetTitle>
                    <SheetDescription>
                        Create a new account for adding your transactions
                    </SheetDescription>
                </SheetHeader>
                <AccountForm onSubmit={() => {}} disabled={false}/>
            </SheetContent>
        </Sheet>
    )
}