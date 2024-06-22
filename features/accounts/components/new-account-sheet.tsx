import { 
    Sheet,
    SheetDescription,
    SheetContent,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";

export const NewAccountSheet = () => {
    return (
        <Sheet open>
            <SheetContent className="y-space-4">
                <SheetHeader className="y-space-4">
                    <SheetTitle>
                        New Account
                    </SheetTitle>
                    <SheetDescription>
                        Create a new account for adding your transactions
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}